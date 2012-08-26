window.App = window.App || {};
window.App.Search = can.Control({
  init : function(el, ops) {
    this.element.html(can.view('js/search/views/init.ejs', {
      term : this.options.term
    }));
    this.search();
  },

  search : function() {
    // Retrieve the search term
    var term = this.element.find('.search-query').val();
    // Trigger a search event on our list
    $(this.options.list).trigger('search', term);
  },

  '.search-query keypress' : function(el, ev) {
    // Search on enter key press as well
    if(ev.which == 13) {
      this.search();
      ev.preventDefault();
    }
  },

  '.btn-search click' : 'search'
});