const pool = require('../database');

module.exports = function () {

    async function listAll(callback) {
        let query = "SELECT pb.id, pb.descripcion, pb.img, pb.create_at AS fecPublica, usr.nombre AS usuario, usr.img AS usrimg,\n" +
            "COUNT(lk.publicacion_id ) AS likes,(SELECT COUNT(*) FROM comentario WHERE publicacion_id=pb.id) AS comentarios\n" +
            "FROM publicacion pb\n" + "LEFT JOIN usuario usr ON usr.id= pb.usuario_id\n" + "LEFT JOIN likes lk ON lk.publicacion_id = pb.id\n" +
            "WHERE pb.estado_id=1\n" + "GROUP BY pb.id ORDER BY pb.update_at DESC;";
        await pool.query(query, [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    }

    async function create(data, callback) {
        let query = 'INSERT INTO publicacion SET ?';
        await pool.query(query,
            [data],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                console.log(result)
                return callback(null, result);
            }
        );
    }

    async function update(data, callback) {
        let query = 'UPDATE publicacion SET descripcion=?, img=?,update_at=? WHERE id=? ';
        await pool.query(query,
            [
                data.descripcion,
                data.img,
                data.update_at,
                data.id
            ],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                console.log(result)
                return callback(null, result);
            }
        );
    }

    async function destroy(data, callback) {
        let query = 'UPDATE publicacion SET estado_id=3 WHERE id=?';
        await pool.query(query, [data.id],
            (error, result, fields) => {
                if (error) {
                    return callback(error);
                }
                console.log(result)
                return callback(null, result);
            }
        );

    }
    return {
        listAll,
        create,
        update,
        destroy
    }

}