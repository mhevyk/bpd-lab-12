if (process.env.INSTALLATION_PROCESS !== "processing") {
  return console.error(
    "Cannot run server without verification. Run verifySignature.js instead"
  );
}

const express = require("express");
const db = require("./database/db.js");
const authRouter = require("./routers/authRouter.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const cors = require("cors");

const PORT = Number(process.env.PORT) || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/auth", authRouter);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`Server started on http://localhost:${PORT}/`);
  } catch (error) {
    console.error(error);
  }
});
