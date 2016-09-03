'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('politicians', {
            id : {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true
            },
            partyId : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'parties',
                    key   : 'id'
                }
            },
            name : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            picture : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            office : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            createdAt : {
                type : Sequelize.DATE
            },
            updatedAt : {
                type : Sequelize.DATE
            }
        })
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('politicians')
    }
}
