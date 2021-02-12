const express = require('express');

const Histories = require('../models/History');

const router = express.Router();

/**
 * Serves homepage.
 * @name GET/
 */
router.get('/', (req, res) => {
  res.render('index');
});

/**
 * Access history URL.
 * @name GET/
 */
router.get('/histories', (req, res) => {
  const histories = Histories.findAll();
  if (histories === undefined) {
    res.status(404).json({
      error: `History ${req.params.historyID} not found.`,
    }).end();
  } else {
    res.status(200).json(histories).end();
  }
});

module.exports = router;
