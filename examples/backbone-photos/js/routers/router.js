var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

    // Our main router
    // ---------------
    App.Routers.AppRouter = Backbone.Router.extend({

        currentView: null,
        app: null,

        routes: {
            '': 'home',
            'photos': 'photos',
            'photos/:id': 'photo'
        },

        initialize: function(options) {
        },

        home: function(){
          this.navigate('#/photos', {trigger: true});
        },

        photos: function(){

          //Render the main app view one time
          if (!this.app){
            this.app = new App.Views.App();
            this.app.render();
          }
        },

        photo: function(id){
          this.photos();

          // Attempt to fetch the photo model from the photos collection
          var photo = this.app.photos.get(id);
          var view = new App.Views.Photo({id: id, model: photo});
        },

        // We have a common showView function that updates the
        // the current view, renders it and destroys the old one
        showView: function(selector, view) {
            if (this.currentView) this.currentView.destroy();
            $(selector).hide().html(view.el).fadeIn('slow');
            this.currentView = view;

            console.log('Rendered ' + view.name);

            return view;
        }
    });
});