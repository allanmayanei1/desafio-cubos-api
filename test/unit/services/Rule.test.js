const RuleService = require('../../../src/services/Rule')
const JsonUtil = require('../../../src/utils/JsonUtil')

const ruleSemanal = {
	"id" :0,
	"type": "semanal",
	"dayWeek" : [ 0 , 6],
	"startTime" : "14:00",
	"endTime" :"15:40"
	
}

const ruleEspecifico = {
	"id" :0,
	"type": "especifico",
	"date": "22-12-2019",
	"startTime" : "15:50",
	"endTime" :"17:50"
	
}

const ruleDiario = {
	"type": "diaria",
	"startTime" : "07:40",
	"endTime" :"8:30"
	
}

const jsonArquivoinicial = []

const msgErroSemanal = ["Horario inicial está em comflito com a regra: ID = 3","Horario inicial está em comflito com a regra: ID = 3",]

const msgErroEspecifico = ["Horario inicial está em comflito com a regra: ID = 2","Horario inicial está em comflito com a regra: ID = 2",]
const msgErroDiaria = ["Horario inicial está em comflito com a regra: ID = 2","Horario inicial está em comflito com a regra: ID = 2",]

describe('Testando a função de CREATE', () => {
    test('Cria regra semanal com sucesso', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleSemanal).then(value=>{
            jsonArquivoinicial.push(ruleSemanal)
            expect(value).toMatchObject(jsonArquivoinicial)
        })

    })

    test('Cria regra especifica com sucesso', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleEspecifico).then(value=>{
            jsonArquivoinicial.push(ruleEspecifico)
            expect(JsonUtil.carregarJson).toHaveBeenCalled()
            expect(value).toMatchObject(jsonArquivoinicial)
        })
    })

    test('Cria regra diario com sucesso', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleDiario).then(value=>{
            jsonArquivoinicial.push(ruleDiario)
            expect(value).toMatchObject(jsonArquivoinicial)
        })
    })

    test('Cria regra semanal com erro', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleDiario).catch(err=>{
            expect(err).toMatchObject(msgErroSemanal)
        })
    })
    
    test('Cria regra especifico com erro', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleEspecifico).catch(err=>{
            expect(err).toMatchObject(msgErroEspecifico)
        })
    })

    test('Cria regra diaria com erro', ()=>{
        JsonUtil.carregarJson = jest.fn(()=>{return Promise.resolve(jsonArquivoinicial)});
        JsonUtil.salvaJson = jest.fn(()=>{return jsonArquivoinicial})
        return RuleService.create(ruleEspecifico).catch(err=>{
            expect(err).toMatchObject(msgErroDiaria)
        })
    })

})