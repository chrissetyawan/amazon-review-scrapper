var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
// const corsOptions = {
//   // origin: 'http://localhost:4200',
//   origin: 'http://45.76.157.202/4200',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))


const db = require('./app/config/db.config.js');

// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop DB and Resync with { force: false }');
});

require('./app/route/route.js')(app);

// Create a Server
var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
