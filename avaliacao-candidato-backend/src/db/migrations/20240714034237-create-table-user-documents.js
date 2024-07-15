"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("user_documents", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            documentPicture: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            proofResidence: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_address");
    },
};
