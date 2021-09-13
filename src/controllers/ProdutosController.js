const connection = require('../database/connection');
module.exports = {
    async index(req, res) {
        const acessos = await connection('produtos').select('*');
        return res.json(acessos);
    }
}