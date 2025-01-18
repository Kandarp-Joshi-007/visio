// FileOperationSchema.js

const mongoose = require('mongoose');

const FileOperationSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  filePreview: {
    type: String,
    required: true
  },
  operation: {
    type: {
      type: String,
      enum: ['text', 'image', 'audio', 'tabular', 'video'],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FileOperation', FileOperationSchema);
