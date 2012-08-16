var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  // Our Photo Controller/View
  App.Views.Photo = Backbone.View.extend({


    tagName: 'div',

    template: _.template($('#photo-template').html()),

    events: {
    },

    initialize: function(options) {
      this.model = options.model;

      /* Binding Event Handlers */
      _.bindAll(this);

    },

    render: function() {
      console.log('photo rendered');
      $(this.el).addClass('row-fluid').html(this.template({photo: this.model.toJSON()}));

      return this;
    },

    // Remove this view from the DOM.
    destroy: function() {
      var that = this;

      $(this.el).fadeOut('slow', function(){
        $(that.el).remove();
        that.remove();
        that.unbind();
      });
    }
  });
});