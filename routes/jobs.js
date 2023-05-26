let express = require('express'),
	jobController = require('../controllers/jobs');
let router = express.Router();




let { isLoggedIn, isAdmin } = require('../middlewares/index');

router.get('/', jobController.showLandingPage);

router.get('/jobs', jobController.jobIndex);


router.get('/jobs/new', isLoggedIn, isAdmin, jobController.newJobForm);

router.post('/jobs', isLoggedIn, isAdmin, jobController.createJob);

router.get('/jobs/:id', jobController.showJob);

router.get('/jobs/:id/edit', isLoggedIn, isAdmin, jobController.editJobForm);

router.patch('/jobs/:id', isLoggedIn, isAdmin, jobController.updateJob);

router.delete('/jobs/:id', isLoggedIn, isAdmin, jobController.deleteJob);

router.get('/jobs/:jobId/apply', isLoggedIn, jobController.applyJob);

module.exports = router;