const { response } = require('express');
const Usuario = require('../models/Usuario');
const Eventos = require('../models/Eventos')
 
const getEvento = async(req, res =response ) => {

    const eventos = await Eventos.find()
                        
    .populate('user','name'); 

    return res.json({
        ok:true,
        eventos
    })    
} 
const crearEvento = async(req, res =response ) => {
    
    const evento = new Eventos(req.body);

    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con admin'
        });
    }

    return res.json({
        ok:true,
        msg:'crear eventos'
    })    
} 
const actualizarEvento = async (req, res =response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Eventos.findById( eventoId);
        const uid = req.uid;

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Eventos.findByIdAndUpdate( eventoId, nuevoEvento, { new: true} );

        res.json({
            ok: true,
            evento:eventoActualizado
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hablar con admin'
        })
    }   
} 

const eliminarEvento = async(req, res =response ) => {

    const eventoId = req.params.id;

    try {

        const evento = await Eventos.findById( eventoId );
        const uid = req.uid;

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'evento no existe por ese id'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        await Eventos.findByIdAndDelete( eventoId );

        res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hablar con admin'
        })
    }   
} 

module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEvento,

}