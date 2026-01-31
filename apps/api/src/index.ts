import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(cookieParser()); // req.cookies 사용

app.use("/api/auth", authRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res
      .status(400)
      .send({ status: 400, message: "잘못된 JSON 형식입니다." });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`# Server listening on port: ${PORT} !!!!!!!!!!!!!!!!!!!!!!!`);
});
