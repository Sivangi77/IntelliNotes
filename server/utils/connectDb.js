import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDb;