import { handleError } from '../util/errors.js';
import { verifyToken } from '../util/jwt.js';

async function authenticate(req, res, next) {
  const { token } = req.headers;

  if(!token) {
    return res.status(401).json({ success: false, message: 'No authorization to perform this operation!' });
  }

  try {
    const decodedToken = verifyToken(token);
    req.body.userId = decodedToken.id;
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
}

export default authenticate;