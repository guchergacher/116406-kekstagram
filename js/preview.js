'use strict';

(function () {
  var MAX_LENGTH_AVATARS = 6;
  var MAX_LENGTH_COMMENTS = 5;

  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

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

  var addComments = function (comments, parent) {
    var template = parent.querySelector('.social__comment:first-child');
    parent.innerHTML = '';

    comments.forEach(function (item, i) {
      var templateClone = template.cloneNode(true);

      var photo = templateClone.querySelector('.social__picture');
      var text = templateClone.querySelector('.social__text');

      if (i >= MAX_LENGTH_COMMENTS) {
        templateClone.classList.add('social__comment--hide');
      }

      photo.setAttribute('src', 'img/avatar-' + window.utils.getRandomNumber(1, MAX_LENGTH_AVATARS) + '.svg');
      text.textContent = item;

      parent.appendChild(templateClone);
    });
  };

  var countComments = function (list, wrapper, length) {
    var commentsLoadmore = popupPictureFull.querySelector('.social__loadmore');
    var commentsCount = 0;

    if (length > MAX_LENGTH_COMMENTS) {
      commentsCount = MAX_LENGTH_COMMENTS;
      commentsLoadmore.classList.remove('hidden');
    } else if (length < MAX_LENGTH_COMMENTS && length !== 0) {
      commentsCount = length;
      commentsLoadmore.classList.add('hidden');
    } else if (length === MAX_LENGTH_COMMENTS) {
      commentsCount = MAX_LENGTH_COMMENTS;
      commentsLoadmore.classList.add('hidden');
    } else {
      list.classList.add('hidden');
      wrapper.classList.add('hidden');
      commentsLoadmore.classList.add('hidden');
    }

    return commentsCount;
  };

  popupPictureFullBtnClose.addEventListener('keydown', function (evt) {
    window.utils.onEnterPress(evt, closePopup);
  });

  popupPictureFullBtnClose.addEventListener('click', function () {
    closePopup();
  });

  window.preview = function (elem, photos) {
    var target = elem.target.closest('.picture__link');

    if (target) {
      var photoId = target.getAttribute('data-id');

      var photo = popupPictureFull.querySelector('.big-picture__img img');
      var captionPhoto = popupPictureFull.querySelector('.social__caption');
      var likes = popupPictureFull.querySelector('.likes-count');
      var commentsList = popupPictureFull.querySelector('.social__comments');
      var commentsWrapper = popupPictureFull.querySelector('.social__comment-count');

      var commentsLength = photos[photoId].comments.length;
      var descriptionId = window.utils.getRandomNumber(0, description.length - 1);

      photo.setAttribute('src', photos[photoId].url);
      likes.textContent = photos[photoId].likes;
      captionPhoto.textContent = description[descriptionId];
      commentsWrapper.textContent = countComments(commentsList, commentsWrapper, commentsLength) + ' из ' + commentsLength + ' комментариев';

      addComments(photos[photoId].comments, commentsList);

      openPopup();

      elem.preventDefault();
    }
  };
})();
