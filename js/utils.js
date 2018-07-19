'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var timeout = null;

  window.utils = {
    getCoords: function (element) {
      var box = element.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    },

    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    debounce: function (element, actionFn) {
      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(actionFn, DEBOUNCE_INTERVAL, element);
    },

    onEscPress: function (evt, actionFn) {
      if (evt.keyCode === ESC_KEYCODE) {
        actionFn();
      }
    },

    onEnterPress: function (evt, photos, actionFn) {
      if (evt.keyCode === ENTER_KEYCODE) {
        actionFn(evt, photos);
      }
    },

    closePopup: function (element) {
      element.classList.add('hidden');
      document.body.classList.remove('modal-open');
    },

    openPopup: function (element) {
      document.body.classList.add('modal-open');
      element.classList.remove('hidden');
    },

    showMessage: function (text) {
      var template = document.querySelector('#picture').content.querySelector('.error');
      var templateClone = template.cloneNode(true);
      var messageText = templateClone.querySelector('.img-upload__message-text');
      var errorLinks = templateClone.querySelector('.error__links');

      errorLinks.classList.add('hidden');
      messageText.textContent = text;

      document.body.appendChild(templateClone);
      templateClone.classList.remove('hidden');

      setTimeout(function () {
        templateClone.classList.add('hidden');
      }, 3000);
    }
  };
})();
