const RuleService = require('../services/Rule');

// const findAll = (req, res) => {
//     RuleService.findAll(req.params)
//         .then((actionData) => {
//             res.status(200).send(actionData);
//         }).catch(err => res.status(400).send(err))
// }

const create = (req, res) => {
    RuleService.create(req.body)
        .then((actionData) => {
            res.status(200).send(actionData);
        }).catch(err => res.status(400).send(err))
}

const deleteRule = (req, res) => {
    RuleService.deleteRule(req.params.id)
        .then((actionData) => {
            res.status(200).send(actionData);
        }).catch(err => res.status(400).send(err))
}

const listRuleAll = (req, res) => {
    RuleService.listRuleAll(req.params.id)
        .then((actionData) => {
            res.status(200).send(actionData);
        }).catch(err => res.status(400).send(err))
}

const rulesAvailable = (req, res) => {
    RuleService.rulesAvailable(req.params)
        .then((actionData) => {
            res.status(200).send(actionData);
        }).catch(err => res.status(400).send(err))
}


module.exports = {
    //findAll: findAll,
    create:create,
    deleteRule:deleteRule,
    listRuleAll:listRuleAll,
    rulesAvailable:rulesAvailable
}