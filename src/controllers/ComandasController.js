const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

module.exports = {
    async index(req, res) {
        const comandas = await connection(dbSettings.order_pad_table)
            .where(dbSettings.order_pad_status_col, "=", 0)
            .select('*');
        return res.json({
            success: true,
            data: comandas
        });
    }
}