var mongoose = require("mongoose");
// Setup schema
var usertSchema = mongoose.Schema({
  username : String,
  password:String
});
// Export Contact model
module.exports = mongoose.model("usermodel", usertSchema)
