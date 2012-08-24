var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  // Our Photo Model
  // ---------------
  App.Models.Photo = Backbone.Model.extend({

    defaults: {},

    url: 'http://api.flickr.com/services/rest/',

    apiKey: '32c3b83036747c13dd9c1582c110f76a',

    initialize: function() {

      /* Binding Event Handlers */
      _.bindAll(this);
    },

    // Fetch an individual photo by id. This either updates either an
    // existing 'empty' model or one that already exists in our collection
    fetch: function(callback){
      callback = callback || $.noop;

      var that = this;

      $.ajax({
        url: this.url,
        data: {
          method: 'flickr.photos.getInfo',
          format: 'json',
          api_key: this.apiKey,
          photo_id: this.get('id')
        },
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        success: function(response){
          that.set(that.parse(response));
          callback();
        },
        error: this.handleError
      });
    },

    thumbnail: function() {
      return this.buildUrl('square');
    },

    small: function() {
      return this.buildUrl('small');
    },

    medium: function() {
      return this.buildUrl('medium');
    },

    large: function() {
      return this.buildUrl('large');
    },

    buildUrl: function(size) {
      var urlPrefix = 'http://farm' + this.get('farm') + '.static.flickr.com/' + this.get('server') + '/' + this.get('id') + "_" + this.get('secret');

      var sizes = {
        'square': '_q', // 150x150
        'thumb': '_t', // 100 on longest side
        'small': '_m', // 240 on the longest side
        'medium': '_z', // 640 on the longest side
        'large': '_b' // 1024 on the longest side
      };
      var sizeCode = sizes[size] || '';
      return urlPrefix + sizeCode +'.jpg';
    },

    parse: function(response){
      // The response will either be the raw response from the flickr API or
      // will be an backbone model, depending on whether the model is being
      // populated for the first time or is being updated.
      if (response.photo) return response.photo;
      else return response;
    },

    handleError: function(response){
      console.log(response);
    }

  });
});