const model = require('../models/carservices');

const { createToken } = require('../utils/common')

async function listAll(req, res) {
    const listAll = await model().listAll(
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database conection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })
        }
    )
    return listAll
}

async function getCarPlaca(req, res) {
    let placa= req.params.placa;
    //console.log(req.params.placa)
    const atencion = await model().getCarPlaca(placa)
    console.log(atencion)
    return res.status(200).json({
        success: 1,
        data: atencion
    })
    
}

async function create(req, res, next) {
    let data = {...req.body};
    console.log(data)
    data.descripcion=""
    data.img=""
    const create = await model().create(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database conection error",
                
            })
            //error 500 = errores ene el servidor
        }

        result.message = "Creado exitosamente";        
        return res.status(200).json({
            success: 1,
            data: result,            
        })

    })
    return create
}

async function update(res, req, next) {
    const data = req.body
    data.password = await model().encryptPass(data.password);
    const update = await model().update(data,
        (error, result) => {
            if (error) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database conection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: result
            })

        })
    return update
}

async function login(req, res) {
    const { email, pass } = req.body;
    const userFinded = await model().getUserEmail(email);
    if (userFinded && userFinded[0]) {
        const user = userFinded[0];
        const validarContrasena = await model().comparePass(pass, user.contrasenia);
        if (validarContrasena) {
            res.json({
                success: 1,
                msg: "Bienvenid@",
                nombre: user.nombre,
                img: user.img,
                token: createToken({ id: user.id, email, username: user.nombre }),
            });
        } else {
            res.status(400).json({
                success: 0,
                msg: "La contraseña es incorrecta"
            });
        }
    } else {
        res
            .status(400)
            .json({
                success: 0,
                msg: "No se ha encontrado ninguna cuenta asociada a ese correo",
            });
    }
};

async function destroy(data) {
    const destroy = await model().destroy(data)
    return destroy
}
module.exports = {
    listAll,
    create,
    update,
    login,
    destroy,
    getCarPlaca
}
