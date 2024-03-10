const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    feedback: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
