import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error("Cloudinary 환경 변수가 설정되지 않았습니다.");
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string
) => {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error("파일 크기는 10MB를 초과할 수 없습니다.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${folder}`,
        quality: "auto",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error) {
          // 용량 초과 에러(Account usage limit reached 등)인지 확인
          if (error.message?.includes("limit") || error.http_code === 400) {
            console.error("Cloudinary 용량 초과 발생:", error.message);
            return reject(new Error("이미지 서버의 저장 공간이 부족합니다."));
          }

          return reject(error);
        }
        resolve(result);
      }
    );

    // 파일 버퍼가 비어있는지 확인하는 방어 코드
    if (!file.buffer) {
      return reject(new Error("파일 데이터가 유효하지 않습니다."));
    }

    uploadStream.end(file.buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
