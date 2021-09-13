// Update with your config settings.

module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: ''
        },
        migrations: {
            directory: "./src/database/migrations",
            tableName: 'knex_migrations'
        }
    },

    staging: {
        client: 'postgrmysqlesql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};