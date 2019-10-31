import * as express from 'express';
import { User } from '../../entity/user';
import { verify } from 'password-hash';
import { sign } from 'jsonwebtoken';

const router = express.Router();

function createJWT(user: User) {
  return sign(JSON.parse(JSON.stringify(user)), "owouwu", {
    expiresIn: "60days"
  });
}

router.post('/', async (req: express.Request, res: express.Response) => {
  const {username, password} = req.body;

  const repo = req.dbConn.getRepository(User);
  const search = await repo.find({ username });

  if(search.length === 0) {
    res.json({
      status: false,
      message: "Username not found."
    });
    return;
  }

  if(verify(password, search[0].password)) {
    const jwt = createJWT(search[0]);
    res.cookie("token", jwt);
    res.json({
      status: true,
      message: "Authenticated.",
      jwt
    });
    return;
  }

  res.json({
    status: false,
    message: "Username and secret doesn't match."
  });
})

export {router as LoginRouter};