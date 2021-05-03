
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');

const _ = require('lodash');

const Admin = require('../Models/Admin.model');
const User = require('../Models/User.model');
const DataInfo = require('../Models/DataInfo.model');
const RegistrationCard = require('../Models/RegistrationCard.model');
const EcoDriveKPI = require('../Models/EcoDriveKPI.model');
const DriveKPI = require('../Models/DriveKPI.model');
const Score = require('../Models/Score.model');
const EcoScore = require('../Models/EcoScore.model');
const Accident = require('../Models/Accident.model');
const Notifications = require('../Models/Notifications.model');


module.exports = {
  getAllAdmins: async (req, res, next) => {
    try {
      const results = await Admin.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllNotifications: async (req, res, next) => {
    try {
      const results = await Notifications.find({});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  createNewAdmin: async (req, res, next) => {
      console.log(req.params);

    try {
      const admin = new Admin(req.body);
      const result = await admin.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
getAllUser: async (req, res, next) => {
    try {
      const results = await User.find({}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  findUserInfoById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).populate("Registrations");
      if (!user) {
        throw createError(404, 'User does not exist.');
      }
      res.send(user);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  },
  getSearchUserByName: async (req, res, next) => {
    
    console.log(req.query);
    try {
      let mm = req.query.aze;
      const results = await User.find({"username":  new RegExp(mm, 'i')}, { __v: 0 });
      // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Product.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getDataInfoByDeviceId: async (req, res, next) => {
    console.log(req.query)
    console.log(req.params);
    try {
      const id = req.params.id;
      const results = await DataInfo.find({"deviceId": id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getAccidentInfoByDeviceIdAndDate: async (req, res, next) => {

    try {
      const id = req.params.deviceid;
      const results = await Accident.find({"DeviceId": id });
      console.log(id);
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getEcoDriveDataByDeviceId: async (req, res, next) => {
    
    console.log(req.params.id);/// To get the date
    try {
      const id = req.params.id;
      const results = await EcoDriveKPI.find({"DeviceId": id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getDriveKPIDataByDeviceId: async (req, res, next) => {
    
    console.log(req.params.id);
    try {
      const id = req.params.id;
      const results = await DriveKPI.find({"DeviceId": id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getDriverScoreByDeviceId: async (req, res, next) => {
    
    console.log(req.params.id);
    try {
      const id = req.params.id;
      const results = await Score.find({"DeviceId": id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
  getDriverEcoScoreByDeviceId: async (req, res, next) => {
    
    console.log(req.params.id);
    try {
      const id = req.params.id;
      const results = await EcoScore.find({"DeviceId": id });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },
createNewUser: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
  try {
    const client = new User(req.body);
    const result = await client.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
createNewRegistration: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
  try {
    const Registration = new RegistrationCard(req.body);
    const result = await Registration.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
createNewEcodrive: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
  try {
    const EcoDriveKPIObj = new EcoDriveKPI(req.body);
    const result = await EcoDriveKPIObj.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
createNewDrive: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
  try {
    const DriveKPIObj = new DriveKPI(req.body);
    const result = await DriveKPIObj.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
createNewNotification: async (req, res, next) => {
  console.log(req.params);
  console.log(req.body);
try {
  const NotificationObj = new Notifications(req.body);
  const result = await NotificationObj.save();
  res.send(result);
} catch (error) {
  console.log(error.message);
  if (error.name === 'ValidationError') {
    next(createError(422, error.message));
    return;
  }
  next(error);
}
},
createNewAccident: async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);
  try {
    const AccidentObj = new Accident(req.body);
    const result = await AccidentObj.save();
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
},
getAllRegistration: async (req, res, next) => {
  try {
    const results = await RegistrationCard.find({}, { __v: 0 });
    // const results = await Product.find({}, { name: 1, price: 1, _id: 0 });
    // const results = await Product.find({ price: 699 }, {});
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
},
findAdminById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const admin = await Admin.findById(id);
      // const product = await Product.findOne({ _id: id });
      if (!admin) {
        throw createError(404, 'Admin does not exist.');
      }
      res.send(admin);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Admin id'));
        return;
      }
      next(error);
    }
  },
  findNumberAccidentByDeviceId: async (req, res, next) => {
    const id = req.params.deviceid;
    console.log(id);
    try {
      const accident = await Accident.countDocuments({DeviceId:id});
      if (!accident) {
        throw createError(404, 'accident does not exist.');
      }
      else {
        res.json(accident);
      }
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid accident/Device id'));
        return;
      }
      next(error);
    }
  },
  findRegistrationById: async (req, res, next) => {
      const id = req.params.id;
      try {
        const registration = await RegistrationCard.findById(id);
        if (!registration) {
          throw createError(404, 'registration does not exist.');
        }
        res.send(registration);
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          next(createError(400, 'Invalid registration id'));
          return;
        }
        next(error);
      }
    },

  updateAdmin: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      console.log(req.params);
      console.log(req.body);

      const result = await Admin.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Admin does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Admin Id'));
      }

      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    console.log(req.body);
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      console.log(req.params);
      console.log(req.body);

      const result = await User.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Admin does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Admin Id'));
      }

      next(error);
    }
  },

  updateRegistration: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };
      console.log(req.params);
      console.log(req.body);

      const result = await RegistrationCard.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Registration does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Registration Id'));
      }

      next(error);
    }
  },
  deleteAdmin: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Admin.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Admin does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Admin id'));
        return;
      }
      next(error);
    }
  },
  deleteRegistration: async (req, res, next) => {
    const id = req.params.id;
    console.log(req.params);
    console.log(req.body);
    const userId = req.body;

    try {
      const result = await User.findOneAndUpdate(userId, {$pull: {Registrations: id}});
      // console.log(result);
      if (!result) {
        throw createError(404, 'Registration does not exist in user collection');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Registration id in user collections'));
        return;
      }
      next(error);
    }

    try {
      const result = await RegistrationCard.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'Registration does not exist in the collection');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Registration id'));
        return;
      }
      next(error);
    }


  }
  ,
  deleteUser: async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {
      const result = await User.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'User does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid User id'));
        return;
      }
      next(error);
    }
  }
}
module.exports.userProfile = (req, res, next) =>{
  Admin.findOne({ _id: req._id },
      (err, admin) => {
          if (!admin)
              return res.status(404).json({ status: false, message: 'admin record not found.' });
          else
              return res.status(200).json({ status: true, admin : _.pick(admin,['_id','name','email']) });
      }
  );
}
module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('local', (err, user, info) => {       
      // error from passport middleware
      if (err) return res.status(400).json(err);
      // registered user
      else if (user) return res.status(200).json({ "token": user.generateJwt() });
      // unknown user or wrong password
      else return res.status(404).json(info);
  })(req, res,next);
}
