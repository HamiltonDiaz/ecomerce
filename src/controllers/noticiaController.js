const model = require('../models/noticia');

async function listAll(req, res) {
    const listAll = await model().listAll(
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    succes: 0,
                    message: "Database conection error"
                })
            }
            return res.status(200).json({
                succes: 1,
                data: result
            })
        }
    )
    return listAll
}
async function create(req, res, next) {
    const data = req.body;

    if (req.file) {
        data.img= req.file.filename
    }
    
    const create = await model().create(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                succes: 0,
                message: "Database conection error"
            })
        }
        return res.status(200).json({
            succes: 1,
            data: result
        })

    })
    return create
}
async function update(req, res, next) {
    const data = req.body;
    const update = await model().update(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                succes: 0,
                message: "Database conection error"
            })
        }
        return res.status(200).json({
            succes: 1,
            data: result
        })

    })
    return update
}
async function destroy(req, res, next) {
    const data = req.body;
    const update = await model().destroy(data, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                succes: 0,
                message: "Database conection error"
            })
        }
        return res.status(200).json({
            succes: 1,
            data: result
        })

    })
    return update


}
module.exports = {
    listAll,
    create,
    update,
    destroy
}
