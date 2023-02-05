
import {Sequelize} from 'sequelize';

const db = new Sequelize('projectdb', 'root', 'tochukwu',{
    host: "localhost",
    storage:"./database.mysql",
    dialect:"mysql",
    logging:false,

    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle: 10000,
    },
})
export default db





