import { Request, Response} from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.json({text:'QUE PASA AMIGO MIO'});
    }

}

export const indexController = new IndexController();