var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';
  App.Collections.Photos = Backbone.Collection.extend({

    model: App.Models.Photo,

    url: 'http://api.flickr.com/services/rest/',

    parse: function(response) {
      // this.page = response.photos.page;
      // console.log(response);
      if (response.photos) return response.photos.photo;
    }

  });
});