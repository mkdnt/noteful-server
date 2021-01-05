module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://dyidnuwloewsvc:2c34ff2191cc2229004c6467190dde9d76015a5a36f82cb58dd362a8e3812539@ec2-3-231-241-17.compute-1.amazonaws.com:5432/dehtlonnat0sqs",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://MikeDent@localhost/noteful-test",
};
