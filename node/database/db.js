import {Sequelize} from 'sequelize';

const db = new Sequelize('eshop', 'prueba', '123456789',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;