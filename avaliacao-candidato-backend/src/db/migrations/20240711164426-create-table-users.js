"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface
            .createTable("users", {
                id: {
                    // Geralmente uso UUID, mas por problemas irei usar INTEGER.
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            })
            .then(function () {
                queryInterface.createTable("user_emails", {
                    id: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        primaryKey: true,
                        autoIncrement: true,
                    },
                    emailOwner: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    email: {
                        type: Sequelize.STRING,
                        allowNull: false,
                        unique: true,
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
            });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_emails");
        await queryInterface.dropTable("users");
    },
};
