'use strict';

var isFunction = require('lodash.isfunction');

// Events are in the Backbone form of
// {
//   '[type] [selector]':'[function]'
//   '[type]'           :'[function]'
// }
// where selector may have a space, e.g. 'foo > bar'
function ViewControllerMixin(view) {

  var _this = this;

  function attachEvents() {

    // Events can be an object or a function that returns an object
    var events;
    if (isFunction(view.events)) {
      events = view.events();
    } else {
      events = view.events || {};
    }

    view.$el.off();
    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        let firstSpaceIndex = key.indexOf(' ');
        let type;
        let selector;
        // Event on root element
        if (firstSpaceIndex === -1) {
          type = key;
        } else {
          type = key.substr(0, firstSpaceIndex);
          selector = key.substr(firstSpaceIndex + 1);
        }
        var fn = events[key];
        (function(fn) {
          // Use 'on' instead of the elem[type] so that the handlers
          // stay bound if the view is updated with new elements
          view.$el.on(type, selector, function(event) {
            if (_this[fn] === undefined) {
              throw new Error('mixin target has no function: ' + fn);
            }
            _this[fn](event, view);
          });
        })(fn);
      }
    }
  }

  attachEvents();
}

module.exports = ViewControllerMixin;
