'use strict';

(function () {
  var hashtagsList = [
    '- Хэш-тег начинается с символа `#` (решётка) и состоит из одного слова;\n',
    '- Хэш-теги разделяются пробелами;\n',
    '- Один и тот же хэш-тег не может быть использован дважды;\n',
    '- Нельзя указать больше пяти хэш-тегов;\n',
    '- Максимальная длина одного хэш-тега 20 символов;\n'
  ];

  var fieldCheckHashtags = function (field) {
    var fieldValue = field.value.toLowerCase();
    var hashtags = fieldValue.split(' ');
    var errors = '';

    if (fieldValue === '') {
      return '';
    }

    var beginsSymbolHash = hashtags.every(function (hashtag) {
      return hashtag.search(/^#[\wа-яё]{2,}/) !== -1;
    });

    var separatedSpacesHash = hashtags.every(function (hashtag) {
      return hashtag.search(/[\wа-яё#]#/) === -1;
    });

    var matchSearchHash = hashtags.every(function (hashtag, index, arr) {
      for (var i = index + 1; i < arr.length; i++) {
        if (hashtag === arr[i]) {
          return false;
        }
      }

      return true;
    });

    var valueLengthHash = hashtags.every(function (hashtag) {
      return hashtag.length <= 20;
    });

    if (!beginsSymbolHash) {
      errors += hashtagsList[0];
    }

    if (!separatedSpacesHash) {
      errors += hashtagsList[1];
    }

    if (!matchSearchHash) {
      errors += hashtagsList[2];
    }

    if (hashtags.length > 5) {
      errors += hashtagsList[3];
    }

    if (!valueLengthHash) {
      errors += hashtagsList[4];
    }

    return errors;
  };

  window.initializeHashtags = function (field, setHashtag) {
    field.addEventListener('input', function () {
      var inputHashErrors = fieldCheckHashtags(field);

      setHashtag(inputHashErrors);
    });
  };
})();
