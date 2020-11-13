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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers['authorization'];
    console.log("token", token);
    if (!token)
        return res.status(403).json({ message: "No tiene usuario logueado" });
    token = token.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauhtorized Request');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'llave');
        console.log("decoded", decoded);
        //req.userId = decoded.idus;
        console.log("req.userId", req.userId);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "No esta Autorizado!" });
    }
});
