const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

module.exports = {

    async index(req, res) {
        const gastos = await connection(dbSettings.expenses_table)
            .where(dbSettings.expenses_expenses_type_expense_col, "=", 'produtos/app')
            .select(dbSettings.expenses_expenses_id_product_col,
                dbSettings.expenses_expenses_name_expense_col,
                dbSettings.expenses_expenses_number_order_pad_col,
                dbSettings.expenses_expenses_id_user_expense,
                dbSettings.expenses_expenses_amount_col,
            );
        return res.json({
            success: true,
            data: gastos
        });
    },
    async sendProduct(req, res) {
        const products = req.body.arrayLimpaGasto;
        var cleanObservation = {};
        products.map((product) => {
            
            cleanObservation = product.observacao;
        })

        var dadosGasto = [];
        var dadosObservacoes = [];
        products.forEach((product) => {
        
            const expensesData = {
                [dbSettings.expenses_expenses_name_expense_col]: product.nome_produto,
                [dbSettings.expenses_expenses_id_product_col]: product.id_produto_ou_passeio, 
                [dbSettings.expenses_expenses_quantity_col]: product.qte_produto,
                [dbSettings.expenses_expenses_type_expense_col]: 'produtos/app',
                [dbSettings.expenses_expenses_amount_col]: product.valor_gasto,
                [dbSettings.expenses_expenses_number_order_pad_col]: product.comanda[0].numero_comanda_status,
                [dbSettings.expenses_expenses_id_user_expense]: product.comanda[0].id_cliente_gasto,
                
            }
            dadosGasto.push(expensesData);
        });
        await connection(dbSettings.expenses_table)
            .insert(dadosGasto).returning('id_gasto').into(dbSettings.expenses_table)
            .then(function(data) {
                
                res.send(data);
            });

        if (cleanObservation != null) {
            let obsData = cleanObservation.filter((value, index) => {
                return value != ' ';
            })

            obsData.forEach((obs) => {

                const observationData = {
                     
                    [dbSettings.observations_observation_col]: obs.nome_obs,
                    [dbSettings.observations_product_id]: obs.produto_id
                }
                dadosObservacoes.push(observationData);
            })

            await connection(dbSettings.observations_table)
            .insert(dadosObservacoes).into(dbSettings.observations_table)
            
        }     
        
    
    }
}
