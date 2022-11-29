export default {
  ACCESS_TOKEN_SECRET:
    "7ed0a2e2ed55ae003f5da3a2dea83db50d48c25904098cbeb1c38373eea2b991f961b17e7bc8ff609f7e575750a360e0f0106edd950e48a76052cf1174616c73",
  tokenHead: process.env.TOKEN_HEADER_KEY,
  DB: {
    URI: process.env.MONGO_URI,
  },
  expires_in: 3600 * 24,
  issuer: "nepcodex.com",
  audience: "nepcodex.com",
  salt_rounds: 12,
  REFRESH_TOKEN_SECRET:
    "2d300e7bd0a5583c8d91b9db6f0e2451d278e35f31b4b014b18322c18fc1f4a54ec2692535702c6b22c0609a5d2b56dadafbc00b093cc743d8294f9d4bdd2730",
};
