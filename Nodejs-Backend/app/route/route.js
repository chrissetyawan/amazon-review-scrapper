module.exports = function(app) {
    const reviews = require('../controller/review.controller.js');

    // Retrieve a data by Id
    app.get('/api/review/:id', reviews.findById);
    
}
