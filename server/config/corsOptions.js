const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);
     
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;