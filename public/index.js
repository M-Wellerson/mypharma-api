import app from "../config/app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})