"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamesController_1 = require("../controllers/gamesController");
const loginrauht_1 = require("../middlewares/loginrauht");
class GamesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', gamesController_1.gamesController.listusers);
        this.router.post('/', gamesController_1.gamesController.createUser);
        this.router.post('/inicio', gamesController_1.gamesController.login);
        this.router.post('/queondamiloco', gamesController_1.gamesController.recuperar);
        this.router.get('/getMyProfile', loginrauht_1.verifyToken, gamesController_1.gamesController.getProfile);
        this.router.get('/getMyProfile_id/:iduser', gamesController_1.gamesController.getProfile_id);
        this.router.put('/UpdateUser', loginrauht_1.verifyToken, gamesController_1.gamesController.upUser);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
