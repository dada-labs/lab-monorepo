import { ContactResponse } from "@shared";
import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const mailService = {
  // 관리자에게 알림 메일
  async sendAdminNotification(contactData: ContactResponse) {
    const mailOptions = {
      from: `"시스템 알림" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `[DadaLab | 문의 접수] ${contactData.title}`,
      html: `
      <div style="background-color: #f4f7f9; padding: 40px 20px; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e1e4e8;">
          
         <div style="padding: 32px 40px 10px; text-align: center;">
            <div style="display: inline-block; background-color: #222222; color: #ffffff; font-size: 10px; font-weight: bold; padding: 2px 8px; border-radius: 4px; margin-bottom: 12px; letter-spacing: 1px;">
              ADMIN NOTIFICATION
            </div>
            <h2 style="color: #1a1a1a; font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">
              새로운 문의가 접수되었습니다.
            </h2>
          </div>

          <!-- 본문 영역 -->
          <div style="padding: 20px 40px 40px;">
            
            <!-- 상세 정보 테이블 -->
            <div style="background-color: #ffffff; border: 1px solid #eeeeee; border-radius: 8px; margin-bottom: 24px; overflow: hidden;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 14px 16px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; color: #666666; width: 80px; font-weight: bold;">문의자</td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #eeeeee; color: #222222;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; background-color: #fafafa; border-bottom: 1px solid #eeeeee; color: #666666; font-weight: bold;">제목</td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #eeeeee; color: #222222; font-weight: bold;">${contactData.title}</td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; background-color: #fafafa; color: #666666; vertical-align: top; font-weight: bold;">내용</td>
                  <td style="padding: 14px 16px; color: #444444; line-height: 1.8;">
                    <div style="white-space: pre-wrap;">${contactData.content}</div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- 관리자 액션 버튼 -->
            <div style="text-align: center; margin: 32px 0 10px;">
              <a href="${process.env.CLIENT_ADMIN_URL}" 
                style="display: inline-block; background-color: #222222; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                관리자 페이지에서 확인하기
              </a>
            </div>
          </div>

          <!-- 푸터 영역 -->
          <div style="background-color: #fcfcfc; padding: 24px 40px; border-top: 1px solid #eeeeee; text-align: center;">
            <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
              본 메일은 시스템 자동 발신 메시지입니다.
            </p>
          </div>
        </div>
      </div>
    `,
    };
    return await mailTransporter.sendMail(mailOptions);
  },

  // 작성자에게 안내 메일
  async sendCustomerConfirmation(contactData: ContactResponse) {
    const mailOptions = {
      from: `"고객센터" <${process.env.MAIL_USER}>`,
      to: contactData.email,
      subject: `Dada Lab 프로젝트 문의가 정상적으로 접수되었습니다.`,
      html: `
      <div style="background-color: #f8f9fa; padding: 40px 20px; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eeeeee;">
          
          <div style="padding: 32px 40px 20px; text-align: center;">
            <img src="https://lab-monorepo-web.vercel.app/images/logo.png" alt="Logo" style="height: 38px; margin-bottom: 20px; display: inline-block;">
          </div>

          <div style="padding: 0 40px 40px;">
            <h2 style="color: #1a1a1a; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 16px; letter-spacing: -0.5px;">
              프로젝트 문의가 정상적으로 접수되었습니다.
            </h2>
            
            <p style="color: #444444; font-size: 15px; margin-bottom: 24px;">
              안녕하세요, <strong>${contactData.name}</strong>님.<br />
              보내주신 소중한 문의사항이 정상적으로 접수되었습니다.<br />
              담당자가 검토 후 빠른 시일 내에 답변을 드리도록 하겠습니다.
            </p>

            <div style="background-color: #f9f9fb; border-radius: 8px; padding: 24px; border: 1px solid #f0f0f2; margin-bottom: 32px;">
              <div style="margin-bottom: 12px; border-bottom: 1px solid #ededf0; padding-bottom: 12px;">
                <span style="color: #888888; font-size: 13px; display: block; margin-bottom: 4px;">문의 제목</span>
                <span style="color: #222222; font-size: 16px; font-weight: 600;">${contactData.title}</span>
              </div>
              <div>
                <span style="color: #888888; font-size: 13px; display: block; margin-bottom: 4px;">진행 상태</span>
                <span style="display: inline-block; background-color: #f1f3f5; color: #aaacae; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; border: 1px solid #e9ecef;">
                  검토 대기
                </span>
              </div>
            </div>

            <p style="color: #444444; font-size: 15px; margin-bottom: 8px;">감사합니다 :)</p>
            <p style="color: #1a1a1a; font-weight: 700; font-size: 15px; margin: 0;">다다랩 운영자 드림</p>
          </div>

          <!-- 푸터 영역 -->
          <div style="background-color: #fafafa; padding: 30px 40px; border-top: 1px solid #eeeeee; text-align: center;">
            <div style="margin-bottom: 16px;">
              <!-- SNS나 홈페이지 링크가 있다면 추가하세요 -->
              <a href="https://lab-monorepo-web.vercel.app/" style="color: #aaaaaa; text-decoration: none; font-size: 12px; margin: 0 10px;">다다랩 바로가기</a>
            </div>
            <p style="color: #bbbbbb; font-size: 12px; margin: 0;">
              이 링크는 문의 접수 확인을 위해 발신 전용 안내 메일입니다.<br />
              &copy; DadaLab. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `,
    };
    return await mailTransporter.sendMail(mailOptions);
  },
};
