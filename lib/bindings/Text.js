'use strict';

var $ = require('jquery');

var Binding = require('./Binding');

class Text extends Binding {

  constructor(model, field) {
    super(model, field);

    var $el = $('<span class="' + field + '">' + model[field] + '</span>');
    model.on('change', (changeField, changeValue) => {
      if (field === changeField) {
        $el.html(String(changeValue));
      }
    });
    this.$el = $el;
  }

}

module.exports = Text;
