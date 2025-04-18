import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' }
});

export default mongoose.model('Story', storySchema);
