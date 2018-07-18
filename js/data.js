'use strict';

(function () {
  var PHOTOS_LENGTH = 25;
  var MIN_LENGTH_LIKES = 15;
  var MAX_LENGTH_LIKES = 200;

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

  var getRandomData = function (key) {
    photos[key] = {
      id: key,
      url: 'photos/' + (key + 1) + '.jpg',
      likes: window.utils.getRandomNumber(MIN_LENGTH_LIKES, MAX_LENGTH_LIKES),
      comments: window.utils.getRandomNumber(0, comments.length - 1),
      description: window.utils.getRandomNumber(0, description.length - 1)
    };
  };

  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    getRandomData(i);
  }

  window.data = {
    'photos': photos,
    'comments': comments,
    'description': description
  };
})();
