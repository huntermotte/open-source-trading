exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:admin@ds157631.mlab.com:57631/trading-ideas-database';

exports.TEST_DATABASE_URL = 'mongodb://localhost:27017/trading-ideas-database';

exports.PORT = process.env.PORT || 8080;
