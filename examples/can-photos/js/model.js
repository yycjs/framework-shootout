(function(namespace) {
	var Photo = can.Model({
		sizes : {
			'square': '_q', // 150x150
			'thumb': '_t', // 100 on longest side
			'small': '_m', // 240 on the longest side
			'medium': '_z', // 640 on the longest side
			'large': '_b' // 1024 on the longest side
		},
		apiKey: '32c3b83036747c13dd9c1582c110f76a',
		url: 'http://api.flickr.com/services/rest/',

		/**
		 * Find a list of photos.
		 *
		 * @param params
		 * @return {Photo.List}
		 */
		findAll : function(params) {
			var self = this,
				data = can.extend({
					method: 'flickr.photos.search',
					format: 'json',
					api_key: self.apiKey,
					safe_search: 2,
					per_page: 20
				}, params);

			return can.ajax({
				url: self.url,
				data: data,
				dataType : 'jsonp',
				jsonp : 'jsoncallback'
			}).pipe(function(raw) {
				return raw.photos.photo;
			});
		},

		/**
		 * Find a single Photo
		 * @param params
		 * @return {Photo}
		 */
		findOne : function(params) {
			var self = this,
				data = can.extend({
				method: 'flickr.photos.getInfo',
					format: 'json',
					api_key: this.apiKey
			}, params);
			data.photo_id = params.id;

			return can.ajax({
				url : self.url,
				dataType : 'jsonp',
				jsonp : 'jsoncallback',
				data : data
			}).pipe(function(raw) {
				return raw.photo;
			});
		}
	},
	// Prototype
	{
		/**
		 * Returns the URL for this photo instance
		 * @param size The size to use (defaults to 'thumb')
		 * @return {String}
		 */
		url : function(size) {
			var urlPrefix = 'http://farm' + this.attr('farm') +
					'.static.flickr.com/' + this.attr('server') +
					'/' + this.attr('id') +
					"_" + this.attr('secret');
			size = size || 'thumb';
			var sizeCode = this.constructor.sizes[size] || '';
			return urlPrefix + sizeCode +'.jpg';
		}
	});

	// Export our model to the namespace
	namespace.Photo = Photo;
})(window);
