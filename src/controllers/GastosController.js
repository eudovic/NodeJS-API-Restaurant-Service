const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

var self = module.exports = {

    async index(req, res) {

        var dataHoje = new Date().toLocaleString();
        data_formatada = dataHoje.substr(6,4) + '-' + dataHoje.substr(0,2) + '-' + dataHoje.substr(3,2);

        const gastos = await connection(dbSettings.expenses_table)
            .leftJoin(dbSettings.observations_table, dbSettings.observations_table +"."+ dbSettings.observations_expense_id, dbSettings.expenses_table +"."+ dbSettings.expenses_expenses_id_col)
            .leftJoin(dbSettings.complements_table, dbSettings.complements_table +"."+ dbSettings.complements_expense_id_col, dbSettings.expenses_table +"."+ dbSettings.expenses_expenses_id_col)
            .select(dbSettings.expenses_expenses_ticket_expense_col,
                dbSettings.expenses_expenses_id_product_col,
                dbSettings.expenses_expenses_name_expense_col,
                dbSettings.expenses_expenses_number_order_pad_col,
                dbSettings.expenses_expenses_id_user_expense,
                dbSettings.expenses_expenses_amount_col,
                dbSettings.expenses_table +"."+ dbSettings.expenses_expenses_id_col,
                dbSettings.expenses_expenses_quantity_col,
                dbSettings.observations_observation_col,
                dbSettings.complements_name_col, 
                dbSettings.complements_value_col
                
            )
            .where(dbSettings.expenses_expenses_date_expense, "=", data_formatada)
            .orderBy(dbSettings.expenses_expenses_ticket_expense_col, 'ASC');

            const historicogasto = gastos.map(gasto => {

                return {
          
                    numero_ticket: gasto.numero_ticket,
                    id_gasto: gasto.id_gasto,
                    nome_gasto: gasto.nome_gasto,
                    numero_comanda_gasto: gasto.numero_comanda_gasto,
                    valor_gasto: gasto.valor_gasto,
                    qt_gasto: gasto.qt_gasto,
                    anotacao: gasto.anotacao,
                    nome_complemento: gasto.nome_complemento,
                    valor_complemento: gasto.valor_complemento
                    
                };
            })
        return res.json({
            success: true,
            data: self.groupBy(historicogasto, 'numero_ticket')
        });
    },

    groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          let key = obj[property]
            console.log(obj.id_gasto)
          if (!acc[key]) {
            acc[key] = []
          }
          let keyGasto = acc[key][obj.id_gasto]

          if (! acc[key][obj.id_gasto]) {
            acc[key][obj.id_gasto] = []
          }
          var qtGastos = acc[key][obj.id_gasto].length;

          if(qtGastos == 0) {

              if(obj.nome_complemento) {
                obj.complementos = [
                {
                    nome_complemento : obj.nome_complemento,
                    valor_complemento: obj.valor_complemento
                }];
              } else {
                    obj.complementos = [];
              }
      
              if(obj.anotacao) {
                obj.anotacoes = [
                {
                    anotacao : obj.anotacao
                }];
              } else {
                    obj.anotacoes = [];
              }
               acc[key][obj.id_gasto].push(obj)
               
               return acc
          }
      if(obj.nome_complemento) {
        acc[key][obj.id_gasto][0].complementos.push(
            {
                nome_complemento:obj.nome_complemento,
                valor_complemento: obj.valor_complemento
            })
      }
      
      if(obj.anotacao) {
        acc[key][obj.id_gasto][0].anotacoes.push(
            {
                anotacao: obj.anotacao

            })
      }
        return acc
         
        }, {})
    },
    
    async sendProduct(req, res) {

        var dataHoje = new Date().toLocaleString();
        data_formatada = dataHoje.substr(6,4) + '-' + dataHoje.substr(0,2) + '-' + dataHoje.substr(3,2);

        const buscaTicket = await connection(dbSettings.expenses_table)
            .select(dbSettings.expenses_expenses_ticket_expense_col)
            .where(dbSettings.expenses_expenses_date_expense, "=", data_formatada)
            .orderBy(dbSettings.expenses_expenses_ticket_expense_col, 'DESC')
            .limit(1);
        
        let numeroTicket = buscaTicket.map(ticket => {
            return ticket.numero_ticket;
        }) 

        numeroTicket == 0 ? numeroTicket = 1 : numeroTicket++;

        const products = req.body.arrayLimpaGasto;
        var cleanObservation = [];
        var complements = [];

        products.forEach((product) => {
           
            const expensesData = {
                [dbSettings.expenses_expenses_ticket_expense_col]: numeroTicket,
                [dbSettings.expenses_expenses_name_expense_col]: product.nome_produto,
                [dbSettings.expenses_expenses_id_product_col]: product.id_produto_ou_passeio, 
                [dbSettings.expenses_expenses_quantity_col]: product.qte_produto,
                [dbSettings.expenses_expenses_type_expense_col]: 'produtos',
                [dbSettings.expenses_expenses_modo_garcom_expense_col]: true,
                [dbSettings.expenses_expenses_date_expense]: data_formatada,
                [dbSettings.expenses_expenses_amount_col]: product.valor_gasto,
                [dbSettings.expenses_expenses_number_order_pad_col]: product.comanda[0].numero_comanda_status,
                [dbSettings.expenses_expenses_id_user_expense]: product.comanda[0].id_cliente_gasto, 
            }
           
            connection(dbSettings.expenses_table)
            .insert(expensesData).into(dbSettings.expenses_table)
            .then(function(data) {

                cleanObservation = product.observacao;
                complements = product.complemento;
                
                if (cleanObservation != null) {
                    let obsData = cleanObservation.filter((value, index) => {
                        return value != ' ';
                    })
                    
                    obsData.forEach((obs) => {
                        if (!obs.produto_id) {
                            return
                        }

                        const observationData = {
                            [dbSettings.observations_expense_id]: parseInt(data),      
                            [dbSettings.observations_observation_col]: obs.nome_obs,
                            [dbSettings.observations_product_id]: obs.produto_id
                        }
                       
                        if(observationData !== 0) {
                           self.gravarObservacao(observationData);
                         } 
                    })
                }

                if (complements != null) {
                    
                    complements.forEach((comp) => {
                        if (!comp.id_produto) {
                            return
                        }

                        const complementData = {
                            [dbSettings.complements_name_col]: comp.nome_produto,
                            [dbSettings.complements_value_col]: comp.preco_produto,
                            [dbSettings.complements_expense_id_col]: parseInt(data),      
                            [dbSettings.complements_product_id]: comp.id_produto
                        }
                       
                        if(complementData !== 0) {
                           self.gravarComplemento(complementData);
                         } 
                    })
                }
            })
        }); 
        return res.json({
            success: true,
        });
    },
    async gravarObservacao(data) {
        
        await connection(dbSettings.observations_table)
        .insert(data).into(dbSettings.observations_table)
    },

    async gravarComplemento(data) {
        console.log(data);
        await connection(dbSettings.complements_table)
        .insert(data).into(dbSettings.complements_table)
    },

    async deletarGasto(req, res) {

        const idProduct = req.params.idGasto;
        
        await connection(dbSettings.expenses_table)
        .where(dbSettings.expenses_expenses_id_col, idProduct)
        .del().then(function() {
            res.send();
        })
    }
}
