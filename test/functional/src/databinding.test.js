'use strict';

const keys = require('lodash.keys');
const trip = require('trip.core');

const lib = require('../../../');
const $ = lib.$;
const Scene = lib.Scene;
const View = lib.View;
const TextInput = lib.TextInput;
const Text = lib.Text;
const Select = lib.Select;
const Checkbox = lib.Checkbox;

class BindingModel extends trip.Model {

  constructor() {
    super();

    var fields = {
      foo: 'some string',
      bar: 'b',
      baz: true,
      bob: 1,
    };

    var fieldSpecs = {
      bar: ['a', 'b', 'c'],
      bob: [{label: 'one', value: 1}, {label: 'two', value: 2}],
    };

    keys(fields).forEach(key => {
      this.__defineSetter__(key, value => {
        fields[key] = value;
        this.emitChange(key, value);
      });

      this.__defineGetter__(key, () => {
        return fields[key];
      });

      this.__defineGetter__(key + 'Spec', () => {
        return fieldSpecs[key];
      });
    });
  }

}


class BindingView extends View {

  constructor(model, scene) {
    super(model, scene);
  }

  render() {
    super.render();

    var view = {
      bindings: [
        new TextInput(this.model, 'foo'),
        new TextInput(this.model, 'foo'),
        new Text(this.model, 'foo'),
        new Select(this.model, 'bar'),
        new Select(this.model, 'bar'),
        new Text(this.model, 'bar'),
        new Select(this.model, 'bob'),
        new Select(this.model, 'bob'),
        new Text(this.model, 'bob'),
        new Checkbox(this.model, 'baz'),
        new Checkbox(this.model, 'baz'),
        new Text(this.model, 'baz'),
      ]
    };

    var template =
      '{{#bindings}}' +
        '<div>{{{.}}}</div>' +
      '{{/bindings}}';

    this.toHtml(template, view);
  }

  update() {
    // All updates handled by data bindings
  }

}

const domScene = new Scene($('#dom'));
const model = new BindingModel();
new BindingView(model, domScene);
