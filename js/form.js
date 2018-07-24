'use strict';

(function () {
  var MAX_SCALE_VALUE = 100;

  var buttonUploadFile = document.querySelector('#upload-file');
  var popupUpload = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var popupUploadButtonCancel = popupUpload.querySelector('.img-upload__cancel');
  var uploadImagePreview = popupUpload.querySelector('.img-upload__preview');
  var uploadImageResize = popupUpload.querySelector('.img-upload__resize');
  var textHashtags = popupUpload.querySelector('.text__hashtags');
  var textDescription = popupUpload.querySelector('.text__description');

  var openPopup = function () {
    setDefaultValue();

    window.utils.openPopup(popupUpload);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.utils.closePopup(popupUpload);
    document.removeEventListener('keydown', onPopupEscPress);

    setDefaultValue();

    buttonUploadFile.value = '';
  };

  var onPopupEscPress = function (evt) {
    var target = evt.target;

    if (!target.classList.contains('text__description') && !target.classList.contains('text__hashtags')) {
      window.utils.onEscPress(evt, closePopup);
    }
  };

  buttonUploadFile.addEventListener('change', function (evt) {
    openPopup(evt.target);
  });

  popupUploadButtonCancel.addEventListener('click', function () {
    closePopup();
  });

  var setScale = function (scale) {
    var value = scale / MAX_SCALE_VALUE;
    uploadImagePreview.style.transform = 'scale(' + value + ')';
  };

  var scaleElement = window.initializeScale(uploadImageResize, setScale);

  var setFilter = function (classElement, effectElement) {
    if (classElement) {
      uploadImagePreview.className = 'img-upload__preview effects__preview--' + classElement;
    }

    uploadImagePreview.style.filter = effectElement;
  };

  var filterElements = window.initializeFilters(popupUpload, setFilter);

  var setHashtag = function (inputHashErrors) {
    if (inputHashErrors !== '') {
      textHashtags.setCustomValidity(inputHashErrors);
      textHashtags.classList.add('field-invalid');
    } else {
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove('field-invalid');
    }
  };

  window.initializeHashtags(textHashtags, setHashtag);

  imgUploadForm.addEventListener('submit', function (evt) {
    var formData = new FormData(imgUploadForm);

    window.backend.save(formData, window.backend.showSuccess, window.backend.showError);

    closePopup();
    evt.preventDefault();
  });

  var setDefaultValue = function () {
    scaleElement.value = MAX_SCALE_VALUE + '%';

    filterElements[0].checked = true;
    filterElements[1].classList.add('hidden');

    setScale(MAX_SCALE_VALUE);
    setFilter('img-upload__preview', '');

    textHashtags.value = '';
    textDescription.value = '';
  };
})();
