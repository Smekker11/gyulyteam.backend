import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/gyulyteamdb.sqlite', //path to local sqlite database

});

export const Posts = sequelize.define('Posts',{
     id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
     title:{
        type: DataTypes.STRING
     },
     content:{
        type: DataTypes.STRING,
        allowNull:false
     },
     username:{
        type: DataTypes.STRING
     },
     tags:{
        type: DataTypes.JSON
     }
     
},{
    tableName: 'posts',
    timestamps: true
})

sequelize.sync()
    .then( () => {console.log("DB connection working!");})
    .catch(error => console.log("DB connection failed", error));