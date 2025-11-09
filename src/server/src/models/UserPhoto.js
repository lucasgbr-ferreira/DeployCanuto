import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserPhoto = sequelize.define('UserPhoto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.ENUM('profile','doc','car','other'),
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
  tableName: 'user_photos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default UserPhoto;
