import { DataTypes } from 'sequelize';
import { sequelize } from '../config';

export const Book = sequelize.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
    },

    authorName: {
      type: DataTypes.STRING,
    },

    chaptersCount: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    indexes: [{ fields: ['updatedAt'] }, { fields: ['name'] }],
  },
);
