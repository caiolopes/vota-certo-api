'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('tweets', {
            id : {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true
            },
            politicianId : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'politicians',
                    key   : 'id'
                }
            },
            name : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            username : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            picture : {
                type      : Sequelize.STRING,
                allowNull : false
            },
            text : {
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
        queryInterface.dropTable('tweets')
    }
}
