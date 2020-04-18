module.exports = function(app) {
    const reviews = require('../controller/review.controller.js');

    app.get('/api/', (req,res)=>{
        res.send('Welcome to Nodejs API');
    })

    // Retrieve a data by Id
    app.get('/api/review/:id', reviews.findById);
    
}
