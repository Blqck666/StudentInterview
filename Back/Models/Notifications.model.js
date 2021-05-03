const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
    StudentID:{
        type:Schema.Types.ObjectId,
        ref:"Students"  
      },
    title: {
        type: String,
        required: true
      },
      SubjectID: {
        type:Schema.Types.ObjectId,
        ref:"Subject" 
      }
});



const Notifications = mongoose.model('Notifications', NotificationsSchema);
module.exports = Notifications;

