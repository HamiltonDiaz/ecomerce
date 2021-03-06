const pool = require('../database');
const bycrypt = require('bcryptjs')


module.exports = function () {

    async function listAll(callback) {
        let query = "SELECT *, (select name from lineas where id= pr.lineasid) as nomlinea,  (SELECT ROUND(AVG(valoracion),0) FROM rating WHERE id_producto=pr.id) AS rating FROM productos as pr"
        await pool.query(query, [],
            (error, results, fields) => {
                if(error){
                    return callback(error)
                }
                console.log(results)
                return callback(null, results)
            }
        )
    }

    async function getUserId(id) {
        let query = "SELECT * FROM users WHERE id=?"
        const result= await pool.query(query, [id]);
        return result;
    }

    async function getUserEmail(email) {
        let query = "SELECT * FROM users WHERE email=?"
        const result= await pool.query(query, [email]);
        return result;
    }

    async function create(data, callback) {
        let query = 'INSERT INTO users SET ?';
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
        //este funci??n es para cifrar la contrase??a
        const salt = await bycrypt.genSalt(10);
        return bycrypt.hash(password,salt);
    }

    async function comparePass(password, passDB){
        //compara las contrase??as
        return password && passDB ? await bycrypt.compare(password,passDB) : false;
    }

    return {
        listAll,
        getUserId,
        getUserEmail,
        create,
        update,
        destroy,
        encryptPass,
        comparePass
    }

}