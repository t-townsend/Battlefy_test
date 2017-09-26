var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var router = express.Router();
var cors = require('cors');
require('dotenv').config()

var app = express();

/* I did this part when the open source projects weren't working I was making a header
request that I could call on the react front end, but Jaime pointed me to League-js, which
worked like gangbusters.

const summonerData = request({
  url: 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/sermeowington?api_key=RGAPI-f4cf9b94-ab55-4cec-adbe-7e4c5d23bfac',
  headers: 
    {
      "Origin": "https://developer.riotgames.com",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Riot-Token": "RGAPI-f4cf9b94-ab55-4cec-adbe-7e4c5d23bfac",
      "Accept-Language": "en-US,en;q=0.8,la;q=0.6",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  }
}, function (error, response, body) {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', JSON.parse(body));

  let length = JSON.parse(body).count;

  Summoner.remove({}, function (err, small) {
    if (err) { return handleError(err) };
  });
    let summonerInfos = {
      "profileIconId": JSON.parse(body).profileIconId
      "name": "SerMeowington",
      "summonerLevel": 30,
      "accountId": 215942119,
      "id": 53300045,
      "revisionDate": 1506232821000
      
    }
    let summoner = new Summoner(summonerInfos);
    summoner.save(function (err) {
      if (err) {
        return handleError(err);
      }
    });
  }
});

const Summoners = restful.model('summoners', SummonerSchema);
Summoners.methods(['get', 'put', 'post', 'delete']);
Summoners.register(app, '/api/summoners');
*/
process.env.LEAGUE_API_PLATFORM_ID = 'na1'

const LeagueJs = require('leaguejs');
const api = new LeagueJs("RGAPI-f4cf9b94-ab55-4cec-adbe-7e4c5d23bfac");

const info = 
  api.Summoner
    .gettingByName('sermeowington')
    .then(data => {
        'use strict';
        console.log(data);
    })
    .catch(err => {
        'use strict';
        console.log(err);
    });

api.Summoner
    .gettingByAccount(215942119, 'na1')
    .then(data => {
        'use strict';
        console.log(data);
    })
    .catch(err => {
        'use strict';
        console.log(err);
    });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001);
console.log('Server is running at post 3001');

module.exports = app;
