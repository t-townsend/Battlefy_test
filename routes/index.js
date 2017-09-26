var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  process.env.LEAGUE_API_PLATFORM_ID = 'na1'
  
  const LeagueJs = require('leaguejs');
  const api = new LeagueJs("RGAPI-f4cf9b94-ab55-4cec-adbe-7e4c5d23bfac");
  
  const info = 
    api.Summoner
      .gettingByName('sermeowington')
      .then(data => {
          'use strict';
          console.log(data);
          res.json(data);
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
  
  



  
});

module.exports = router;
