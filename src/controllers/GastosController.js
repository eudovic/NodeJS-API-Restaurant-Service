const connection = require("../database/connection");
const dbSettings = require("../../dbSettings");

var self = (module.exports = {
  
  async index(req, res) {
    var data_formatada = new Date().toISOString().substr(0,10)
    console.log(data_formatada);

    const gastos = await connection(dbSettings.expenses_table)
      .leftJoin(dbSettings.observations_table,
        dbSettings.observations_table + "." + dbSettings.observations_expense_id,
        dbSettings.expenses_table + "." + dbSettings.expenses_expenses_id_col
      )
      .leftJoin(dbSettings.complements_table,
        dbSettings.complements_table + "." + dbSettings.complements_expense_id_col,
        dbSettings.expenses_table + "." + dbSettings.expenses_expenses_id_col
      )
      .select(dbSettings.expenses_expenses_ticket_expense_col,
        dbSettings.expenses_expenses_id_product_col,
        dbSettings.expenses_expenses_name_expense_col,
        dbSettings.expenses_expenses_number_order_pad_col,
        dbSettings.expenses_expenses_table_number,
        dbSettings.expenses_expenses_id_user_expense,
        dbSettings.expenses_expenses_amount_col,
        dbSettings.expenses_table + "." + dbSettings.expenses_expenses_id_col,
        dbSettings.expenses_expenses_quantity_col,
        dbSettings.observations_observation_col,
        dbSettings.complements_name_col,
        dbSettings.complements_value_col,
        dbSettings.complements_table + "." + dbSettings.complements_id_col + " AS id_complemento" ,
        dbSettings.observations_table + "." + dbSettings.observations_id_col + " AS id_observacao",
        dbSettings.expenses_expenses_id_contributor_col,
      )
      .where(dbSettings.expenses_expenses_date_expense, "=", data_formatada)
      .orderBy('numero_ticket', 'desc', 'first');

    const historicogasto = gastos.map((gasto) => {
      return {
        numero_ticket: gasto.numero_ticket,
        id_gasto: gasto.id_gasto,
        nome_gasto: gasto.nome_gasto,
        numero_comanda_gasto: gasto.numero_comanda_gasto,
        mesa_garcom: gasto.mesa_garcom,
        valor_gasto: gasto.valor_gasto,
        qt_gasto: gasto.qt_gasto,
        anotacao: gasto.anotacao,
        nome_complemento: gasto.nome_complemento,
        valor_complemento: gasto.valor_complemento,
        id_complemento: gasto.id_complemento,
        id_observacao: gasto.id_observacao,
        id_colaborador: gasto.id_colab_gasto,
        
      };
    });

    var agrupa = self.groupBy(historicogasto, "numero_ticket");
    return res.json({
      success: true,
      data: agrupa,
    });
  },

  groupBy(objectArray, property) {
    var retorno = {};
    objectArray.forEach((gasto, indexGasto) => {

        var ifNumeroTicket = retorno.hasOwnProperty(gasto.numero_ticket);
        if (!ifNumeroTicket) {
            retorno[gasto.numero_ticket] = [];
        }
        var indexGasto = retorno[gasto.numero_ticket].findIndex(gastoE => gastoE.id_gasto == gasto.id_gasto)
        if (indexGasto < 0) {
            gasto.complementos = [
                gasto.nome_complemento != null ? {
                    id_complemento: gasto.id_complemento,
                    nome_complemento: gasto.nome_complemento,
                    valor_complemento: gasto.valor_complemento
                } : []];

            gasto.anotacoes = [
                gasto.anotacao != null ? {
                    id_observacao: gasto.id_observacao,
                    anotacao: gasto.anotacao
                } : []];

            retorno[gasto.numero_ticket].push(gasto);
            return;

        } else {
            var indexObservacao = retorno[gasto.numero_ticket][indexGasto].anotacoes.findIndex(anotacao => anotacao.id_observacao == gasto.id_observacao)
            if (gasto.anotacao != null && indexObservacao < 0) {
                retorno[gasto.numero_ticket][indexGasto].anotacoes.push({
                    id_observacao: gasto.id_observacao,
                    anotacao: gasto.anotacao
                });
            }

            var indexComplemento = retorno[gasto.numero_ticket][indexGasto].complementos.findIndex(complemento => complemento.id_complemento == gasto.id_complemento)
            if (gasto.nome_complemento != null && indexComplemento < 0) {
                retorno[gasto.numero_ticket][indexGasto].complementos.push({
                    id_complemento: gasto.id_complemento,
                    nome_complemento: gasto.nome_complemento,
                    valor_complemento: gasto.valor_complemento
                });
            }
        }
    })
    return retorno;
  },
  async sendProduct(req, res) {
    var data_formatada = new Date().toISOString().substr(0,10)
    
    const buscaTicket = await connection(dbSettings.expenses_table)
      .select(dbSettings.expenses_expenses_ticket_expense_col)
      .where(dbSettings.expenses_expenses_date_expense, "=", data_formatada)
      .orderBy(dbSettings.expenses_expenses_ticket_expense_col, "DESC")
      .limit(1);

    let numeroTicket = buscaTicket.map((ticket) => {
      return ticket.numero_ticket;
    });

    numeroTicket == 0 ? (numeroTicket = 1) : numeroTicket++;

    const products = req.body.arrayLimpaGasto;
    var cleanObservation = [];
    var complements = [];

    products.forEach((product) => {

      const expensesData = {
        [dbSettings.expenses_expenses_ticket_expense_col]: numeroTicket,
        [dbSettings.expenses_expenses_name_expense_col]: product.nome_produto,
        [dbSettings.expenses_expenses_id_product_col]: product.id_produto_ou_passeio,
        [dbSettings.expenses_expenses_quantity_col]: product.qte_produto,
        [dbSettings.expenses_expenses_type_expense_col]: "produtos",
        [dbSettings.expenses_expenses_modo_garcom_expense_col]: true,
        [dbSettings.expenses_expenses_date_expense]: data_formatada,
        [dbSettings.expenses_expenses_amount_col]: product.valor_gasto,
        [dbSettings.expenses_expenses_number_order_pad_col]: product.comanda[0].numero_comanda_status,
        [dbSettings.expenses_expenses_id_user_expense]: product.comanda[0].id_cliente_gasto,
        [dbSettings.expenses_expenses_id_contributor_col]: product.colaborador[0].id_colaborador,
        [dbSettings.expenses_expenses_table_number]: product.mesa
      };

      connection(dbSettings.expenses_table)
        .insert(expensesData)
        .into(dbSettings.expenses_table)
        .then(function (data) {
          cleanObservation = product.observacao;
          complements = product.complemento;

          if (cleanObservation != null) {
            let obsData = cleanObservation.filter((value, index) => {
              return value != " ";
            });
            
            obsData.forEach((obs) => {
              
              if (!obs.produto_id) {
                return;
              }
              
              const observationData = {
                [dbSettings.observations_expense_id]: parseInt(data),
                [dbSettings.observations_observation_col]: obs.nome_obs,
                [dbSettings.observations_product_id]: obs.produto_id,
              };

              if (observationData !== 0) {
                self.gravarObservacao(observationData);
              }
            });
          }
          if (complements != null) {
            complements.forEach((comp) => {
              if (!comp.id_produto) {
                return;
              }

              const complementData = {
                [dbSettings.complements_name_col]: comp.nome_produto,
                [dbSettings.complements_value_col]: comp.preco_produto,
                [dbSettings.complements_expense_id_col]: parseInt(data),
                [dbSettings.complements_product_id]: comp.id_produto,
              };

              if (complementData !== 0) {
                self.gravarComplemento(complementData);
              }
            });
          }
         
        });
    });
    
    var produtosFilaCozinha = [];
    var produtosFIlaCopa = [];
    var mesa = 0;
    var tipoFilaRestaurante = '';
    var tipoFilaCopa = '';
    
    var complementosFilaImpressao = [];

    products.map((prod) => {

      var observacoesDoTicketImpressao = [];
      var complementosDoTicketImpressao = [];
      var preparavel = prod.preparavel;
      var tipoFila = '';
      preparavel == 1 ? tipoFila = 'restaurante' : tipoFila = 'balcao';
      cleanObservation = prod.observacao;
      complements = prod.complemento;

      if (cleanObservation != null) {
        let obsData = cleanObservation.filter((value, index) => {
          return value != " ";
        });
        obsData.forEach((obs) => {
          if (!obs.produto_id) {
            return;
          }
          observacoesDoTicketImpressao.push(obs.nome_obs);
        })
      }
      
      if (tipoFila == 'restaurante') {

        if (complements != null) {
          complements.forEach((comp) => {
            if (!comp.id_produto) {
              return;
            }
            complementosDoTicketImpressao.push(comp.nome_produto);
          })
        }

        produtosFilaCozinha.push(prod.qte_produto + " " + prod.nome_produto + " " + observacoesDoTicketImpressao);  
        complementosFilaImpressao.push(complementosDoTicketImpressao.join("\n"));
        tipoFilaRestaurante = tipoFila;

      } else {
        produtosFIlaCopa.push(prod.qte_produto + "\t" + prod.nome_produto + "\t" + observacoesDoTicketImpressao);
        tipoFilaCopa = tipoFila;
      }
      mesa = prod.mesa; 
    });

var ticketCozinha = `
**************************************************
******************VIVA BROTAS*******************
**************************************************
************************************************** \n
    \t \t           MESA ${mesa}
-------------------------------------------------------------------------------------------------\n 
    \t \t          TICKET ${numeroTicket}
-------------------------------------------------------------------------------------------------\n
QTDE    |   DESCRICAO   |   OBSERVAÇÃO  
-------------------------------------------------------------------------------------------------\n 
${produtosFilaCozinha.join("\n")} 
-------------------------------------------------------------------------------------------------\n
                    COMPLEMENTOS
-------------------------------------------------------------------------------------------------\n  
${complementosFilaImpressao.join("\n")}        
-------------------------------------------------------------------------------------------------      
`;

console.log(ticketCozinha);

var ticketCopa = `
**************************************************
******************VIVA BROTAS*******************
**************************************************
**************************************************\n
    \t \t           MESA ${mesa}
-------------------------------------------------------------------------------------------------\n 
    \t \t          TICKET ${numeroTicket}
-------------------------------------------------------------------------------------------------\n
QTDE    |   DESCRICAO   |   OBSERVAÇÃO  
-------------------------------------------------------------------------------------------------\n 
${produtosFIlaCopa.join("\n")} 
-------------------------------------------------------------------------------------------------\n
`;
    const imprimeCozinha = {
      [dbSettings.print_queue_content_col]: ticketCozinha,
      [dbSettings.print_queue_inserction_date_time_col]: data_formatada,
      [dbSettings.print_queue_printed_col]: false,
      [dbSettings.print_queue_type_queue_print]: tipoFilaRestaurante,
      [dbSettings.print_queue_ticket_number]: numeroTicket
    };
      await connection(dbSettings.print_queue_table)
      .insert(imprimeCozinha)
      .into(dbSettings.print_queue_table);

      setTimeout(() => {
        if(produtosFIlaCopa.length <= 0) {
          return;
        }
        self.imprimeCopa(ticketCopa, tipoFilaCopa,numeroTicket);
      }, 2000);
 
    return res.json({
      success: true,
    });
  },
  async imprimeCopa(data, tipoFila, numero_ticket) {

    var data_formatada = new Date().toISOString().substr(0,10)
   
    const imprimeCopa = {
      [dbSettings.print_queue_content_col]: data,
      [dbSettings.print_queue_inserction_date_time_col]: data_formatada,
      [dbSettings.print_queue_printed_col]: false,
      [dbSettings.print_queue_type_queue_print]: tipoFila,
      [dbSettings.print_queue_ticket_number]: numero_ticket
    };
      await connection(dbSettings.print_queue_table)
      .insert(imprimeCopa)
      .into(dbSettings.print_queue_table);
  },
  async gravarObservacao(data) {
    await connection(dbSettings.observations_table)
      .insert(data)
      .into(dbSettings.observations_table);
  },

  async gravarComplemento(data) {
    await connection(dbSettings.complements_table)
      .insert(data)
      .into(dbSettings.complements_table);
  },

  async deletarGasto(req, res) {
    const idProduct = req.params.idGasto;

    await connection(dbSettings.expenses_table)
      .where(dbSettings.expenses_expenses_id_col, idProduct)
      .del()
      .then(function () {
        res.send();
      });
  },
});
