const { Sequelize } = require('sequelize');


function getDatabase() {

	if (!global.sequelize) {
		global.sequelize = new Sequelize('myvaxxid', 'root', '', {
		  host: 'localhost',
		  dialect: 'mysql',
		});
	}

	return global.sequelize

}

module.exports = getDatabase