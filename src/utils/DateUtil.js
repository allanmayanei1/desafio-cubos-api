module.exports = {
    horaAtual() {
        let now = new Date
        return  now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds();
    }
}
