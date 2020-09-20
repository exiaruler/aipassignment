const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Relational Mapping
// ------------------------------------------------
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'aipassignmentdata',  // Database name
    'newuser',        // Username
    'password',        // Password
    {dialect: 'postgres', host: 'localhost'}
);

const UserData = sequelize.define('user_data', {
    userID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: Sequelize.TEXT,
    userName: Sequelize.TEXT,
    password: Sequelize.TEXT, 
    email: Sequelize.TEXT,
    role: Sequelize.TEXT
});

const owefavour=sequelize.define('owe_favour_data',{
    favourID:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userID:Sequelize.INTEGER,
    username:Sequelize.TEXT,
    title:Sequelize.TEXT,
    favourdescription:Sequelize.TEXT,
    reward:Sequelize.TEXT,
    recievinguserID:Sequelize.INTEGER,
    recievingusername:Sequelize.TEXT,
    completed:Sequelize.BOOLEAN,
    image:Sequelize.BYTEA
    


});

async function initialize() {
    // Create the database tables (force them to be created from scratch)
    // await sequelize.sync({force: true});
}

initialize().then(() =>
    app.listen(3000, () => console.log('Running on http://localhost:3000/'))
);