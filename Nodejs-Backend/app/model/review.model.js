module.exports = (sequelize, Sequelize) => {
	const Review = sequelize.define('reviews', {
	  title: {
			type: Sequelize.STRING, defaultValue:  ""
	  },
	  date: {
		  type: Sequelize.DATE, defaultValue: null
	  },
	  content: {
			type: Sequelize.TEXT('long')
	  },
	});

	return Review;
}
