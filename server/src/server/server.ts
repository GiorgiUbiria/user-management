import { Server } from "http";

import db from "../database/connectDB";
import app from "../app";

const PORT: number = Number(process.env.PORT) || 8080;

const Connect = async (): Promise<void> => {
  await db();
  // tslint:disable-next-line:no-console
  console.log(`MongoDB connected`);
  const server: Server = app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${PORT}`);
  });
};

Connect();
