"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("user_address", {
            id: {
                // Geralmente uso UUID, mas por problemas irei usar INTEGER.
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            numero: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            logradouro: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            complemento: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cidade: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isDefault: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
