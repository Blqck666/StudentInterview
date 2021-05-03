const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
      IdClass:{
        type:Schema.Types.ObjectId,
        ref:"ClassName"  
      },
      IdSubject: {
        type:Schema.Types.ObjectId,
        ref:"Subject"  
      },
      Grade: {
        type: Number
      },
      IdStudent: {
        type:Schema.Types.ObjectId,
        ref:"Students" 
      }
});



const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;

