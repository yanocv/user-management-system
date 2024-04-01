import express from 'express';
import { UserController } from '@controllers/user';
import { checkSchema, Schema } from 'express-validator';

const createSchema: Schema = {
  'create.username': {
    in: ['body'],
    isLength: {
      options: { min: 8, max: 32 },
    },
  },
  'create.password': {
    in: ['body'],
    isLength: {
      options: { min: 8, max: 32 },
    },
  },
};

const router = express.Router();

/**
 * ユーザー情報全件取得
 */
// router.get('/', UserController.findOne);

/**
 * ユーザー情報1件取得
 */
// router.get('/:id', UserController.findAll);

/**
 * ユーザー情報作成
 */
router.post(
  '/',
  // body('create.username').isLength({ min: 8, max: 32 }),
  // body('create.password').isLength({ min: 8, max: 32 }),
  checkSchema(createSchema),
  UserController.create
);

/**
 * ユーザー情報1件更新
 */
// router.put('/:id', UserController.update);

/**
 * ユーザー情報1件削除
 */
// router.delete('/:id', UserController.delete);

/**
 * ユーザー情報全件削除
 */
// router.delete('/', UserController.deleteAll);

export { router as UserRouter };
