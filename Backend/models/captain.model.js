const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'First name must be at least 3 characters long']
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, 'Last name must be at least 3 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address'],
    minlength: [5, 'Email must be at least 5 characters long']
  },
  password: {
    type: String,
    required: true,
    select: false, // This ensures password is not returned in queries
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'Color must be at least 3 characters long']
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'Plate must be at least 3 characters long']
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'Capacity must be at least 1']
    },
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'auto'],
      required: true
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'in-use'],
      default: 'available'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      default: [77.2088282, 28.6139298], // [longitude, latitude]
      required: true
    },
    // required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook for password hashing
captainSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to generate JWT token
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
}

// Method to compare entered password with stored hashed password
captainSchema.methods.comparePassword = async function (password) {
//   const captain = await this.model('captain').findById(this._id).select('+password');
//   if (!captain) {
//     throw new Error('Captain not found');
//   }
  return await bcrypt.compare(password, this.password);
}

// Static method to hash a password (for new users)
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
  
}
captainSchema.index({ location: '2dsphere' });
// Create the model
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
