// need to require the express Router here so we can access the html files/routes
const router = require('express').Router()

// allows you to extract contents, aka provides a path, for wokring with files and directory paths.
// `module.exports` is how you make the objects availble to extract 
const path = require('path') // path is part of the node module (dont need to install)

// the router will GET the path '/exercise'
router.get('/exercise', (req, res) => {
    // sendFile is sending this info to the file we call in the string '../public/exercise.html', and __dirname is the absolute path (index.html)
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

// the router will GET the path '/stats'
router.get('/stats', (req, res) => {
    // sendFile is sending this info to the file we call in the string '../public/stats.html', and __dirname is the absolute path (index.html)
    res.sendFile(path.join(__dirname, '../public/stats.html'))
})

// exporting the routes - should be how the PATHS are connected and how info can
module.exports = router