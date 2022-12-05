const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('<div>hi~</div>');
});

module.exports = router;
