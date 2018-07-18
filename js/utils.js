'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

    onEscPress: function (evt, actionFn) {
      if (evt.keyCode === ESC_KEYCODE) {
        actionFn();
      }
    },

    onEnterPress: function (evt, actionFn) {
      if (evt.keyCode === ENTER_KEYCODE) {
        actionFn(evt);
      }
    },

    closePopup: function (element) {
      element.classList.add('hidden');
      document.body.classList.remove('modal-open');
    },

    openPopup: function (element) {
      document.body.classList.add('modal-open');
      element.classList.remove('hidden');
    }
  };
})();
