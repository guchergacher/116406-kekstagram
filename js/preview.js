'use strict';

(function () {
  var MAX_LENGTH_AVATARS = 6;
  var MAX_LENGTH_COMMENTS = 5;

  var photos = window.data.photos;
  var comments = window.data.comments;
  var description = window.data.description;

  var popupPictureFull = document.querySelector('.big-picture');
  var popupPictureFullBtnClose = popupPictureFull.querySelector('.big-picture__cancel');

  var closePopup = function () {
    window.utils.closePopup(popupPictureFull);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function () {
    window.utils.openPopup(popupPictureFull);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.utils.onEscPress(evt, closePopup);
  };

  var addComments = function (elLenght, parent) {
    var template = parent.querySelector('.social__comment:first-child');
    parent.innerHTML = '';

    for (var i = 0; i < elLenght; i++) {
      var templateClone = template.cloneNode(true);

      var photo = templateClone.querySelector('.social__picture');
      var text = templateClone.querySelector('.social__text');

      photo.setAttribute('src', 'img/avatar-' + window.utils.getRandomNumber(1, MAX_LENGTH_AVATARS) + '.svg');
      text.textContent = comments[i];

      parent.appendChild(templateClone);
    }
  };

  var countComments = function (commentsList, commentsWrapper, photoId) {
    var commentsCount = 0;

    if (photos[photoId].comments < MAX_LENGTH_COMMENTS && photos[photoId].comments !== 0) {
      commentsCount = photos[photoId].comments;
    } else if (photos[photoId].comments === commentsCount) {
      commentsList.classList.add('hidden');
      commentsWrapper.classList.add('hidden');
    } else {
      commentsCount = MAX_LENGTH_COMMENTS;
    }

    return commentsCount;
  };

  popupPictureFullBtnClose.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, closePopup);
  });

  popupPictureFullBtnClose.addEventListener('click', function () {
    closePopup();
  });

  window.preview = function (elem) {
    var target = elem.target.closest('.picture__link');

    if (target) {
      var photoId = target.getAttribute('data-id');

      var photo = popupPictureFull.querySelector('.big-picture__img img');
      var captionPhoto = popupPictureFull.querySelector('.social__caption');
      var likes = popupPictureFull.querySelector('.likes-count');
      var commentsWrapper = popupPictureFull.querySelector('.social__comment-count');
      var commentsLoadmore = popupPictureFull.querySelector('.social__loadmore');
      var commentsList = popupPictureFull.querySelector('.social__comments');

      photo.setAttribute('src', photos[photoId].url);
      likes.textContent = photos[photoId].likes;
      captionPhoto.textContent = description[photos[photoId].description];
      commentsWrapper.textContent = countComments(commentsList, commentsWrapper, photoId) + ' из ' + photos[photoId].comments + ' комментариев';

      addComments(photos[photoId].comments, commentsList);

      commentsLoadmore.classList.add('hidden');

      openPopup();

      elem.preventDefault();
    }
  };
})();
