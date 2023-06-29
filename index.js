const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();


console.log(process.env);


//Crear el servidor de express 

const app = express()

//base de datos

dbConection();

//CORS

app.use(cors());


//Directorio Publico 

app.use( express.static('public') );

//Lectura y parseo del body

app.use(express.json());

//Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD: eventos   



//Escuchar peticion 

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo el puerto ${process.env.PORT}`);
});