'use strict'

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('analyses', {
            id : {
                type          : Sequelize.INTEGER,
                primaryKey    : true,
                autoIncrement : true
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
            }
        })
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.dropTable('analyses')
    }
}
