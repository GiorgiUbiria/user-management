import http, { Server } from "http"
import db from "../database/connectDB"
import app from "../app"

const PORT: number = Number(process.env.PORT) || 8000

async function Connect(): Promise<void> {
  const connectDB = await db()
  // tslint:disable-next-line:no-console
  console.log(`MongoDB connected`)
  const server: Server = app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on port ${PORT}`)
  })
}

Connect()
