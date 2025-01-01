const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/charity_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// File upload configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Models
const charitySchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  websiteURL: String,
  contactInfo: String,
  documentPath: String,
  documentStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Declined'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,
  preferredCurrency: String,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['Active', 'Ended', 'ENUM'],
    default: 'Active'
  },
  charityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const donorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  preferredLanguage: String,
  address: String,
  createdAt: {
    type: Date,
    default: