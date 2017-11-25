const express = require('express');
const issuesDB = require('../models/issue.store');
const router = express.Router();

router.get('/', function(req, res) {
  const issues = issuesDB.getAllOpen();
  let criticalPercent = 0, highPercent = 0, mediumPercent = 0, closedPercent = 0;

  const criticalIssues = issues.filter(issue => issue.severity === 'Critical');
  const highIssues = issues.filter(issue => issue.severity === 'High');
  const mediumIssues = issues.filter(issue => issue.severity === 'Medium');
  const closed = issues.filter(issue => issue.status === 'closed');
  const openCount = issues.filter(issue => issue.status === 'open');

  if (issues.length) {
    criticalPercent = criticalIssues.length / issues.length;
    highPercent = highIssues.length / issues.length;
    mediumPercent = mediumIssues.length / issues.length;
    closedPercent = closed.length / issues.length;
  }

  res.render('dashboard', {
    criticalPercent,
    highPercent,
    mediumPercent,
    closedPercent,
    openCount: openCount.length
  });
});

module.exports = router;
