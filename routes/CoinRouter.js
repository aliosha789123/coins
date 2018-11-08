const express = require('express');
const app = express();
const CoinRouter = express.Router();
const Coin = require('../models/Coin.model');

CoinRouter.route('/').get((req, res) => {
  res.render('index');
});

CoinRouter.route('/create').get((req, res) => {
  res.render('create');
});

CoinRouter.route('/post').post(function (req, res) {
  const coin = new Coin(req.body);
  console.log(coin);
  coin.save()
    .then(coin => {
      res.redirect('/coins');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

CoinRouter.route('/').get(function (req, res) {
  Coin.find(function (err, coins){
     if(err){
       console.log(err);
     }
     else {
       res.render('index', { coins });
     }
   });
});

module.exports = CoinRouter;