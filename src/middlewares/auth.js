const adminAuth = (req, res, next) => {
  console.log("admin auth");
  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("Auth denied");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Auth denied");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
