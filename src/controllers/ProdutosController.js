const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");
const { json } = require('body-parser');

module.exports = {
    async index(req, res) {
        const produtos = await connection(dbSettings.products_table)
            .where(dbSettings.product_product_complement_col, "=", 0)
            .andWhere(dbSettings.product_product_status_col, "=", 1)
            .select(
                dbSettings.product_product_id_col,
                dbSettings.product_product_name_col,
                dbSettings.product_product_price_col
            );
        return res.json({
            success: true,
            data: produtos
        });
    },
    async complementos(req, res) {
        const complementos = await connection(dbSettings.products_table)
            .where(dbSettings.product_product_complement_col, "=", 1)
            .select(
                dbSettings.product_product_id_col,
                dbSettings.product_product_name_col,
                dbSettings.product_product_price_col
            );
        return res.json({
            success: true,
            data: complementos
        });
        
    }
       
}