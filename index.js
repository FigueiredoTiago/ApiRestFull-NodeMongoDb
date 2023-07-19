//config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


//leitura do Json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());

//rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' });
});

//rotas da api
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// Entregar uma porta para o servidor e conectar ao bd
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apirestfullcluster.nrb5vc7.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    console.log('Conectado ao MongoDB...');
    app.listen(3000);
}).catch((err) => console.log(err));
