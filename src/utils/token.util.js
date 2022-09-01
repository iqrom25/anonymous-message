import jwt from 'jsonwebtoken';
import { seconds, minutes } from 'time-convert';

const generateToken = (payload, key, expiredTime, algorithm) => {

  const expiresIn = seconds.from(minutes)(expiredTime);

  const token = jwt.sign(payload, key, { expiresIn, algorithm });

  return token;

}

const verifyToken = (token, key) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {

    return null;
  }
}



export { generateToken, verifyToken };