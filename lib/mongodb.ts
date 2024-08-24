import mongoose from "mongoose";
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!dbURI) {
            throw new Error("No database URI provided!");
        }
        const { connection } = await mongoose.connect(dbURI);
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default connectDB;
