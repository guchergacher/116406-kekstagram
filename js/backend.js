'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';
  var STATUS_OK = 200;
  var SERVER_TIMEOUT = 10000;

  var Messages = {
    'unknown': 'Неизвестный статус: ',
    'connect': 'Произошла ошибка соединения',
    'time': 'Запрос не успел выполниться за ',
    'ok': 'Данные успешно отправлены.'
  };

  var xhrAction = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(Messages.unknown + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(Messages.connect);
    });

    xhr.addEventListener('timeout', function () {
      onError(Messages.time + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = xhrAction(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = xhrAction(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    showError: function (text) {
      window.utils.showMessage(text);
    },

    showSuccess: function () {
      window.utils.showMessage(Messages.ok);
    }
  };
})();
