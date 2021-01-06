module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://postgres://ejneonudvqaeph:5f33ec996f943c18d7c8a85d57741f3cc07df21d82b5be5d8c08ba2e4a239cb4@ec2-18-232-232-96.compute-1.amazonaws.com:5432/dd17208m5mte5g",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://MikeDent@localhost/noteful-test",
  CLIENT_ORIGIN:
    process.env.CLIENT_ORIGIN || "https://noteful-beta-bice.vercel.app",
};
