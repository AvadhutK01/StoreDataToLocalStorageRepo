const path = require('path');
const express = require('express');
let router = express.Router();
const datacontroller = require('../controllers/datacontroller');
router.get('/', datacontroller.getIndex);
router.post('/post-data', datacontroller.postData);
router.get('/get-users', datacontroller.getUsers);
router.post('/delete-user', datacontroller.dataUsers);
router.post('/update-user', datacontroller.updateUsers);
module.exports = router;