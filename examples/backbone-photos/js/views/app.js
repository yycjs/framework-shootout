var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  // Our overall Application view which is the top-level piece of UI.
  // ---------------
  App.Views.App = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#photo-app',

    template: _.template($('#app-template').html()),
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
    },

    // Render the app view and bind any events
    render: function() {
      $(this.el).html(this.template).fadeIn('slow');
      $('.pre-scrollable').bind('scroll', this.loadMore);

      console.log('App View Rendered');
      $('.search-query').val('Calgary');
      $('button[type="submit"]').trigger('click');
    },

    // Search for more photos based on search keywords
    search: function(ev){
      ev.preventDefault();

      this.clearPhotos();
      this.photos.fetch($('.search-query').val(), false);
    },

    // Load more photos when user scrolls to bottom of image list
    loadMore: function(ev){
      ev.preventDefault();

      if ($(ev.target).scrollTop() + $(ev.target).innerHeight() >= $(ev.target)[0].scrollHeight) {
        this.photos.fetch($('.search-query').val(), true);
      }
    },

    // Remove photos from the DOM. We don't need to free the actual collection
    // because Backbone resets it when we perform a new search
    clearPhotos: function() {
      $("#photo-list").html('');
    },

    addPhoto: function( photo ) {
      photo = _.extend( photo.toJSON(), {thumbnail: photo.thumbnail()} );
      var html = this.thumbnailTemplate({photo: photo });
      $("#photo-list").append(html);
    },

    addAllPhotos: function() {
      this.photos.each(this.addPhoto);
    }
  });
});