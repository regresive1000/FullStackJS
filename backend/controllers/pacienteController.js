import Paciente from '../models/Paciente.js'


const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteGuardado = await paciente.save()
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);

    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const id = req.params.id // Recoge el siguiente parametro de la raiz ID, llave ID y valor lo que sea la url
    const paciente = await Paciente.findById(id);

    console.log(paciente.veterinario._id) 
    console.log(req.veterinario._id) 

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { // Hay que convertir los objectID a string porque vana  ser evualados de forma diferente cada vez que pase por el if
        return res.json({ msg: 'Accion no valida'})
    }

    if(paciente) {
        res.json(paciente)
    }

 }

const actualizarPaciente = async (req, res) => {
    const { id } = req.params // Recoge el siguiente parametro de la raiz ID, llave ID y valor lo que sea la url
    const paciente = await Paciente.findById(id);

    console.log(paciente.veterinario._id) 
    console.log(req.veterinario._id)

    if(!paciente) {
        return res.status(404).json({ msg: "No encontrado" }); // Si no hay paciente
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { // Hay que convertir los objectID a string porque vana  ser evualados de forma diferente cada vez que pase por el if
        return res.json({ msg: 'Accion no valida'})
    }

    //Actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre; // body agarra la info enviado por el form
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    
    try {
        const pacienteActualizado = await paciente.save();
        res.json({ msg: "Paciente actualizado" });
    } catch (error) {
        console.log(error)   
    }
};

const eliminarPaciente = async (req, res) => {
    const { id } = req.params // Recoge el siguiente parametro de la raiz ID, llave ID y valor lo que sea la url
    const paciente = await Paciente.findById(id);

    console.log(paciente.veterinario._id) 
    console.log(req.veterinario._id)

    if(!paciente) {
        return res.status(404).json({ msg: "No encontrado" }); // Si no hay paciente
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) { // Hay que convertir los objectID a string porque vana  ser evualados de forma diferente cada vez que pase por el if
        return res.json({ msg: 'Accion no valida'})
    }

    try {
        await paciente.deleteOne();
        res.json({ msg: "Paciente eliminado" })
    } catch (error) {
        
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}