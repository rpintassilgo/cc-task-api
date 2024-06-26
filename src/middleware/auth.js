const apiKey = process.env.API_KEY;

const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key && key === apiKey) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = authenticate;
