# Desáfio Cubos - Backend

## Sumário

* [Requisitos](#requisitos)
* [Instalação](#instalação)
* [Variável de ambiente](#variável-de-ambiente)
* [Endpoint](#endpoint)
* [TESTES](#testes)
* [Contato](#contato)

## Requisitos

Para rodar o sistema é preciso instalar as ferramentas abaixo:
    
    - Node.js versão 10.15.1
    - Npm versão 6.4.1

## Instalação

``` 
$ npm install 
```

## Variável de ambiente

É preciso criar o arquivo **.ENV** na raiz do projeto configurando duas variáveis do sistema, conforme exemplo abaixo.

```
PORT=3001
PATHFILEJSON='./src/json/rules.json'
```

Onde a primeira variável informa em qual porta o servidor irá rodar e a segunda informa o caminho do arquivo do JSON de regras.

Obs: É preciso que o arquivo json esteja criado no diretório que foi informado na variável.

## Endpoint

Vou deixar o arquivo **Desafio Cubos 1.postman_collection.json** da **Collection** do **POSTMAN** na raiz do projeto, para realizar a importação no mesmo e realizar o testes dos endpoints.

### Listagem de todas as regras

```
URL: /api/rule/findAll
METHOD: GET
```

### Deleta regra

```
URL: /api/rule/delete/:id
METHOD: DELETE
```
ID = id da regra

### Listagem de horários disponíveis 

```
URL: /api/rule/rulesAvailable/:dateStart/:dateEnd
METHOD: GET
```

DATESTART = data início da busca.
DATEEND = data fim da busca.

### Cadastro de regra

```
URL: /api/rule/create
METHOD: POST
```
No endepoint de cadastro de regras, o mesmo aceita três tipos de regras, **SEMANAL**, **ESPECIFICA** e **DIARIA**, no formado dos JSON abaixo.

#### SEMANAL

```json
{
	"id" :0,
	"type": "semanal",
	"dayWeek" : [ 0 , 6],
	"startTime" : "14:00",
	"endTime" :"15:40"
	
}
```
#### ESPECÍFICO

```json
{
	"id" :0,
	"type": "especifico",
	"date": "22-12-2019",
	"startTime" : "15:50",
	"endTime" :"17:50"
	
}
```

#### DIÁRIA

```json
{
	"type": "diaria",
	"startTime" : "07:40",
	"endTime" :"8:30"
	
}
```

## TESTES

Para os testes unitários foi escolhida a lib **JEST**.

Para rodar os testes basta executar o comando abaixo na raiz do projeto.

```
$ npm run test
```


## Contato
email: mayanei_13@hotmail.com

tel: (71) 991300964