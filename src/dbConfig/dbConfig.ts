import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.set('strictQuery', false);

        if (!process.env.MONGODB_URI) {
            throw Error("MongoDB URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
    } catch (error: any) {
        console.log("Error connecting to MongoDB", error);
        throw Error("Connection failed!");
    }
};
