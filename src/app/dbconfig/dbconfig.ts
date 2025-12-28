import mongoose from "mongoose";

/**
 * Establishes and reuses a MongoDB connection using Mongoose.
 * Designed for server-side usage in Next.js applications.
 */

export async function connectToDatabase(): Promise<{
  success: boolean;
  message: string;
}> {
  const LOG_PREFIX = "[DB_CONNECTION]";

  try {
    const mongoUri = process.env.MONGODB_URI;

    // -----------------------------
    // Validations
    // -----------------------------
    if (!mongoUri) {
      console.error(`${LOG_PREFIX} Missing MONGODB_URI environment variable`);
      throw new Error("Database configuration missing");
    }

    // -----------------------------
    // Reuse existing connection
    // -----------------------------
    if (mongoose.connection.readyState === 1) {
      console.info(`${LOG_PREFIX} Reusing existing MongoDB connection`);
      return {
        success: true,
        message: "MongoDB connection already established",
      };
    }

    // -----------------------------
    // Establish new connection
    // -----------------------------
    console.info(`${LOG_PREFIX} Establishing new MongoDB connection`);

    await mongoose.connect(mongoUri, {
      bufferCommands: false,
    });

    console.info(`${LOG_PREFIX} MongoDB connected successfully`);

    return {
      success: true,
      message: "MongoDB connected successfully",
    };
  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to connect to MongoDB`, {
      error: error instanceof Error ? error.message : error,
    });

    return {
      success: false,
      message: "Failed to connect to MongoDB",
    };
  }
}
