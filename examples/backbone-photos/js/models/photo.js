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

      this.buildUrl();
    },

    buildUrl: function() {
      var urlPrefix = 'http://farm' + this.get('farm') + '.static.flickr.com/' + this.get('server') + '/' + this.get('id') + "_" + this.get('secret');
      this.set('thumbnailUrl', urlPrefix + '_m.jpg');
      this.set('originalUrl', urlPrefix + '.jpg');
    }

  });
});