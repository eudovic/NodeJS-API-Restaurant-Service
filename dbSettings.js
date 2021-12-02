module.exports = {
    /*ENTITY ORDER PAD***************************************/
    /* Entity that is related to order pad...
    /*
     */
    /*name of table of order pad*/
    "order_pad_table": "status_comanda",
    /*name of collumn where we have order pad status,*/
    "order_pad_status_col": "encerramento_comanda_status",
    /*name of collumn where we will looking for products */

    /*ENTITY PRODUCTS***************************************/
    /* Entity that is related products table...
    /*
     */
    "products_table": "produtos",
    /*name of collumn wher we have product status*/
    "product_product_status_col": "status_produto",
    /*id product col*/
    "product_product_id_col": "id_produto",
    /*name product col*/
    "product_product_name_col": "nome_produto",
    /*price product col*/
    "product_product_price_col": "preco_produto",

     /*ENTITY EXPENSES***************************************/
    /* Entity that is related expenses table...
    /*
     */
    "expenses_table": "gastos",
    /*id product col*/
    "expenses_expenses_id_col": "id_gasto",
    /*name expenses col*/
    "expenses_expenses_name_expense_col": "nome_gasto",
    /*number of order pad expenses*/
    "expenses_expenses_number_order_pad_col": "numero_comanda_gasto",
    /*expenses types*/
    "expenses_expenses_type_expense_col": "tipo_gasto",
    /*product id */
    "expenses_expenses_id_product_col": "id_produto_ou_passeio",
    /*quantity spent*/
    "expenses_expenses_quantity_col": "qt_gasto",
    /*amount spent*/
    "expenses_expenses_amount_col": "valor_gasto",

    /*ENTITY CONTRIBUTORS***************************************/
    /* Entity that is related to order pad...
    /*
     */
    /*name of contributors table*/
    "contributor_table": "colaborador",

     /*name of contributors status table*/
     "contributors_status_col": "status_colaborador",

    /*name of collumn where we have contributors id,*/
    "contributors_id_col": "id_colaborador",

    /*name of collumn where we have contributors name */
    "contributors_name_col": "nome_colaborador"

}