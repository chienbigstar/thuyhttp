import { DataTypes } from 'sequelize';
import { sequelize } from '../config';

export const Category = sequelize.define(
  'Category',
  {
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  },
);
