'use strict';

(function () {
  var FILTER_BLUR = 20;
  var FILTER_BRIGHT = 33.33;

  var filterValues = {
    'chrome': 1,
    'sepia': 1,
    'marvin': 100,
    'phobos': 5,
    'heat': 3
  };
  var dragValues = {};

  window.initializeFilters = function (filter, setFilter) {
    var effectsList = filter.querySelector('.effects__list');
    var slider = filter.querySelector('.img-upload__scale');
    var checkbox = filter.querySelector('#effect-none');
    var sliderLine = filter.querySelector('.scale__line');
    var sliderPin = filter.querySelector('.scale__pin');
    var sliderLevel = filter.querySelector('.scale__level');
    var sliderValue = filter.querySelector('.scale__value');

    var setValueSlider = function (value, valueStyle) {
      sliderValue.value = value;

      sliderPin.style.left = valueStyle;
      sliderLevel.style.width = valueStyle;
    };

    var checkValueCheckbox = function (value) {
      var valueStyle = 0;
      var effect = '';

      switch (dragValues.effect) {
        case 'chrome':
          valueStyle = value / 100;
          effect = 'grayscale(' + valueStyle + ')';
          break;
        case 'sepia':
          valueStyle = value / 100;
          effect = 'sepia(' + valueStyle + ')';
          break;
        case 'marvin':
          effect = 'invert(' + value + '%)';
          break;
        case 'phobos':
          valueStyle = parseFloat(value / FILTER_BLUR, 10).toFixed(1);
          effect = 'blur(' + valueStyle + 'px)';
          break;
        case 'heat':
          valueStyle = parseFloat(value / FILTER_BRIGHT, 10).toFixed(1);
          effect = 'brightness(' + valueStyle + ')';
      }

      setFilter(null, effect);
      setValueSlider(value, value + '%');
    };

    effectsList.addEventListener('change', function (evt) {
      var effectName = evt.target.value;

      if (effectName === 'none') {
        slider.classList.add('hidden');
      } else {
        setValueSlider(filterValues[effectName], '100%');
        slider.classList.remove('hidden');
      }

      setFilter(effectName, '');
    });

    var onMouseDown = function (evt) {
      if (evt.which !== 1) {
        return;
      }

      var target = evt.target;

      if (!target) {
        return;
      }

      if (target === sliderPin) {
        var thumbCoords = window.utils.getCoords(sliderPin);
        dragValues.zone = sliderPin;
        dragValues.effect = effectsList.querySelector('input:checked').value;
        dragValues.x = evt.pageX - thumbCoords.left;
        dragValues.coords = window.utils.getCoords(sliderLine);

        document.addEventListener('mousemove', onMouseMove);
      }
    };

    var onMouseMove = function (evt) {
      evt.preventDefault();

      if (!dragValues.zone) {
        return;
      }

      var newLeft = evt.pageX - dragValues.coords.left;
      var sliderWidth = sliderLine.offsetWidth;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newLeft > sliderWidth) {
        newLeft = sliderWidth;
      }

      var newValue = Math.ceil(newLeft / sliderWidth * 100);

      checkValueCheckbox(newValue);
    };

    slider.addEventListener('mousedown', function (evt) {
      onMouseDown(evt);
    });

    document.addEventListener('mouseup', function () {
      dragValues = {};
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemdown', onMouseDown);
    });

    return [checkbox, slider];
  };
})();
