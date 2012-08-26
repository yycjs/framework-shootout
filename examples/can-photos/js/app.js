$(function() {
	can.route('/photos/:photoid');

	new PhotoList('#photo-list');
	new PhotoViewer('#photo-content');

	new App.Search('#search', {
		term : 'Calgary',
		list : '#photo-list'
	});
});
