'use strict';

var PHOTOS_LENGTH = 25;
var MIN_LENGTH_LIKES = 15;
var MAX_LENGTH_LIKES = 200;
var MAX_LENGTH_AVATARS = 6;
var MAX_LENGTH_COMMENTS = 5;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var photos = [];

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var containerPictures = document.querySelector('.pictures');
var popupPictureFull = document.querySelector('.big-picture');
var popupPictureFullBtnClose = popupPictureFull.querySelector('.big-picture__cancel');
var currentPopup = null;

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(currentPopup);
  }
};

var closePopup = function () {
  currentPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentPopup = null;

  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function (popup) {
  currentPopup = popup;

  document.body.classList.add('modal-open');
  currentPopup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

containerPictures.addEventListener('click', function (evt) {
  showFullPicture(evt);
});

containerPictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showFullPicture(evt);
  }
});

popupPictureFullBtnClose.addEventListener('click', function () {
  closePopup(popupPictureFull);
});

var createPhotoObject = function (key) {
  photos[key] = {
    id: key,
    url: 'photos/' + (key + 1) + '.jpg',
    likes: getRandomNumber(MIN_LENGTH_LIKES, MAX_LENGTH_LIKES),
    comments: getRandomNumber(0, comments.length - 1),
    description: getRandomNumber(0, description.length - 1)
  };

  return photos[key];
};

var renderPhoto = function (data) {
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var templateClone = template.cloneNode(true);

  var photo = templateClone.querySelector('.picture__img');
  var likes = templateClone.querySelector('.picture__stat--likes');
  var commentsCount = templateClone.querySelector('.picture__stat--comments');

  templateClone.setAttribute('data-id', data.id);
  photo.setAttribute('src', data.url);
  likes.textContent = data.likes;
  commentsCount.textContent = data.comments;

  return templateClone;
};

var addComments = function (elLenght, parent) {
  var template = parent.querySelector('.social__comment:first-child');
  parent.innerHTML = '';

  for (var i = 0; i < elLenght; i++) {
    var templateClone = template.cloneNode(true);

    var photo = templateClone.querySelector('.social__picture');
    var text = templateClone.querySelector('.social__text');

    photo.setAttribute('src', 'img/avatar-' + getRandomNumber(1, MAX_LENGTH_AVATARS) + '.svg');
    text.textContent = comments[i];

    parent.appendChild(templateClone);
  }
};

var appendPicture = function () {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    var photoData = createPhotoObject(i);
    var photo = renderPhoto(photoData);

    fragment.appendChild(photo);
  }

  pictures.appendChild(fragment);
};

var showFullPicture = function (elem) {
  var target = elem.target.closest('.picture__link');

  if (target) {

    var photoId = target.getAttribute('data-id');

    var photo = popupPictureFull.querySelector('.big-picture__img img');
    var captionPhoto = popupPictureFull.querySelector('.social__caption');
    var likes = popupPictureFull.querySelector('.likes-count');
    var commentsWrapper = popupPictureFull.querySelector('.social__comment-count');
    var commentsLoadmore = popupPictureFull.querySelector('.social__loadmore');
    var commentsList = popupPictureFull.querySelector('.social__comments');

    var commentsCount = 0;

    if (photos[photoId].comments < MAX_LENGTH_COMMENTS && photos[photoId].comments !== 0) {
      commentsCount = photos[photoId].comments;
    } else if (photos[photoId].comments === commentsCount) {
      commentsList.classList.add('hidden');
      commentsWrapper.classList.add('hidden');
    } else {
      commentsCount = MAX_LENGTH_COMMENTS;
    }

    photo.setAttribute('src', photos[photoId].url);
    likes.textContent = photos[photoId].likes;
    captionPhoto.textContent = description[photos[photoId].description];
    commentsWrapper.textContent = commentsCount + ' из ' + photos[photoId].comments + ' комментариев';

    addComments(photos[photoId].comments, commentsList);

    commentsLoadmore.classList.add('hidden');

    openPopup(popupPictureFull);

    elem.preventDefault();
  }
};

appendPicture();

var btnUploadFile = document.querySelector('#upload-file');
var popupUpload = document.querySelector('.img-upload__overlay');
var popupUploadBtnCancel = popupUpload.querySelector('.img-upload__cancel');
var uploadEffect = popupUpload.querySelector('.effects');
var uploadImagePreview = popupUpload.querySelector('.img-upload__preview');

var changeEffectPreview = function (target) {
  var targetValue = 'effects__preview--' + target.value;

  uploadImagePreview.className = 'img-upload__preview ' + targetValue;
};

btnUploadFile.addEventListener('change', function () {
  openPopup(popupUpload);
});

popupUploadBtnCancel.addEventListener('click', function () {
  closePopup();
});


uploadEffect.addEventListener('change', function (evt) {
  changeEffectPreview(evt.target);
}, true);
