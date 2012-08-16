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

        routes: {
            '': 'home',
            'photos/:id': 'photo'
        },

        initialize: function(options) {
        },

        home: function(){
          this.app = new App.Views.App();
          // this.showView('#app', view);
        },

        photo: function(id){
          this.app = this.app || new App.Views.App();

          //fetch photo model from photos collection by id
          var photo = this.app.photos.get(id);
          var view = new App.Views.Photo({model: photo});

          this.showView('#photo-content', view);
        },

        showView: function(selector, view) {
            if (this.currentView) this.currentView.destroy();
            $(selector).hide().html(view.render().el).fadeIn('slow');
            this.currentView = view;

            return view;
        }
    });
});