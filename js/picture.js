'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('.picture__link');

  window.picture = function (data, id) {
    var templateClone = template.cloneNode(true);
    var photo = templateClone.querySelector('.picture__img');
    var likes = templateClone.querySelector('.picture__stat--likes');
    var commentsCount = templateClone.querySelector('.picture__stat--comments');

    templateClone.setAttribute('data-id', id);
    photo.setAttribute('src', data.url);
    likes.textContent = data.likes;
    commentsCount.textContent = data.comments.length;

    return templateClone;
  };
})();
