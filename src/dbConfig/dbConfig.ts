import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo Connected Sucessfully");
    });
    connection.on("error", (err: Error) => {
      console.log("Error Occured " + err);
      process.exit();
    });
  } catch (error) {
    console.log("An Error Occured ", error);
  }
}
