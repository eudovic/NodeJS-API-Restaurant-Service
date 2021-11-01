const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

module.exports = {
    async index(req, res) {
        const produtos = await connection(dbSettings.products_table)
            .where(dbSettings.product_product_status_col, "=", 1)
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

     async gravaPedido(req, res) {

        try{
            return res.send();
        } catch(err) {
            return res.status(400).json({error: err.message});
        }
    }
    //     const gravaProdutos = await connection(dbSettings.expenses_table)
    //     .insert(
    //         dbSettings.expenses_expenses_id_col,
    //         dbSettings.expenses_expenses_name_expense_col,
    //         dbSettings.expenses_expenses_price_col,
    //         // dbSettings.expenses_expenses_number_order_pad_col,
    //         // dbSettings.expenses_expenses_type_expense_col,
    //         // dbSettings.expenses_expenses_id_product_col,
    //         // dbSettings.expenses_expenses_quantity_col,
    //         dbSettings.expenses_expenses_amount_col
    //     );
    //     return res.json({
    //         success: true,
    //         data: gravaProdutos
    //     })
    // }
}