const connection = require('../database/connection');
const dbSettings = require("../../dbSettings");

var self = (module.exports = {
    async index(req, res) {
        const filasDeImpressao = await connection(dbSettings.print_queue_table)
            .select(dbSettings.print_queue_id_col,
             dbSettings.print_queue_content_col, 
             dbSettings.print_queue_type_queue_print)
            .where(dbSettings.print_queue_printed_col, "=", 0);

        const buscaFila = filasDeImpressao.map((fila) => {
            return {
                conteudo: fila.conteudo,
            };
        });
        return res.json({
            success: true,
            data: buscaFila,
        });
    }
});