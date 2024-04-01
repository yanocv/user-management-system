import express, { Request } from 'express';
import { JwtAuth } from '@middlewares/JwtAuth';
import { AuthController } from '@controllers/auth';

const router = express.Router();

router.get('/', JwtAuth, (req: Request, res) => {
  res.status(200).json({
    code: 2000,
    description: 'Success verify accesss token.',
    user: {
      username: req._devapp!.token.username,
    },
  });
});

router.get('/refresh', AuthController.auth);

/**
 * ログイン認証処理を行うAPI
 * 認証成功時、JWTトークンを返却し、他のAPIへ接続可能となる。
 */
router.post('/', AuthController.login);

export { router as AuthRouter };
