import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Book, Category } from './';

export const book_category = sequelize.define(
  'book_category',
  {},
  {
    timestamps: false,
  },
);

Book.belongsToMany(Category, { through: book_category });
Category.belongsToMany(Book, { through: book_category });
