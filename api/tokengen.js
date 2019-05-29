const jwt = require("jsonwebtoken");
const CUBE_API_SECRET = process.env["CUBE_API_SECRET"];

const cubejsToken = jwt.sign({ u: { id: 42 } }, CUBE_API_SECRET, {});

console.log(cubejsToken);
