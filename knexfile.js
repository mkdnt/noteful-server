require("dotenv").config({ path: "path_to_env_file" });

module.exports = {
  client: "pg",
  connection: {
    database: process.env.DATABASE_URL,
  },
};
