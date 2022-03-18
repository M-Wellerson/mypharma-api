import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin_mypharma:lAvZfMlXQVqkAMX4@mypharma.ubxhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log('conect');
});