const express = require('express');
const router = express.Router();
const noticiaController = require('../../controllers/noticiaController');

/*listar Notica**/
router.get('/', noticiaController.listAll);

/* crear Notica*/
router.post('/create', noticiaController.create);

/*Editar Notica*/
router.put('/update', noticiaController.update);

/* Eliminar Notica*/
router.put('/delete',noticiaController.destroy);


router.post('/img', async (req, res) => {
    console.log(req.file)

    if (req.file){
        msg="Subida"
    }else{
        msg= "Formato de imagen no válido"
    }
    console.log(req.file)
    res.json(msg)
 });




module.exports = router;