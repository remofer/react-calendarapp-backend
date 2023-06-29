const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { Router } = require('express');
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

//Todas tienen que pasar por la validacion de token 
router.use( validarJWT );

//Obtener eventos 

router.get('/',getEvento);

//Crear eventos 

router.post('/',
[
    check('title','titulo obligatorio').not().isEmpty(),
    check('start','fecha inicio obligatorio').custom(isDate),
    check('end','fecha fin obligatorio').custom(isDate),
    validarCampos
],
 crearEvento);

//Actualizar eventos 

router.put('/:id',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
],
actualizarEvento);

//Eliminar eventos 

router.delete('/:id', eliminarEvento);

module.exports = router;

