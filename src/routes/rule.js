const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/Rule');

const basePath = '/api/rule/'
router.post(`${basePath}create`, ruleController.create)
router.delete(`${basePath}delete/:id`, ruleController.deleteRule)
router.get(`${basePath}findAll`, ruleController.listRuleAll)
router.get(`${basePath}rulesAvailable/:dateStart/:dateEnd`, ruleController.rulesAvailable)

module.exports = router;