// este archivo manejara todas las rutas a las que el programa accedera
const { Router } = require('express');
const controladorInicio = require('../controladores/controladorInicio');
// el router en minuscula es diferente al de arriba 
const router = Router(); // instanciamos Router

router.get('/', controladorInicio.Raiz);  //instanciamos ruta get
router.get('/otra', controladorInicio.otra);
router.get('/otra2', controladorInicio.otra2);

module.exports = router; //este envia toda la ruta (router es un objeto y lo envia con esta linea)