const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetAllURLs } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/all', handleGetAllURLs);

router.get('/analytics/:shortId',handleGetAnalytics);


module.exports = router;

