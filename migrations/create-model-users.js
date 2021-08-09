module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'firstName',
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'lastName',
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      field: 'phoneNumber',
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'createdAt',
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updatedAt',
      allowNull: false
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('superuser')
};
