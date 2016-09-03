'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('analyses', {
            id : {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true
            },
            userId : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'users',
                    key   : 'id'
                }
            },
            tweetId : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'tweets',
                    key   : 'id'
                }
            },
            politicianId : {
                type       : Sequelize.INTEGER,
                references : {
                    model : 'politicians',
                    key   : 'id'
                }
            },
            sentiment : {
                type      : Sequelize.ENUM('positive', 'negative', 'neutral'),
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
        queryInterface.dropTable('analyses')
    }
}
