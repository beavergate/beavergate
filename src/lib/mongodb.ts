import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connectToDatabase(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://propmgmtdev:lDQB65CvmnXS5DH4@cluster0.opbdknd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default connectToDatabase;
