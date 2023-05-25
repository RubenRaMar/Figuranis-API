import "./loadEnvironments.js";
import createDebug from "debug";
import app from "./server/app.js";
import chalk from "chalk";

const port = process.env.PORT ?? 4000;
const debug = createDebug("figuranisdb-api:root");

app.listen(port, () => {
  debug(chalk.green(`Listening on http://localhost:${port}`));
});

app.use();
