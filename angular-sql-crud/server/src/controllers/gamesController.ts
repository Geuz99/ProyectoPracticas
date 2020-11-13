import { Request, Response} from 'express';

import pool from '../database'; 

import jwt  from 'jsonwebtoken';


class GamesController {

    public index(req: Request, res: Response) {
        pool.query('DESCRIBE Usuario')
        res.json('users')
    }

    public async listusers(req: Request, res: Response): Promise<void> {
        const games = await pool.query('SELECT * FROM Usuario');
        res.json(games);
    }

    public async login(req: Request, res: Response): Promise<any> {
        const { Carnet, Contraseña } = req.body;        

        var sql = 'SELECT Carnet from Usuario \
        WHERE Carnet = ? AND Contraseña = ?';

        const result = await pool.query(sql, [Carnet, Contraseña]);

        if (result.length > 0) {

            const tokenid = jwt.sign({idus: Carnet}, 'llave');
            return res.status(200).json({tokenid});
        } else {
            res.status(404).json("Datos incorrectos");
        } 

    }

    public async recuperar(req: Request, res: Response): Promise<any> {
        const { Carnet, Correo, Contraseña } = req.body;
  
        var sql = 'SELECT Carnet from Usuario \
        WHERE Carnet = ? AND Correo = ?';
  
        const result = await pool.query(sql, [Carnet, Correo]);
  
        if (result.length > 0) {
  
            /*si es correcto entonces actulizo contraseña*/
            var sql_up = "UPDATE Usuario SET Contraseña = ?\
            WHERE Carnet = ?";
  
            const result_up = await pool.query(sql_up, [Contraseña, Carnet] );
            const tokenid = jwt.sign({idus: Carnet}, 'llave');
            
            return res.status(200).json({tokenid});
        } else {
            res.status(404).json("Datos incorrectos");
        } 
  
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const { Carnet, Nombres, Apellidos, Contraseña, Correo } = req.body;
        var sql = "INSERT INTO Usuario (Carnet, Nombres, Apellidos, Contraseña, Correo) VALUES (?, ?, ?, ?, ?)";

    try {
        const result = await pool.query(sql, [Carnet, Nombres, Apellidos, Contraseña, Correo] );       
        res.status(200).json('usuario ingresado' );
      } catch (err) {        
        res.status(404).json(err.sqlMessage);
        // handle errors here
      }

    }

    public async getProfile(req: Request, res: Response): Promise<void> {
        var Carnet  = req.userId
        var sql = "SELECT Carnet, Nombres, Apellidos, Contraseña, Correo\
        FROM Usuario WHERE Carnet = ?"
          try {
              const result = await pool.query(sql, [Carnet]);
              //res.json({ status: 1, message: 'usuario ingresado' });
              res.status(200).json(result);
            } catch (err) {
              res.status(404).json({ status: -1, error: err.sqlMessage });
              // handle errors here
            }
    }

    public async getProfile_id(req: Request, res: Response): Promise<void> {
        const { iduser } = req.params;
        var Carnet  = iduser
        var sql = "SELECT Carnet, Nombres, Apellidos, Contraseña, Correo\
        FROM Usuario WHERE Carnet = ?"
          try {
              const result = await pool.query(sql, [Carnet]);
              //res.json({ status: 1, message: 'usuario ingresado' });
              res.status(200).json(result);
            } catch (err) {
              res.status(404).json({ status: -1, error: err.sqlMessage });
              // handle errors here
            }
    }      

    public async upUser(req: Request, res: Response): Promise<void> {
        const { Nombres, Apellidos, Contraseña, Correo } = req.body;
        var Carnet  = req.userId
        var sql = "UPDATE Usuario SET Nombres = ?, Apellidos = ?, Contraseña = ?, Correo = ?\
        WHERE Carnet = ?";

    try {
        const result = await pool.query(sql, [Nombres, Apellidos, Contraseña, Correo, Carnet] );       
        res.status(200).json('Datos Actualizados' );
      } catch (err) {        
        res.status(404).json(err.sqlMessage);
        // handle errors here
      }

    }

}

export const gamesController = new GamesController();