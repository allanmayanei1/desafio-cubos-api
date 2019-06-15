const JsonUtil = require('../utils/JsonUtil')
const moment = require('moment')
const {horaAtual} = require('../utils/DateUtil')

const create = (rule) =>{
    console.log(`\t[${horaAtual()}] - [create] ...`)
    return new Promise((resolve,reject)=>{
        JsonUtil.carregarJson().then(jsonArrayRule=>{
            return validRule(rule, jsonArrayRule).then(()=>{
                rule.id = jsonArrayRule.length ? jsonArrayRule[jsonArrayRule.length - 1].id : 0
                rule.id++
                jsonArrayRule.push(rule);
                JsonUtil.salvaJson(jsonArrayRule)
                console.log(`\t[${horaAtual()}] - [create] resolve`)
                return resolve(jsonArrayRule)

            }).catch(err=>{
                throw err // erro tratado no metodo carregarJSon() 
            })
        }).catch(err=>{
            console.log(`\t[${horaAtual()}] - [create] reject`)
            return reject(err)
        })

    })
}

const deleteRule = (id) =>{
    console.log(`\t[${horaAtual()}] - [deleteRule] ...`)
    return new Promise((resolve,reject)=>{
        JsonUtil.carregarJson().then(arrayRuleJson=>{
            if (arrayRuleJson.length > 0) {
                
                let novoArray = arrayRuleJson.filter(item =>{
                    if(item.id != id)
                        return item;
                })
                JsonUtil.salvaJson(novoArray)
                console.log(`\t[${horaAtual()}] - [deleteRule] resolve`)
                return resolve(novoArray);
            }else{
                console.log(`\t[${horaAtual()}] - [deleteRule] reject`)
                return reject('Erro ao deletar regra!')
            }
        });
    })
    
}

const listRuleAll = ()=>{
    console.log(`\t[${horaAtual()}] - [listRuleAll] ...`)
    return new Promise((resolve)=>{
        JsonUtil.carregarJson().then(arrayRuleJson=>{
            if (arrayRuleJson.length > 0) {
                console.log(`\t[${horaAtual()}] - [listRuleAll] resolve`)
                return resolve(arrayRuleJson)
            }
            console.log(`\t[${horaAtual()}] - [listRuleAll] vazia`)
            return resolve("Não tem regra cadastrada!")
        });
        
    })
}

const rulesAvailable = (params)=>{
    const output = []
    const ArrayDay = ArrayRangeDate(params);
    console.log(`\t[${horaAtual()}] - [rulesAvailable] ...`)
    return new Promise((resolve,reject)=>{
        JsonUtil.carregarJson().then(arrayRuleJson=>{
            if (arrayRuleJson.length >0) {
                ArrayDay.map(day =>{
                    let dayObject = {
                        day: '',
                        intervals: []
                    }
                    dayObject.day = day
                    arrayRuleJson.map(rule =>{
                        switch (rule.type) {
                            
                            case 'semanal':
                                if(rule.dayWeek.indexOf(moment(day,'DD-MM-YYYY').day()) != -1)
                                    dayObject.intervals.push({start : rule.startTime, end: rule.endTime})
                                break;
                            case 'especifico':
                                if(day == rule.date)
                                    dayObject.intervals.push({start : rule.startTime, end: rule.endTime})
                                break;
                        
                            default:
                                dayObject.intervals.push({start : rule.startTime, end: rule.endTime})
                                break;
                        }
                    })
                    output.push(dayObject)
                })
                console.log(`\t[${horaAtual()}] - [rulesAvailable] resolve`)
                return resolve(output)
            }
            console.log(`\t[${horaAtual()}] - [rulesAvailable] reject`)
            reject("Lista de regra vazia!")

        });


        
    })
}

const validRule = (rule, listRule)=>{
    console.log(`\t[${horaAtual()}] - [validRule] ...`)
    let conflito = false
    let msgErro = []
    if (listRule.length) {
        switch (rule.type) {
            case 'semanal':
                listRule.map(itemRule =>{
                    switch (itemRule.type) {
                        case 'semanal':
                            itemRule.dayWeek.map(day=>{
                                if(rule.dayWeek.indexOf(day) !== -1){
                                    compareTimeRules(rule,itemRule, (err)=>{
                                        if (err) {
                                            conflito = true;
                                            msgErro.push(`${err} para o dia ${day} da semana :`)
                                        }
                                    })
                                }
                            })
                            break;
                        case 'especifico':
                            if(rule.dayWeek.indexOf(moment(itemRule.date,'DD-MM-YYYY').day() !== -1)){
                                compareTimeRules(rule,itemRule, (err,result)=>{
                                    if (err) {
                                        conflito = true;
                                        msgErro.push(err)
                                    }
                                })
                            }
                            break;
                    
                        default:
                            compareTimeRules(rule,itemRule, (err)=>{
                                if (err) {
                                    conflito = true;
                                    msgErro.push(err)
                                }
                            })
                            break;
                    }
                })
                break;
            case 'especifico':
                listRule.map(itemRule =>{
                    switch (itemRule.type) {
                        case 'semanal':
                            if(itemRule.dayWeek.indexOf(moment(rule.date,'DD-MM-YYYY').day()) !== -1){
                                compareTimeRules(rule,itemRule, (err)=>{
                                    if (err) {
                                        conflito = true;
                                        msgErro.push(err)
                                    }
                                })
                            }
                            break;
                        case 'especifico':
                            if(itemRule.date == rule.date){
                                compareTimeRules(rule,itemRule, (err)=>{
                                    if (err) {
                                        conflito = true;
                                        msgErro.push(err)
                                    }
                                })
                            }
                            break;
                    
                        default:
                            compareTimeRules(rule,itemRule, (err)=>{
                                if (err) {
                                    conflito = true;
                                    msgErro.push(err)
                                }
                            })
                            break;
                    }
                })
                break;
        
            default:
                listRule.map(itemRule =>{
                    compareTimeRules(rule,itemRule, (err)=>{
                        if (err) {
                            conflito = true;
                            msgErro.push(err)
                        }
                    })
                })
                break;
        }
    }

    return new Promise((resolve,reject)=>{
        if (conflito) {
            console.log(`\t[${horaAtual()}] - [validRule] reject`)
            return reject(msgErro)
        }else{
            console.log(`\t[${horaAtual()}] - [validRule] resolve`)
            return resolve(true)
        }
    })
}

const compareTimeRules = (ruleNew, ruleToList, callback)=>{
    const timeStartNew = moment(ruleNew.startTime, 'HH:mm')
    const timeEndNew = moment(ruleNew.endTime, 'HH:mm')

    const timeStartToList = moment(ruleToList.startTime, 'HH:mm')
    const timeEndToList = moment(ruleToList.endTime, 'HH:mm')

    if(timeStartToList.isSameOrBefore(timeStartNew) && timeEndToList.isSameOrAfter(timeStartNew))
        return callback(`Horario inicial está em comflito com a regra: ID = ${ruleToList.id}`)
    if(timeStartToList.isSameOrBefore(timeEndNew) && timeEndToList.isSameOrAfter(timeEndNew))
        return callback(`Horario final está em comflito com a regra: ID = ${ruleToList.id}` )
    
}

const ArrayRangeDate = (params, callback) =>{
    const dateStart = moment(params.dateStart, 'DD-MM-YYYY')
    const dateEnd = moment(params.dateEnd, 'DD-MM-YYYY')
    const diffDay = dateEnd.diff(dateStart, 'days')
    let ArrayDays = []

    for (let i = 0; i <= diffDay; i++) {
        ArrayDays.push(dateStart.add((i < 1 ? 0 : 1), 'days').format('DD-MM-YYYY'))
    }
    return ArrayDays;
}

module.exports = {
    create:create,
    deleteRule:deleteRule,
    listRuleAll:listRuleAll,
    rulesAvailable:rulesAvailable
}