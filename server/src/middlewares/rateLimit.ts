import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    code: 429,
    message: "Too many requests!",
  },
});

export default rateLimiter;
