import { DataTypes, Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', //path to local sqlite database

});

const Today = sequelize.define('Today',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
    },
    quote: {
        type: DataTypes.STRING,
        validate:{
            len: [20, 350]
        }
    },
    assigned: {
        type: DataTypes.JSON
    },
    finished:{
        type: DataTypes.BOOLEAN
    } 
},{
    tableName: 'today'
})

sequelize.sync()
    .then( () => {console.log("DB connection working!");})
    .catch(error => console.log("DB connection failed", error));
  
  
export {Today};



