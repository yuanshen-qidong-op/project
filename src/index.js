// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 连接MongoDB
mongoose.connect('mongodb://localhost:27017/auth-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 用户模型
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

// 注册API
app.post('/api/auth/register', async (req, res) => {
  try {
    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.status(400).json({ message: '邮箱已注册' });

    // 加密密码
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 创建新用户
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// 登录API
app.post('/api/auth/login', async (req, res) => {
  try {
    // 查找用户
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: '邮箱或密码错误' });

    // 验证密码
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: '邮箱或密码错误' });

    // 生成JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

app.listen(3000, () => {
  console.log('服务器运行在端口3000');
});