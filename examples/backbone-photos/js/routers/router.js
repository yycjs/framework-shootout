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
            'photos/:id': 'photo'
        },

        initialize: function(options) {
        },

        home: function(){
          if (!this.app){
            this.app = new App.Views.App();
            // this.showView('#app', view);
            this.app.render();
          }
        },

        photo: function(id){
          this.home();

          console.log(id);

          //fetch photo model from photos collection by id
          var photo = this.app.photos.get(id);
          if (photo){
            var view = new App.Views.Photo({model: photo});
            this.showView('#photo-content', view);
          }
          else {
            var that = this;
            this.app.photos.on('reset', function(){
              photo = that.app.photos.get(id);
              var view = new App.Views.Photo({model: photo});
              that.showView('#photo-content', view);
            });
          }
        },

        showView: function(selector, view) {
            if (this.currentView) this.currentView.destroy();
            $(selector).hide().html(view.render().el).fadeIn('slow');
            this.currentView = view;

            return view;
        }
    });
});