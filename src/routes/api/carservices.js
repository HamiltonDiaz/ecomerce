const express = require('express');
const router = express.Router();
const carservicesController = require('../../controllers/carservicesController');


// /api/users/...

/*listar Usuario**/
router.get('/', carservicesController.listAll);
router.get('/:placa', carservicesController.getCarPlaca);

/* crear Usuario*/
router.post('/create', carservicesController.create );




router.post('/login', carservicesController.login);

/*Editar Usuario*/
router.put('/update', async (req, res) => {
   const updateUsuario = await carservicesController.update(req.body)
   res.json(updateUsuario);
});
/* Eliminar Usuario*/
router.put('/delete', async (req, res) => {
   const deleteUsuario = await carservicesController.destroy(req.body)
   res.json(deleteUsuario);

});

module.exports = router;