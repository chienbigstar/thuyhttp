import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import { Book } from './';

export const Chapter = sequelize.define(
  'Chapter',
  {
    title: {
      type: DataTypes.STRING,
    },

    content: {
      type: DataTypes.TEXT,
    },

    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: 'id',
      },
    },

    image: {
      type: DataTypes.STRING,
    },

    chapterNumber: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ['bookId'] }],
  },
);
