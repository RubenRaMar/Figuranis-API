import "./loadEnvironments.js";
import mongoose from "mongoose";
import createDebug from "debug";
import app from "./server/app.js";
import chalk from "chalk";
import connectedDatabase from "./server/database/connectedDatabase.js";

const debug = createDebug("figuranisdb-api:root");
const port = process.env.PORT ?? 4000;
const mongoDbConnetion = process.env.MONGODB_CONNECTION;

if (!mongoDbConnetion) {
  debug(`${chalk.red("Missing enviroment variable. Exiting...")}`);
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

try {
  mongoose.set("debug", false);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await connectedDatabase(mongoDbConnetion);

  debug(chalk.blue(`Connnected to database`));
} catch (error: unknown) {
  debug(`Error connecting to basadata: ${chalk.red((error as Error).message)}`);
}
