'use strict';

var $ = require('jquery');

var Binding = require('./Binding');

class TextInput extends Binding {

  constructor(model, field) {
    super(model, field);

    var $el = $('<input class="' + field + '" type="text" value="' + model[field] + '">');
    ['onpaste', 'oninput'].forEach(event => {
      $el[0][event] = () => {
        let v = $el.val();
        try {
          model[field] = v;
        } catch(e) {
          // use events for validation errors
        }
      };
    });
    model.on('change', (changeField, changeValue) => {
      if ((field === changeField) && (this.$el.val() !== changeValue)) {
        $el.val(changeValue);
      }
    });

    this.$el = $el;
  }

}

module.exports = TextInput;
