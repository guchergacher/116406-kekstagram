'use strict';

(function () {
  var ResizeElements = {
    input: 'resize__control--value',
    minus: 'resize__control--minus',
    plus: 'resize__control--plus',
    max: 100,
    min: 25,
    step: 25
  };

  window.initializeScale = function (uploadImageResize, setScale) {
    var controlValue = uploadImageResize.querySelector('.' + ResizeElements.input);

    var calcScale = function (target) {
      var value = parseInt(controlValue.value, 10);

      if (target.classList.contains(ResizeElements.minus) && value > ResizeElements.min) {
        value -= ResizeElements.step;
      } else if (target.classList.contains(ResizeElements.plus) && value < ResizeElements.max) {
        value += ResizeElements.step;
      }

      if (value !== parseInt(controlValue.value, 10)) {
        setScale(value);
        controlValue.value = value + '%';
      }
    };

    uploadImageResize.addEventListener('click', function (evt) {
      var target = evt.target;

      if (!target.classList.contains(ResizeElements.minus) && !target.classList.contains(ResizeElements.plus)) {
        return;
      }

      calcScale(target);
    });

    return controlValue;
  };
})();
