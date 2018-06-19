'use strict';

var PHOTOS_LENGTH = 25;
var MIN_LENGTH_LIKES = 15;
var MAX_LENGTH_LIKES = 200;
var MAX_LENGTH_AVATARS = 6;

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

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getData = function (key) {
  return photos[key] = {
    url: 'photos/' + (key + 1) + '.jpg',
    likes: getRandomNumber(MIN_LENGTH_LIKES, MAX_LENGTH_LIKES),
    comments: getRandomNumber(0, comments.length - 1),
    description: getRandomNumber(0, description.length - 1),
  };
};

var renderPhoto = function (data) {
  var template = document.querySelector('#picture').content.querySelector('.picture__link');
  var templateClone = template.cloneNode(true);

  var photo = templateClone.querySelector('.picture__img');
  var likes = templateClone.querySelector('.picture__stat--likes');
  var commentsCount = templateClone.querySelector('.picture__stat--comments');

  photo.setAttribute('src', data.url);
  likes.textContent = data.likes;
  commentsCount.textContent = data.comments;

  return templateClone;
};

var getCommentsText = function (elLenght) {
  var commentsText = '';

  for (var i = 0; i < elLenght; i++) {
    commentsText += '<li class="social__comment social__comment--text"><img class="social__picture" src="img/avatar-' +
    getRandomNumber(1, MAX_LENGTH_AVATARS) +
    '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">' +
    comments[i] +
    '</p></li>';
  }

  return commentsText;
};

var appendPicture = function () {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    var photoData = getData(i);
    var photo = renderPhoto(photoData);

    fragment.appendChild(photo);
  }

  pictures.appendChild(fragment);
}();

var showFullPicture = function () {
  var firstElement = photos[1];

  var picture = document.querySelector('.big-picture');
  var photo = picture.querySelector('.big-picture__img');
  var captionPhoto = picture.querySelector('.social__caption');
  var likes = picture.querySelector('.likes-count');
  var commentsWrapper = picture.querySelector('.social__comment-count');
  var commentsLoadmore = picture.querySelector('.social__loadmore');
  var commentsCount = commentsWrapper.querySelector('.comments-count');
  var commentsList = picture.querySelector('.social__comments');

  photo.setAttribute('src', firstElement.url);
  captionPhoto.textContent = description[firstElement.description];
  likes.textContent = firstElement.likes;
  commentsCount.textContent = firstElement.comments;
  commentsList.innerHTML = getCommentsText(firstElement.comments);

  commentsWrapper.classList.add('hidden');
  commentsLoadmore.classList.add('hidden');

  picture.classList.remove('hidden');
}();
