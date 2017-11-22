const issuesDB = require('../datastore/issue.store');

function loadRoutes(app) {
	app.get('/', function(req, res) {
		const issues = issuesDB.getAll();
		const criticalIssues = issues.filter(issue => issue.severity === 'Critical');
		const highIssues = issues.filter(issue => issue.severity === 'High');
		const mediumIssues = issues.filter(issue => issue.severity === 'Medium');

		res.render('index', {
			criticalPercent: criticalIssues.length / issues.length,
			highPercent: highIssues.length / issues.length,
			mediumPercent: mediumIssues.length / issues.length
		});
	});

	app.use('/issues', require('./issue'));

  // FIXME: Test to enable only on test.
  // if (process.env.NODE_ENV === 'test') {
  app.post('/test/reset', function(req, res) {
    issuesDB.reset();

    res.send('OK');
  });

  app.post('/test/seed', function(req, res) {
    issuesDB.add(req.body);

    res.send('OK');
  });
}

module.exports = loadRoutes;
