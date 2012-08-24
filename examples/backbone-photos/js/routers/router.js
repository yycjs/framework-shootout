var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';

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
          if (!this.app){
            this.app = new App.Views.App();
            this.app.render();
          }
        },

        photo: function(id){
          this.photos();

          var photo = this.app.photos.get(id);
          var view = new App.Views.Photo({id: id, model: photo});
        },

        showView: function(selector, view) {
            if (this.currentView) this.currentView.destroy();
            $(selector).hide().html(view.el).fadeIn('slow');
            this.currentView = view;

            console.log('Rendered ' + view.name);

            return view;
        }
    });
});