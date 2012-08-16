var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  App.Views.App = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#photo-app',

    thumbnailTemplate: _.template($('#thumbnail-template').html()),

    events: {
    },

    initialize: function() {
      this.photos = new App.Collections.Photos();
      this.flickrOptions = {
        data: {
          method: 'flickr.photos.search',
          format: 'json',
          api_key: '32c3b83036747c13dd9c1582c110f76a',
          text: 'calgary',
          safe_search: 1,
          per_page: 20,
          page: 1
        },
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        success: this.photos.parse,
        error: this.handleError
      };

      /* Binding Event Handlers */
      _.bindAll(this);
      this.photos.bind('reset', this.addAllPhotos, this);
      this.photos.bind('add', this.addPhoto, this);

      this.photos.fetch(this.flickrOptions);
    },

    render: function() {
      console.log('app rendered');
    },

    addPhoto: function( photo ) {
      var html = this.thumbnailTemplate({photo: photo.toJSON()});
      $("#photo-list").append(html);
    },

    handleError: function(error){
      console.log('Error Fetching Flickr Images');
    },

    addAllPhotos: function() {
      this.photos.each(this.addPhoto);
    }
  });
});