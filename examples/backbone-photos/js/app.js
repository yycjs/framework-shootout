var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function() {

  // Start the app by creating the router and initializing it.
  // This will cause it to navigate to the home route
  App.router = new App.Routers.AppRouter();
  Backbone.history.start();

});