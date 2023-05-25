import mongoose from "mongoose";

const connectedDatabase = async (database: string): Promise<typeof mongoose> =>
  mongoose.connect(database);

export default connectedDatabase;
