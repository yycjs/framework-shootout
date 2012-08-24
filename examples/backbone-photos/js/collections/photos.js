var App = App || {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

$(function( $ ) {
  'use strict';
  App.Collections.Photos = Backbone.Collection.extend({

    model: App.Models.Photo,

    apiKey: '32c3b83036747c13dd9c1582c110f76a',

    currentPage: 1,

    url: 'http://api.flickr.com/services/rest/',

    fetch: function(keyword, add, callback){
      if (add) this.currentPage++;
      else this.currentPage = 1;

      callback = callback || $.noop;

      var that = this;

      $.ajax({
        url: this.url,
        data: {
          method: 'flickr.photos.search',
          format: 'json',
          api_key: this.apiKey,
          text: keyword,
          safe_search: 2,
          per_page: 20,
          page: this.currentPage
        },
        dataType : 'jsonp',
        jsonp : 'jsoncallback',
        success: function(response){
          if (add) that.add(that.parse(response));
          else that.reset(that.parse(response));
          callback();
        },
        error: this.handleError
      });
    },

    parse: function(response) {
      if (response.photos) return response.photos.photo;
    },

    handleError: function(response){
      console.log(response);
    }

  });
});