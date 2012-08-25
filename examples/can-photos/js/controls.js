(function(namespace) {
	var PhotoViewer = can.Control({
		'{can.route} id' : function(source, event, id) {
			var element = this.element;
			Photo.findOne({ id : id }, function(photo) {
				element.html(can.view('photo-template', {
					photo : photo,
					json : JSON.stringify(photo.attr(), undefined, 4)
				}));
			});
		}
	});

	var PhotoList = can.Control({
		defaults : {
			page : 1
		}
	}, {
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
			// When scrolled to the bottom
			if (el.scrollTop() + el.innerHeight() >= el[0].scrollHeight) {
				// Switch to the next page
				this.options.page++;
				this.loadPhotos();
			}
		}
	});

	var Search = can.Control({
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

		'.search-query keypress' : function(el, ev) {
			// Search on enter key press as well
			if(ev.which == 13) {
				this.search();
				ev.preventDefault();
			}
		},

		'.btn-search click' : 'search'
	});

	// Export stuff to the namespace
	can.extend(namespace, {
		PhotoViewer : PhotoViewer,
		PhotoList : PhotoList,
		Search : Search
	})
})(window);
