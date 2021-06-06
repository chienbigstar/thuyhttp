'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('book_categories', [
      {
        BookId: 1,
        CategoryId: 1,
      },
      {
        BookId: 2,
        CategoryId: 3,
      },
      {
        BookId: 3,
        CategoryId: 1,
      },
      {
        BookId: 3,
        CategoryId: 2,
      },
      {
        BookId: 4,
        CategoryId: 1,
      },
      {
        BookId: 4,
        CategoryId: 3,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('book_categories', null, {});
  },
};
