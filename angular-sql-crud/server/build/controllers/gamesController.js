"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GamesController {
    index(req, res) {
        database_1.default.query('DESCRIBE Usuario');
        res.json('users');
    }
    listusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield database_1.default.query('SELECT * FROM Usuario');
            res.json(games);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Carnet, Contraseña } = req.body;
            var sql = 'SELECT Carnet from Usuario \
        WHERE Carnet = ? AND Contraseña = ?';
            const result = yield database_1.default.query(sql, [Carnet, Contraseña]);
            if (result.length > 0) {
                const tokenid = jsonwebtoken_1.default.sign({ idus: Carnet }, 'llave');
                return res.status(200).json({ tokenid });
            }
            else {
                res.status(404).json("Datos incorrectos");
            }
        });
    }
    recuperar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Carnet, Correo, Contraseña } = req.body;
            var sql = 'SELECT Carnet from Usuario \
        WHERE Carnet = ? AND Correo = ?';
            const result = yield database_1.default.query(sql, [Carnet, Correo]);
            if (result.length > 0) {
                /*si es correcto entonces actulizo contraseña*/
                var sql_up = "UPDATE Usuario SET Contraseña = ?\
            WHERE Carnet = ?";
                const result_up = yield database_1.default.query(sql_up, [Contraseña, Carnet]);
                const tokenid = jsonwebtoken_1.default.sign({ idus: Carnet }, 'llave');
                return res.status(200).json({ tokenid });
            }
            else {
                res.status(404).json("Datos incorrectos");
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Carnet, Nombres, Apellidos, Contraseña, Correo } = req.body;
            var sql = "INSERT INTO Usuario (Carnet, Nombres, Apellidos, Contraseña, Correo) VALUES (?, ?, ?, ?, ?)";
            try {
                const result = yield database_1.default.query(sql, [Carnet, Nombres, Apellidos, Contraseña, Correo]);
                res.status(200).json('usuario ingresado');
            }
            catch (err) {
                res.status(404).json(err.sqlMessage);
                // handle errors here
            }
        });
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var Carnet = req.userId;
            var sql = "SELECT Carnet, Nombres, Apellidos, Contraseña, Correo\
        FROM Usuario WHERE Carnet = ?";
            try {
                const result = yield database_1.default.query(sql, [Carnet]);
                //res.json({ status: 1, message: 'usuario ingresado' });
                res.status(200).json(result);
            }
            catch (err) {
                res.status(404).json({ status: -1, error: err.sqlMessage });
                // handle errors here
            }
        });
    }
    getProfile_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { iduser } = req.params;
            var Carnet = iduser;
            var sql = "SELECT Carnet, Nombres, Apellidos, Contraseña, Correo\
        FROM Usuario WHERE Carnet = ?";
            try {
                const result = yield database_1.default.query(sql, [Carnet]);
                //res.json({ status: 1, message: 'usuario ingresado' });
                res.status(200).json(result);
            }
            catch (err) {
                res.status(404).json({ status: -1, error: err.sqlMessage });
                // handle errors here
            }
        });
    }
    upUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombres, Apellidos, Contraseña, Correo } = req.body;
            var Carnet = req.userId;
            var sql = "UPDATE Usuario SET Nombres = ?, Apellidos = ?, Contraseña = ?, Correo = ?\
        WHERE Carnet = ?";
            try {
                const result = yield database_1.default.query(sql, [Nombres, Apellidos, Contraseña, Correo, Carnet]);
                res.status(200).json('Datos Actualizados');
            }
            catch (err) {
                res.status(404).json(err.sqlMessage);
                // handle errors here
            }
        });
    }
}
exports.gamesController = new GamesController();
