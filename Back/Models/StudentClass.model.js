const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentClassSchema = new Schema({
  
  IdStudent:{
    type:Schema.Types.ObjectId,
    ref:"Students"  
  },
  IdClass:{
    type:Schema.Types.ObjectId,
    ref:"ClassName"  
  },
  ScolarYear: {
    type: String,
    required: true
  }
});



const StudentClass = mongoose.model('StudentClass', StudentClassSchema);
module.exports = StudentClass;

