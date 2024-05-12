const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({message: 'url is required'});
    }
    const shortID = shortid();
    await URL.create(
        {
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        },
    );
    // console.log('New URL created with shortID:', shortID);
    // return res.render('home', {
    //     id: shortID,
    // })
    return res.status(201).json({ID : shortID});
}

async function handleGetAnalytics (req, res){
    const shortId = req.params.shortId;
    const result =  await URL.findOne({shortId, createdBy: req.user._id});
    return res.json({totalClicks: result.visitHistory.length, analytics : result.visitHistory});
}


async function handleGetAllURLs (req, res){
    try {
        // Fetch all records, selecting only redirectURL and shortId
        const results = await URL.find({createdBy: req.user._id}, 'redirectURL shortId'); // Projection
        return res.json(results); // Return the result as an array
      } catch (error) {
        // Handle errors
        console.error("Error fetching URLs:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleGetAllURLs,
};