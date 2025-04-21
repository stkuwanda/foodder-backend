import jwt from 'jsonwebtoken';

export function createToken(id) {
	return jwt.sign({ id }, process.env.JWT_SECRET);
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
