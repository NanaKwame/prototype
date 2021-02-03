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
 * @name GET/:historyID
 */
// router.get('/:historyID', (req, res) => {
//   const history = Histories.findOne(req.params.historyID);
//   if (history === undefined) {
//     res.status(404).json({
//       error: `History URL ${req.params.historyID} not found.`,
//     }).end();
//   } else {
//     res.redirect(history.url);
//   }
// });

module.exports = router;
