import mongoose from "mongoose";

const connDB = async (uri) => {

    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected: ", conn.connection.host);

    } catch (error) {
        console.log(`MongDb Error: ${error.message}`);
        process.exit(0);
    }
}

export default connDB;

// mongoose.connection.on("error", (err) => {
    //     console.log(err);
    // });