const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
    title: {
      type: String,
      trim: true
    }
  }, {
    timestamps: true
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;
