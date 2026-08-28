System.register(["./application.js"], function (_export, _context) {
  "use strict";

  var Application, application;
  function topLevelImport(url) {
    return System["import"](url);
  }
  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      application = new Application();
      topLevelImport('cc').then(function (engine) {
        return application.init(engine);
      }).then(function () {
        return application.start();
      }).then(function () {
        if (window.__restartLifeReady) window.__restartLifeReady();
      })["catch"](function (err) {
        if (window.__restartLifeFailed) window.__restartLifeFailed(err);
        console.error(err);
      });
    }
  };
});