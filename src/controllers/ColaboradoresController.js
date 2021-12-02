const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

module.exports = {

    async index(req, res) {

        const colaboradores = await connection(dbSettings.contributor_table)
            .where(dbSettings.contributors_status_col, "=", 'ATIVO')
            .select('*');
            
        return res.json({
            success: true,
            data: colaboradores
        });
    }
}