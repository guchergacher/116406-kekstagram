'use strict';

(function () {
  var NEW_PHOTO_LENGTH = 10;

  var imgFilters = document.querySelector('.img-filters--inactive');
  var containerPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photos = [];
  var copyPhotos = [];

  var onLoad = function (data) {
    photos = data;
    copyPhotos = photos.slice();

    appendPhotos(photos);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var appendPhotos = function (data) {
    removePhotos();

    data.forEach(function (item, i) {
      fragment.appendChild(window.picture(item, i));
    });

    containerPictures.appendChild(fragment);
  };

  var removePhotos = function () {
    var linkPhotos = containerPictures.querySelectorAll('.picture__link');
    var listPhotos = Array.prototype.slice.call(linkPhotos);

    listPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var sortComments = function (sortedPhotos) {
    sortedPhotos.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });

    return sortedPhotos;
  };

  var sortRandomize = function (sortedPhotos) {
    sortedPhotos.sort(function () {
      return Math.random() - 0.5;
    }).splice(NEW_PHOTO_LENGTH);

    return sortedPhotos;
  };

  var refreshGallery = function (element) {
    if (!element.classList.contains('img-filters__button') || element.classList.contains('img-filters__button--active')) {
      return;
    }

    var activeButton = imgFilters.querySelector('.img-filters__button--active');
    var newPhotos = copyPhotos.slice();

    if (element.id === 'filter-discussed') {
      photos = sortComments(newPhotos);
    } else if (element.id === 'filter-new') {
      photos = sortRandomize(newPhotos);
    } else {
      photos = copyPhotos;
    }

    activeButton.classList.remove('img-filters__button--active');
    element.classList.add('img-filters__button--active');

    appendPhotos(photos);
  };

  window.backend.load(onLoad, window.backend.showError);

  imgFilters.addEventListener('click', function (evt) {
    window.utils.debounce(evt.target, refreshGallery);
  });

  containerPictures.addEventListener('click', function (evt) {
    window.preview(evt, photos);
  });

  containerPictures.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, photos, window.preview);
  });
})();
