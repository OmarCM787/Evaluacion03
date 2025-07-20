const express = require("express")
const PORT = 3000  

const app = express();

app.use(express.json())   

let lista = []

app.get("/listar-numeros", (req, res) =>{
    res.send(lista)
})

app.post("/insert-numeros", (req, res) => {
    const {body} = req
    const {numeros} = body

    lista = numeros.sort((x, y) => x - y);

    res.send("Los numeros a sido ordenado correctamente")

})

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto`, PORT)
})