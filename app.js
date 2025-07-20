const express = require('express')
const PORT = 3000

const app = express();

app.use(express.json())

const cita = [
    {
    id: "001",
    paciente: "Ana Caceres",
    doctor: "Dr.Almonara",
    especialidad: "Urología",
    fecha: "2025-08-26",
    hora: "9:00",
    sintomas: "chequeo general"

    }
]

// ruta
app.get('/listar-citas', (req, res) => {
    res.send(citas)
})

// ruta para crear
app.post('/crear-listar', (req, res) => {
    const { body } = req
    const { id, paciente, doctor, especialidad, fecha, hora, sintomas} = body

    cita.push({
        id, paciente, doctor, especialidad, fecha, hora, sintomas
    })

    res.send("La cita ha sido registrado correctamente")
})

// ruta para actualizar
app.put('/actualizar-citas/:id', (req, res) => {
    
    const { id } = req.params;
    const { paciente, doctor, especialidad, fecha, hora, sintomas} = req.body;

    const cita = citas.find((p) => p.id == id)

    cita.paciente = paciente
    cita.doctor = doctor
    cita.especialidad = especialidad
    cita.fecha = fecha
    cita.hora = hora
    cita.sintomas= sintomas

    res.send("La cita ha sido actualizada correctamente");
});

//ruta para eliminar

app.delete('/eliminar-cita/:id', (req, res) => {
    const { id } = req.params;

    const citaIndex = citas.findIndex((p) => p.id === id);
    citas.splice(citaIndex, 1);

    
    
    res.send("La cita ha sido eliminada correctamente");
});

app.listen(PORT, ()=>{
    console.log("mi servidor esta corriendo en el puerto:", PORT)
})

