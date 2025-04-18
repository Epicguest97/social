import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('followers following', 'username avatar');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      user.followers.push(req.body.userId);
      await user.save();
    }
    if (!currentUser.following.includes(req.params.id)) {
      currentUser.following.push(req.params.id);
      await currentUser.save();
    }
    res.json({ msg: 'Followed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    user.followers = user.followers.filter(f => f.toString() !== req.body.userId);
    currentUser.following = currentUser.following.filter(f => f.toString() !== req.params.id);
    await user.save();
    await currentUser.save();
    res.json({ msg: 'Unfollowed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
