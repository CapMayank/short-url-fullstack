const{v4: uuidv4} = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    try {
    await User.create({
        name,
        email,
        password,
    });
    return res.status(201).json({message: 'User created successfully'});
} catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({error: 'Failed to create user'});
}
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' }); // Incorrect credentials
      }
      
      const token = setUser(user);
      res.cookie('uid', token, {
        httpOnly: false,
        secure: false,
        sameSite: 'strict',
        path: '/',
      }); 
      console.log(`User logged in successfully with session ID: ${token}`);
  

      return res.status(200).json({ message: 'User logged in successfully' }); // Successful login
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'An error occurred during login' }); // Generic error handling
    }
  }


module.exports = { 
    handleUserSignup,
    handleUserLogin,

};