const jwt = require("jsonwebtoken");

module.exports = (id, email, mins) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await jwt.sign(
        {
          user: {
            email: email,
            id: id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: mins + "min" }
      );

      if (!token) {
        throw new Error("Token creation: couldn't create jwt token!");
      }

      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};
