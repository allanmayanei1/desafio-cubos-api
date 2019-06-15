const fsExtra = require('fs-extra')
const fs = require('fs')
const pathFile = process.env.PATHFILEJSON || './src/json/rules.json'

const carregarJson = ()=>{
    return new Promise((resolve,reject)=>{
        if(fs.existsSync(pathFile)){
            fsExtra.readJSON(pathFile , "utf8",(err,json)=>{
                if(err){
                    return resolve([])
                }
                return resolve(json)
            });
        }else{
            fsExtra.writeJSON(pathFile,[],(err)=>{
                if (err) {
                    return resolve([])
                }
                return resolve([])
            })
            
        }
    })
}

const salvaJson = ( json)=>{
    return fsExtra.writeJSONSync(pathFile, json)
}

module.exports = {
    carregarJson:carregarJson,
    salvaJson:salvaJson
}