import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model,
  Optional,
  Sequelize,
} from 'sequelize';
import { User } from '@database/models/user.model';

interface PermissionAttributes {
  id: number;
  label: string;
  is_deleted: boolean;
  created_id: string;
  modified_id: string;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'is_deleted'> {}

export class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  /** 権限を識別する一意のID */
  declare id: number;
  /** 権限名称 */
  declare label: string;
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

  declare getUser: HasManyGetAssociationsMixin<User>;
  declare countUser: HasManyCountAssociationsMixin;
  declare hasUser: HasManyHasAssociationMixin<User, number>;
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare removeUser: HasManyRemoveAssociationMixin<User, number>;
  declare createUser: HasManyCreateAssociationMixin<User>;

  declare readonly user?: User[];

  declare static associations: {
    user: Association<Permission, User>;
  };
}

export const PermissionInit = (sequelize: Sequelize) => {
  Permission.init(
    {
      id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
      },
      label: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
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
      tableName: 'permission',
      charset: 'utf8',
      timestamps: true,
      createdAt: 'created',
      updatedAt: 'modified',
    }
  );
};
