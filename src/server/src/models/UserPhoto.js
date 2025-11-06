import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; 

class UserPhoto extends Model {}

UserPhoto.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  filename: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('profile', 'doc', 'car', 'other'),
    defaultValue: 'other'
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'UserPhoto',
  tableName: 'user_photos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default UserPhoto;
