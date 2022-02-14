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
     /*complements product col*/
     "product_product_complement_col": "complemento",
     /*preparavel product col*/
     "product_preparavel_col": "preparavel",

     /*ENTITY EXPENSES***************************************/
    /* Entity that is related expenses table...
    /*
     */
    "expenses_table": "gastos",
    /*id product col*/
    "expenses_expenses_id_col": "id_gasto",
    /*id user expense*/
    "expenses_expenses_id_user_expense": "id_cliente_gasto",
    /*name expenses col*/
    "expenses_expenses_name_expense_col": "nome_gasto",
    /*number of order pad expenses*/
    "expenses_expenses_number_order_pad_col": "numero_comanda_gasto",
    /*expenses types*/
    "expenses_expenses_type_expense_col": "tipo_gasto",
    /*expenses tickets*/
    "expenses_expenses_ticket_expense_col": "numero_ticket",
    /*bool to see if the expense is related to the App */
    "expenses_expenses_modo_garcom_expense_col": "modo_garcom",
    /*product id */
    "expenses_expenses_id_product_col": "id_produto_ou_passeio",
    /*quantity spent*/
    "expenses_expenses_quantity_col": "qt_gasto",
    /*amount spent*/
    "expenses_expenses_amount_col": "valor_gasto",
     /*date of expense*/
     "expenses_expenses_date_expense": "data_gasto",
     /*time of expense*/
     "expenses_expenses_time_expense": "hora_gasto",
     /*id of contributor expense*/
     "expenses_expenses_id_contributor_col": "id_colab_gasto",
     /*table number*/
     "expenses_expenses_table_number": "mesa_garcom",


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
    "contributors_name_col": "nome_colaborador",


    /*ENTITY OBSERVATIONS**************************************/
    /* Entity that is related to expenses...
    /*
     */
    /*name of contributors table*/
    "observations_table": "anotacoes_gasto",

     /*name of contributors status table*/
     "observations_id_col": "id",

    /*name of collumn where we have observation name*/
    "observations_observation_col": "anotacao",

    /*name of collumn where we have expense ID */
    "observations_expense_id": "id_gasto",

    /*name of collumn where we have product ID */
    "observations_product_id": "produto_id",


    /*ENTITY COMPLEMENTS**************************************/
    /* Entity that is related to expenses...
    /*
     */
    /*name of complements table*/
    "complements_table": "complementos_gastos",

     /*complements id*/
     "complements_id_col": "id",

     /*complements name*/
     "complements_name_col": "nome_complemento",

     /*complements value*/
     "complements_value_col": "valor_complemento",

     /*expense id*/
     "complements_expense_id_col": "gasto_id",

    /*product ID */
    "complements_product_id": "produto_id",


    /*ENTITY USERS**************************************/
    /* Entity that is related to the users to log in into the system.../*
     */

     /*name of users table*/
     "users_table": "usuario",

     /*users id*/
     "users_id_col": "id_user",

     /*owner bool col*/
     "users_owner_bool_col": "proprietario",

     /*users name col*/
     "users_name_col": "nome",

     /*users user col*/
     "users_user_col": "usuario",

    /*users password col */
    "users_password_col": "senha",

    /*users email col */
    "users_email_col": "email",
    
    /*users level col */
    "users_level_col": "nivel",

    /*users status col */
    "users_status_col": "status",

    /*users commission col */
    "users_comission_col": "comissionado",

    /*ENTITY PRINT QUEUE**************************************/
    /* Entity that is related to the queue print.../*
     */

    "print_queue_table": "fila_de_impressao",

     /*print queue id col */
     "print_queue_id_col": "id",

     /*print queue content col */
     "print_queue_content_col": "conteudo",

     /*print queue printed col */
     "print_queue_printed_col": "impresso",

     /*print queue date time of inserction */
     "print_queue_inserction_date_time_col": "data_e_hora_de_insercao",

     /*print queue date time print */
     "print_queue_date_time_print": "data_e_hora_de_impressao",

     /*print queue type print */
     "print_queue_type_queue_print": "tipo_fila",
}