const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://minivalist.cinn.app/api"
    : "http://localhost:4000/cubejs-api/v1";

export default {
  cubejs: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo0Mn0sImlhdCI6MTU1OTE1MDExNH0.yyimxB4_fZPmyT0eEXMyHdyZoJhL8qPKifBJvEhmSP0",
    apiUrl
  }
};
