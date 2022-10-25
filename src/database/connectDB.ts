import mongoose from "mongoose"

const db = async (): Promise<any> => {
  try {
    return mongoose.connect(String(process.env.MONGO_URI))
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error)
    process.exit(1)
  }
}

export = db