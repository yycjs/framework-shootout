var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  App.Models.Photo = Backbone.Model.extend({

    defaults: {},

    initialize: function() {

      /* Binding Event Handlers */
      _.bindAll(this);

      this.original();
      this.thumbnail();

      // this.trigger('photo:' + this.get('id'));
    },

    thumbnail: function() {
      this.set('thumbnail', this.buildUrl('thumb'));
    },

    original: function() {
      this.set('original', this.buildUrl());
    },

    medium: function() {
      this.set('medium', this.buildUrl('medium'));
    },

    large: function() {
      this.set('large', this.buildUrl('large'));
    },

    buildUrl: function(size) {
      var urlPrefix = 'http://farm' + this.get('farm') + '.static.flickr.com/' + this.get('server') + '/' + this.get('id') + "_" + this.get('secret');

      var sizes = {
         'square': '_s', // 75x75
         'thumb': '_m',
         'medium': '_z', // 640 on the longest side
         'large': '_b' // 1024 on the longest side
      };
      var sizeCode = sizes[size] || '';
      return urlPrefix + sizeCode +'.jpg';
    }

  });
});