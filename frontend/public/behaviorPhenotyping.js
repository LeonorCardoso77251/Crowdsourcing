var userLog = (function () {
  //
  // Private variables
  //
  var defaults = {
    // Available functionality
    clickCount: true,
    clickDetails: true,
    mouseMovement: true,
    context: true,
    keyLogger: true,

    // Action Item
    actionItem: {
      processOnAction: false,
      selector: "",
      event: "",
    },

    processTime: 15,
    processData: function (results) {
      console.log(results);
    },
  };

  // Results object
  var results = {
    userInfo: {
      appCodeName: navigator.appCodeName || "",
      appName: navigator.appName || "",
      vendor: navigator.vendor || "",
      platform: navigator.platform || "",
      userAgent: navigator.userAgent || "",
    },
    time: {
      totalTime: 0,
      timeOnPage: 0,
    },
    clicks: {
      clickCount: 0,
      clickDetails: [],
    },
    mouseMovements: [],
    contextChange: [],
    keyLogger: [],
  };

  var support = !!document.addEventListener;
  var settings = defaults;
  var initialized = false;

  /**
   * Merge defaults with options
   */
  function getSettings(defaults, options) {
    var option;
    for (option in options) {
      if (options.hasOwnProperty(option)) {
        defaults[option] = options[option];
      }
    }
    return defaults;
  }

  /**
   * Initialize listeners (SPA-safe)
   */
  function setupListeners() {
    if (initialized) return;
    initialized = true;

    // ⏱ Timer
    window.setInterval(function () {
      if (document.visibilityState === "visible") {
        results.time.timeOnPage++;
      }
      results.time.totalTime++;

      if (
        settings.processTime > 0 &&
        results.time.totalTime % settings.processTime === 0
      ) {
        processResults();
      }
    }, 1000);

    // 🖱 Clicks
    if (settings.clickCount || settings.clickDetails) {
      document.addEventListener("mouseup", function (event) {
        if (settings.clickCount) {
          results.clicks.clickCount++;
        }
        if (settings.clickDetails) {
          results.clicks.clickDetails.push({
            timestamp: Date.now(),
            node: event.target.outerHTML,
            x: event.pageX,
            y: event.pageY,
          });
        }
      });
    }

    // 🐭 Mouse movement
    if (settings.mouseMovement) {
      document.addEventListener("mousemove", function (event) {
        results.mouseMovements.push({
          timestamp: Date.now(),
          x: event.pageX,
          y: event.pageY,
        });
      });
    }

    // 👁 Context change
    if (settings.context) {
      document.addEventListener("visibilitychange", function () {
        results.contextChange.push({
          timestamp: Date.now(),
          type: document.visibilityState,
        });
      });
    }

    // ⌨ Key logger
    if (settings.keyLogger) {
      document.addEventListener("paste", function (event) {
        var pastedText = event.clipboardData
          ? event.clipboardData.getData("text/plain")
          : null;

        if (pastedText) {
          results.keyLogger.push({
            timestamp: Date.now(),
            data: pastedText,
            type: "paste",
          });
        }
      });

      document.addEventListener("keyup", function (event) {
        results.keyLogger.push({
          timestamp: Date.now(),
          data: event.key,
          type: "keypress",
        });
      });
    }

    // 🎯 Action item
    if (settings.actionItem.processOnAction) {
      var node = document.querySelector(settings.actionItem.selector);
      if (!node) throw new Error("Selector was not found.");
      node.addEventListener(settings.actionItem.event, function () {
        processResults();
      });
    }
  }

  /**
   * Init (SPA compatible)
   */
  function init(options) {
    if (!support) return;

    settings = defaults;
    if (options && typeof options === "object") {
      settings = getSettings(defaults, options);
    }

    // ✅ React/Vite safe
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupListeners);
    } else {
      setupListeners();
    }
  }

  /**
   * Process results
   */
  function processResults() {
    if (settings && typeof settings.processData === "function") {
      settings.processData(results);
    }
  }

  return {
    init: init,
    processResults: processResults,
  };
})();
