import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { userModel } from '../models/user.model.js';
import { handleError } from '../util/errors.js';

function createToken(id) {
  return jwt.sign({id}, process.env.JWT_SECRET);
}

// login a user
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if(!user) {
      return res.status(404).json({ success: false, message: 'Not found!'});
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if(!isMatching) {
      return res.status(401).json({ success: false, message: 'Authentication failed! Invalid credentials'});
    }

    const token = createToken(user._id);
    res.status(200).json({success: true, token, message: 'Access granted.'})
  } catch (error) {
    handleError(error, res);
  }
}

// register a user
export async function registerUser(req, res) {
	const { name, password, email } = req.body;

	try {
    // user and email existence check
		const exists = await userModel.findOne({ email });

    if(exists) {
      return res.status(409).json({ success: false, message: 'An account is registered with this email.'})
    }

    // email and password validation
    if(!email || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'This email is invalid!'})
    }

    // validating a password
    // TO BE IMPLEMENTED AS NEEDED
    // const options = {
    //   minLength: 8,
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minNumbers: 1,
    //   minSymbols: 1,
    //   returnScore: false,
    //   pointsPerUnique: 1,
    //   pointsPerRandom: 1,
    //   pointsPerRepeated: 0.5,
    //   pointsForSequences: -3,
    //   pointsForSameCase: -2,
    //   penaltyForCommonWords: -10,
    //   penaltyForSequences: -3,
    //   penaltyForSameCase: -2,
    //   penaltyForSimilarCharacters: -1,
    // };
  
    // if (!validator.isStrongPassword(password, options)) {
    //   return res.status(400).json({success: false, message: 'Weak password.'});
    // }

    if (!password || (password.length < 8)) {
      return res.status(400).json({ error: 'Invalid password!' });
    }

    // hashing the password
    const salt  = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    // get reference of newly created user
    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token, message: 'New user registered.' });
  
	} catch (error) {
    handleError(error, res);
  }
}


