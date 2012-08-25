$(function() {
	can.route('/photos/:id');

	new PhotoList('#photo-list');
	new PhotoViewer('#photo-content');

	new Search('#search', {
		term : 'Calgary',
		list : '#photo-list'
	});
});
