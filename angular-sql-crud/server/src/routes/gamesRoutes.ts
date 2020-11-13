import { Router } from 'express';

import { gamesController } from '../controllers/gamesController';

import  { verifyToken } from '../middlewares/loginrauht'

class GamesRoutes {
    
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', gamesController.listusers);        
        this.router.post('/', gamesController.createUser);
        this.router.post('/inicio', gamesController.login);
        this.router.post('/queondamiloco', gamesController.recuperar);         

        this.router.get('/getMyProfile', verifyToken, gamesController.getProfile);
        this.router.get('/getMyProfile_id/:iduser', gamesController.getProfile_id);

        this.router.put('/UpdateUser', verifyToken, gamesController.upUser);
        
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;  