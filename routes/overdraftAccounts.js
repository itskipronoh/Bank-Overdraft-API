const express = require('express');
const router = express.Router();
const overdraftAccountsController = require('../controllers/overdraftAccountsController');

router.post('/', overdraftAccountsController.createAccount);
router.get('/', overdraftAccountsController.getAccounts);
router.get('/:id', overdraftAccountsController.getAccount);
router.put('/:id', overdraftAccountsController.updateAccount);
router.delete('/:id', overdraftAccountsController.deleteAccount);

module.exports = router;
