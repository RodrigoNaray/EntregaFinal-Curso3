import dotenv from "dotenv";

const environment = "DEV";

dotenv.config({
  path: environment === "PRODUCTION" ? "./.env.prod" : "./.env",
});

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
};
