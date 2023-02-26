const User = require('../models/user');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res) => {
  const { name, surname, city, password } = req.body;
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found', success: false });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid password',success: false  });
  }

  user.name = name || user.name;
  user.surname = surname || user.surname;
  user.city = city || user.city;
  user.updatedAt = Date.now();

  await user.save();

  return res.json({ message: 'Profile updated successfully', user: user, success: true });
};

module.exports = { updateProfile };
