require('dotenv').config();

const { validationResult } = require('express-validator');

const User = require('../models/user');

const db = require('../util/database');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;


exports.signup = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const result = await User.save(userDetails)

        res.status(201).json({ message: 'User registered!' })
        
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
  
    try {
      const user = await User.find(email);
        // console.log(user)
        const storedUser = user.rows[0];
        console.log(storedUser);

      if (!storedUser) {
        const error = new Error("Sähköpostilla ei löydy käyttäjää");
        error.statusCode = 401;
        throw error;
      }
  
      if (!storedUser || !storedUser.password) {
        const error = new Error("Käyttäjätunnus tai salasana on väärin");
        error.statusCode = 401;
        throw error;
      }
  
      const isEqual = await bcrypt.compare(password, storedUser.password);
  
      if (!isEqual) {
        const error = new Error("salasana on väärin");
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        {
          email: storedUser.email,
          userId: storedUser.id,
        },
        secretKey,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ token, userId: storedUser.id, name: storedUser.name });


    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
        console.log("Virhe controller/auth")
      }
      next(err);
    }
  };