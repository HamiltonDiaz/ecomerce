const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');


// /api/users/...

/*listar Usuario**/
router.get('/', userController.listAll);
/* crear Usuario*/
router.post('/create', userController.create );

router.post('/login', userController.login);

/*Editar Usuario*/
router.put('/update', async (req, res) => {
   const updateUsuario = await userController.update(req.body)
   res.json(updateUsuario);
});
/* Eliminar Usuario*/
router.put('/delete', async (req, res) => {
   const deleteUsuario = await userController.destroy(req.body)
   res.json(deleteUsuario);

});

module.exports = router;