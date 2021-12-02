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
     async sendProduct(req, res) {
        const products = req.body;       
        console.log(req.method);
        if (req.method === "POST") {
        //  const saveExpense =  await connection(dbSettings.expenses_table)
        //   .insert(dbSettings.expenses_expenses_id_product_col = products.id_produto_ou_passeio,
        //     dbSettings.expenses_expenses_name_expense_col = products.nome_produto,
        //     dbSettings.expenses_expenses_amount_col = products.valor_gasto,
        //     dbSettings.expenses_expenses_quantity_col = products.qtde_produto,
        //     dbSettings.expenses_expenses_number_order_pad_col = 80)
          return res.status(200).json({
              
              data: products
            });
            
        } else {
          return res.status(200).json({
              message: "deu errado ",
            });
          }
      }


        // const gravaProdutos = await connection(dbSettings.expenses_table)
        // .insert(
        //     dbSettings.expenses_expenses_id_product_col,
        //     dbSettings.expenses_expenses_name_expense_col,
        //     dbSettings.expenses_expenses_amount_col
        // );
        // return res.json({
        //         success: true,
        //         data: gravaProdutos
        //         })
    
         


       // const gravaProdutos = await connection(dbSettings.expenses_table)
         //.insert(
    //         dbSettings.expenses_expenses_id_col,
           //  dbSettings.expenses_expenses_name_expense_col,
           //  dbSettings.expenses_expenses_price_col,
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