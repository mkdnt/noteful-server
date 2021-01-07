module.exports = {
  PORT: process.env.PORT || 9000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL,
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://MikeDent@localhost/noteful-test",
  CLIENT_ORIGIN:
    process.env.CLIENT_ORIGIN || "https://noteful-beta-bice.vercel.app",
};
