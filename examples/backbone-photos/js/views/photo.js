var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

  // Our Photo Controller/View
  // ---------------
  App.Views.Photo = Backbone.View.extend({

    // Use a stand-alone element so that this view is not dependent
    // on any parent element existing.
    tagName: 'div',

    template: _.template($('#photo-template').html()),

    events: {
    },

    initialize: function(options) {
      options = options || {};
      this.model = options.model || new App.Models.Photo({id: options.id});
      this.name = 'Photo #' + this.model.get('id');

      /* Binding Event Handlers */
      _.bindAll(this);
      this.model.on('change', this.render);

      this.model.fetch();
    },

    // Prepare the template and the el element for rendering by the router
    render: function() {
      var photo = _.extend( this.model.toJSON(), {image: this.model.medium()} );
      $(this.el).addClass('row-fluid').html(this.template({ photo: photo }));

      App.router.showView('#photo-content', this);
    },

    // Remove this view from the DOM, remove the view, and remove
    // any event listeners in order to clean up any possible memory leaks.
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