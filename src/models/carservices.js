const pool = require('../database');
const bycrypt = require('bcryptjs')


module.exports = function () {

    async function listAll(callback) {
        let query = "SELECT * FROM carros"
        await pool.query(query, [],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    }
    
    
    async function getCarPlaca(placa) {
        let query = "SELECT * FROM atencion_car WHERE placa=?"
        const result= await pool.query(query, [placa]);
        return result;
    }



    // router.delete('/eliminar/:id_dtp',async(req,res)=>{
    //     const sql ="DELETE FROM rh WHERE id_dtp=?";
    //     await pool.query(sql, req.params.id_dtp);
    //     res.sendStatus(200);
    
    //  });



    async function getUserEmail(email) {
        let query = "SELECT * FROM users WHERE email=?"
        const result= await pool.query(query, [email]);
        return result;
    }

    async function create(data, callback) {
        let query = 'INSERT INTO productos SET ?';
        await pool.query(query,
            [data],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result);
            }
        );
    }

    async function update(data, callback) {
        let query = 'UPDATE users SET  nombre=?, email=?, password=?, img=?, update_at=?, estado_id=? WHERE id=?';
        await pool.query(query,
            [
                data.nombre,
                data.email,
                data.contrasenia,
                data.img,
                data.update_at,
                data.estado_id,
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            }
        );
    }

    async function destroy(data,callback) {
        let query = 'UPDATE users SET  estado_id=3 WHERE id=?';
        await pool.query(query,
            [
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            }
        );
    }

    async function encryptPass(password){
        //este función es para cifrar la contraseña
        const salt = await bycrypt.genSalt(10);
        return bycrypt.hash(password,salt);
    }

    async function comparePass(password, passDB){
        //compara las contraseñas
        return password && passDB ? await bycrypt.compare(password,passDB) : false;
    }

    return {
        listAll,
        getCarPlaca,
        getUserEmail,
        create,
        update,
        destroy,
        encryptPass,
        comparePass
    }

}