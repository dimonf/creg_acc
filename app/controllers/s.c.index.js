exports.render = function(req, res) {
		res.render('index',{
				title: 'Hello world',
				userFullName: req.user ? req.user.fullName: ''
		});
}
