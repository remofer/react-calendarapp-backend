const jwt = require('jsonwebtoken');
require('dotenv').config();

//*asi lo hizo el profe no anda jaja

// const generarJWT = ( uid, name ) => {

//     return new Promise ((resolve, reject)=>{
//         const payload ={uid, name};

//         jwt.sign( payload, process.env.SECRET_JWT_SEED,{
//             expiresIn:'2h'
//         }, (error, token)=>{
//             if(err){
//                 console.log(err)
//                 reject('No se pudo generar token');
//             }
//             resolve(token)
//         })

//     })

// }

const generarJWT = ( uid, name ) => {
    const payload ={uid,name};
    const token =  jwt.sign( payload, process.env.SECRET_JWT_SEED,{
        expiresIn: '2h'
    });
    if(!token){
        return 'no se pudo generar token'
    }
        return token; 
}

module.exports = {
    generarJWT
}