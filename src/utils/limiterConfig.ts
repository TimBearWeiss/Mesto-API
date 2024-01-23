const rateLimit = require("express-rate-limit");
// limiter конфиг
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов с одного IP
});
