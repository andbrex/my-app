const express = require('express');
const controller = require('../controllers/constellation');
const service = require('../service/service')
const router = express.Router();

router.get('/:constellation', async( req , res ) => {
    await service.list(req.params.constellation);
    res.status(200).send(stars);
})
router.post('/:constellation', controller.create);

module.exports = router;
