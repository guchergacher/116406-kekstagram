'use strict';

(function () {
  var containerPictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var photos = window.data.photos;

  for (var i = 0; i < photos.length; i++) {
    var item = window.picture(photos[i]);
    fragment.appendChild(item);
  }

  containerPictures.appendChild(fragment);

  containerPictures.addEventListener('click', function (evt) {
    window.preview(evt);
  });

  containerPictures.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, window.preview);
  });
})();
