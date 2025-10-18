const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://akhilbgeorge97_db_user:1IMhOvNTuuyGo4sB@namastenode.9ivimqi.mongodb.net/devConnect"
  );
};

module.exports = connectDB;
