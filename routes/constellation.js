const express = require('express');
const controller = require('../controllers/constellation');
const router = express.Router();

router.get('/:constellation', controller.list);
router.post('/:constellation', controller.create);

module.exports = router;
