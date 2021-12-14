// Provide common config values to the current environment.
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
} else {
  dotenv.config({
    path: `${process.cwd()}/.env.local`
  });
}
