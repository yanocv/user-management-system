import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface TopicAttributes {
  id: number;
  title: string;
  contents: string;
  published_date: string;
  is_deleted: boolean;
  created_id: string;
  modified_id: string;
}

export interface TopicCreationAttributes
  extends Optional<
    Omit<TopicAttributes, 'id'>,
    'is_deleted' | 'published_date'
  > {}

export class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes
{
  /** トピックを識別する一意のID */
  declare id: number;
  /** トピックタイトル */
  declare title: string;
  /** トピック内容 */
  declare contents: string;
  /** 公開日 */
  declare published_date: string;
  /** 論理削除 */
  declare is_deleted: boolean;
  /** 作成ユーザーID */
  declare created_id: string;
  /** 更新ユーザーID */
  declare modified_id: string;
  /** 作成日時 */
  declare readonly created: Date;
  /** 更新日時 */
  declare readonly modified: Date;
}

export const TopicInit = (sequelize: Sequelize) => {
  Topic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published_date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.TEXT,
        defaultValue: false,
        allowNull: false,
      },
      created_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      modified_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'topic',
      charset: 'utf8',
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'modified',
    }
  );
};
