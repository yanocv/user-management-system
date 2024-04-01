import { Request, Response } from 'express';
import { Op } from 'sequelize';
import moment from 'moment';
import { Topic } from '@database/models/topic.model';

/**
 * トピック情報の操作に使用するコントローラ.
 */
const TopicController = {
  /**
   * 全トピック情報を取得する関数.
   *
   * @param req express.Request
   * @param res express.Response
   */
  findAll: async (req: Request, res: Response) => {
    // TODO: クエリパラメータによって取得できる情報を操作できるようにしたほうが良い。（主に管理者用)
    try {
      const topics = await Topic.findAll({
        attributes: {
          exclude: ['id', 'created_id', 'modified_id'],
        },
        where: {
          is_deleted: false,
          [Op.and]: [
            {
              published_date: {
                [Op.ne]: null,
              },
            },
            {
              published_date: {
                [Op.lte]: moment().format('YYYY-MM-DD'),
              },
            },
          ],
        },
        order: [['published_date', 'DESC']],
        raw: true,
      });

      return res.status(200).json({ topics });
    } catch (e) {
      return res.status(500).json({
        code: 500,
        description: "Internal Server Error. Topic couldn't get.",
      });
    }
  },
};

export { TopicController };
