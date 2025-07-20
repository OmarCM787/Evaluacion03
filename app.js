const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser')
const cors = require('cors')
const PORT = 3000

const app = express();

const connect = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'Mendoza2020',
    database: 'productosDb'
})

connect.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos correctamente')
})

app.get('/productosDb', (req, res) => {
    const query = 'select * from productos';
    connect.query(query, (err, result)=> {
        if (err) throw err
        res.json(result)
    })
})

app.use(bodyparser.json());
app.use(cors());

app.post('/agregar-Producto', (req, res)=>{
    const { codigo, nombre, precio } = req.body;

    const validar = 'SELECT * FROM productos WHERE codigo = ?';
    connect.query(validar, [codigo], (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al validar' });

        if (results.length > 0) {
        return res.status(400).json({ mensaje: 'El código ya existe en la base de datos' });
        }

        const agregar = 'INSERT INTO productos (codigo, nombre, precio) VALUES (?, ?, ?)';
        connect.query(agregar, [codigo, nombre, precio], err => {
        if (err) return res.status(500).json({ mensaje: 'Error al agregar producto' });
        res.status(201).json({ mensaje: 'Producto agregado correctamente' });
        });
    });
})

app.listen(PORT, () =>{
    console.log('Mi servidor esta corriendo en el puerto', PORT)
})