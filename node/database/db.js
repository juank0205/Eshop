import {Sequelize} from 'sequelize'; //IMportar sequelize

const db = new Sequelize('eshopthegreen', 'Pulgoso', 'laverde123',{ //Definir las credenciales de la base de datos
    host: 'eshopthegreen.com.mialias.net',//Dominio utilizado para el servidor
    dialect: 'mysql'
});

export default db;