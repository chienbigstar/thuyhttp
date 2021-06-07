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
    return queryInterface.bulkInsert('Books', [
      {
        name: 'Một Nửa Chữa Lành Là Đau Thương',
        authorName: 'Nguyễn Văn A',
        chaptersCount: 3,
        image: 'https://img.truyentrz.com/2021/03/82.jpg',
        createdAt: new Date('2016-01-01'),
        updatedAt: new Date('2016-01-01'),
      },
      {
        name: 'Long Tế',
        authorName: 'Lư Lai Phật Tổ',
        chaptersCount: 1,
        image: 'https://img.truyentrz.com/2020/12/long-te.jpg',
        createdAt: new Date('2017-01-01'),
        updatedAt: new Date('2017-01-01'),
      },
      {
        name: 'Cô Vợ Thay Thế',
        authorName: 'Lạt Tiêu',
        chaptersCount: 2,
        image: 'https://img.truyentrz.com/2020/11/truyen-co-vo-thay-the.jpg',
        createdAt: new Date('2017-02-01'),
        updatedAt: new Date('2017-02-01'),
      },
      {
        name: 'Hôm Nay Vai Phản Diện Rất Ngoan',
        authorName: 'Phỉ Thúy Thúy',
        chaptersCount: 2,
        image: 'https://img.truyentrz.com/2020/11/HOM-NAY-VAI-PHAN-DIEN-RAT-NGOAN.jpg',
        createdAt: new Date('2015-02-01'),
        updatedAt: new Date('2015-02-01'),
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
    await queryInterface.bulkDelete('Books', null, {});
  },
};
