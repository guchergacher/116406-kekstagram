'use strict';

(function () {
  var resizeElements = {
    input: 'resize__control--value',
    minus: 'resize__control--minus',
    plus: 'resize__control--plus',
    max: 100,
    min: 25,
    step: 25
  };

  window.initializeScale = function (uploadImageResize, setScale) {
    var controlValue = uploadImageResize.querySelector('.' + resizeElements.input);

    var calcScale = function (target) {
      var value = parseInt(controlValue.value, 10);

      if (target.classList.contains(resizeElements.minus) && value > resizeElements.min) {
        value -= resizeElements.step;
      } else if (target.classList.contains(resizeElements.plus) && value < resizeElements.max) {
        value += resizeElements.step;
      }

      if (value !== parseInt(controlValue.value, 10)) {
        setScale(value);
        controlValue.value = value + '%';
      }
    };

    uploadImageResize.addEventListener('click', function (evt) {
      var target = evt.target;

      if (!target.classList.contains(resizeElements.minus) && !target.classList.contains(resizeElements.plus)) {
        return;
      }

      calcScale(target);
    });

    return controlValue;
  };
})();
