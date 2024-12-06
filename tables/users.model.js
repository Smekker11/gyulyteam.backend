import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/gyulyteamdb.sqlite', //path to local sqlite database

});


// Define the User model

const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [3, 50],  
      }
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          len: [3, 50],  
        }
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          len: [3, 50],  
        },
    interests: {
        type: DataTypes.JSON,
        allowNull: false,
          },
      },


  }, {
    tableName: 'users', // Specifies the name of the table in the SQLite database
    timestamps: true,   // Automatically adds createdAt and updatedAt fields
  });
  
  // Sync the model with the database (creates the table if it doesn't exist)
  sequelize.sync()
    .then(() => console.log("DB connection working!"))
    .catch(error => console.log("DB connection failed", error));
  
  
  export {Users};
  