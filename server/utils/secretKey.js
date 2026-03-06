// Generamos una palabra secreta con esta librería
import crypto from 'crypto';

crypto.randomBytes(128, (err, buf) => {
  if (err) {
    console.log(err);
    return
  }
  console.log("The random data is: "
    + buf.toString('hex'));
});