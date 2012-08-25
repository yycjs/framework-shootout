(function(namespace) {
	namespace.PhotoViewer = can.Control({
		init : function(el, ops) {
			var self = this;
			can.route('/photos/:id');
			can.route.bind( 'id', function( ev, newVal ) {
				self.loadPhoto(newVal);
			});
		},

		loadPhoto : function(id) {
			var self = this;
			Photo.findOne({ id : id }, function(photo) {
				self.element.html(can.view('photo-template', {
					photo : photo,
					json : JSON.stringify(photo.attr(), undefined, 4)
				}));
			});
		}
	});

	namespace.PhotoList = can.Control({
			defaults : {
				page : 1
			}
		},
		{
		' search' : function(el, ev, term) {
			this.options.text = term;
			// When the search term changes we need to delete all old thumbnails
			this.element.find('ul').empty();
			// Now we can just load it with the current options
			this.loadPhotos();
		},

		loadPhotos : function() {
			var element = this.element;
			Photo.findAll(this.options, function(photos) {
				element.find('ul').append(can.view('photo-list-template', {
					photos : photos
				}));
			});
		},

		scroll : function(el, ev) {
			if (el.scrollTop() + el.innerHeight() >= el[0].scrollHeight) {
				// Switch to the next page
				this.options.page++;
				this.loadPhotos();
			}
		}
	});

	namespace.Search = can.Control({
		init : function(el, ops) {
			this.element.html(can.view('search-template', {
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

		'.search-query change' : function(el) {
			this.search();
		},

		'.search-query keypress' : function(el, ev) {
			// Search on enter key press as well
			if(ev.which == 13) {
				this.search();
				ev.preventDefault();
			}
		},

		'.btn-search click' : function() {
			this.search();
		}
	});
})(window);