# Backend Restaurant Service (WIP)

This is just a "Work in progess" for a backend application that needs to be used with front end module of Restaurant service.
How it should be flexible to integrate with an existent database so give the name os schemas on dbSetting.js
### configurations
run npm start to run server
copy _exemple_knexfile.js to knexfile.js end edit to mysql configs


#### Implemented Libraries
**express** to requests:
https://expressjs.com/

**knex** query builder to database:
https://knexjs.org/

## API DOCUMENTATION

## Authorization

We are using basic Autorization for this project
Authorization: Basic base_64(user&pass)
**result:**
Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l


## ORDER PADS
```http
GET /orderpads
```

## Responses

This response depends of application db structure, so it's just an exemple.

```javascript
[
    {
        "id_status_comanda": 21363,
        "numero_comanda_status": "80",
        "id_cliente_comanda": "30207",
        "abertura_comanda": "2021-07-31T19:56:00.000Z",
        "fechamento_comanda": "0000-00-00 00:00:00",
        "encerramento_comanda_status": 0,
        "comanda_retirada_por": "Juliano Cristinus Sila",
    },
    {
        "id_status_comanda": 21538,
        "numero_comanda_status": "37",
        "id_cliente_comanda": "29950",
        "abertura_comanda": "2021-08-17T16:30:00.000Z",
        "fechamento_comanda": "0000-00-00 00:00:00",
        "encerramento_comanda_status": 0,
        "comanda_retirada_por": "Hellan Silva Maya"
    }
]
```
## PRODUCTS
```http
GET /products
```

## Responses

This response depends of application db structure, so it's just an exemple.

```javascript

    "success": true,
    "data": [
        {
            "id_produto": 7,
            "nome_produto": "Agua c/ GAS",
            "preco_produto": "4"
        },
        {
            "id_produto": 6,
            "nome_produto": "AGUA S/GAS",
            "preco_produto": "4"
        }
    ]
```



