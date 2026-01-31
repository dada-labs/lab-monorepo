import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === "production";

// 허용할 도메인 목록
const allowedOrigins = [
  process.env.CLIENT_WEB_URL,
  process.env.CLIENT_ADMIN_URL,
  !isProd && "http://localhost:4000", // API 테스트용
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`[CORS Error] Origin: ${origin} is not allowed.`);
        callback(new Error("CORS 설정 확인이 필요합니다."));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // req.cookies 사용

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

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
