import {Sequelize} from 'sequelize';

const db = new Sequelize('eshopthegreen', 'Pulgoso', 'laverde123',{
    host: 'eshopthegreen.com.mialias.net',
    dialect: 'mysql'
});

export default db;