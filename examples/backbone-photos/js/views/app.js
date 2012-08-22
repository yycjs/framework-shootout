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
      'click button[type="submit"]': 'search'
    },

    initialize: function() {
      this.photos = new App.Collections.Photos();

      /* Binding Event Handlers */
      _.bindAll(this);
      this.photos.bind('reset', this.addAllPhotos, this);
      this.photos.bind('add', this.addPhoto, this);

      $('.pre-scrollable').bind('scroll', this.loadMore);

    },

    render: function() {
      console.log('app rendered');
      $('.search-query').val('Calgary');
      this.search();
    },

    search: function(ev){
      if (ev) ev.preventDefault();
      this.currentPage = 1;

      var flickrOptions = {
        data: {
          method: 'flickr.photos.search',
          format: 'json',
          api_key: '32c3b83036747c13dd9c1582c110f76a',
          text: $('.search-query').val(),
          safe_search: 1,
          per_page: 20,
          page: this.currentPage
        },
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        success: this.photos.parse,
        error: this.handleError
      };

      this.clearPhotos();
      this.photos.fetch(flickrOptions);
    },

    loadMore: function(ev){
      ev.preventDefault();

      if ($(ev.target).scrollTop() + $(ev.target).innerHeight() >= $(ev.target)[0].scrollHeight) {
        this.currentPage++;

        var flickrOptions = {
          data: {
            method: 'flickr.photos.search',
            format: 'json',
            api_key: '32c3b83036747c13dd9c1582c110f76a',
            text: $('.search-query').val(),
            safe_search: 1,
            per_page: 20,
            page: this.currentPage
          },
          dataType : 'jsonp',
          jsonp : 'jsoncallback',
          success: this.photos.parse,
          error: this.handleError,
          add: true
        };

        this.photos.fetch(flickrOptions);
      }
    },

    clearPhotos: function() {
      $("#photo-list").html('');
    },

    addPhoto: function( photo ) {
      var html = this.thumbnailTemplate({photo: photo.toJSON()});
      $("#photo-list").append(html);
    },

    handleError: function(error){
      console.log('Error Fetching Flickr Images');
    },

    addAllPhotos: function() {
      console.log(this.currentPage, this.photos);
      this.photos.each(this.addPhoto);
    }
  });
});