'use strict';

const isObject = require('lodash.isobject');
const isArray = require('lodash.isarray');
const keys = require('lodash.keys');
const $ = require('jquery');
const mustache = require('mustache');
const tripcore = require('trip.core');
const mergeOptions = tripcore.mergeOptions;

const DOMViewControllerMixin = require('./DOMViewControllerMixin');
const DOMBinding = require('./bindings/DOMBinding');

class DOMView extends tripcore.View {

  constructor(model, scene, options) {
    super(model, scene);

    options = options || {};
    options.tag = options.tag || 'div';
    let template = '<{{tag}} ' +
      '{{#id}}id="{{.}}"{{/id}} ' +
      '{{#class}}class="{{.}}"{{/class}} ' +
      '{{#title}}title="{{.}}"{{/title}} ' +
      '{{#style}}style="{{.}}"{{/style}} ' +
      '{{#draggable}}draggable="true"{{/draggable}} ' +
      '></{{tag}}>';
    this.$el = $(mustache.render(template, options));
    if (options.prepend) {
      scene.container.prepend(this.$el);
    } else {
      scene.container.append(this.$el);
    }
    this.controllerMixin = DOMViewControllerMixin;
    this.options = options;
  }

  static mergeOptions(a, b) {
    return mergeOptions(a, b, {
      concatenations: ['class', 'style'],
    });
  }

  render() {
    this.$el.empty();
  }

  update() {
    console.warn('update not implemented for DOMView');
  }

  toHtml(template, view) {
    let placeHolders = {};
    let counter = 0;
    function replaceBindings(x) {
      if (isArray(x)) {
        x.forEach((y, i) => {
          if (y instanceof DOMBinding) {
            let id = '__' + (counter++) + '__';
            x[i] = '<div class="placeholder" id="' + id + '"></div>';
            placeHolders[id] = y;
          } else {
            replaceBindings(y);
          }
        });
      } else if (isObject(x)) {
        keys(view).forEach(key => {
          let val = x[key];
          if (val instanceof DOMBinding) {
            let id = '__' + (counter++) + '__';
            view[key] = '<div class="placeholder" id="' + id + '"></div>';
            placeHolders[id] = val;
          } else {
            replaceBindings(val);
          }
        });
      }
    }

    // Replace binding with placeholder HTML elements, the usen standard
    // mustache to render, the replace with binding element DOM. An alternative
    // would be to fork mustache to do this directly.
    replaceBindings(view);
    this.$el.html(mustache.render(template, view));
    keys(placeHolders).forEach(id => {
      this.$el.find('.placeholder#' + id).replaceWith(placeHolders[id].$el);
    }, this);

  }

  remove() {
    super.remove();
    this.$el.remove();
    this.$el = undefined;
  }

  hide() {
    this.$el.remove();
    this.hidden = true;
  }

  show() {
    this.emit('pre_render');
    if (this.options.prepend) {
      this.scene.container.prepend(this.$el);
    } else {
      this.scene.container.append(this.$el);
    }
    this.emit('post_render');
    this.hidden = false;
  }


}

module.exports = DOMView;
