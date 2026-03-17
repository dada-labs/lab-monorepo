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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #222222;">새로운 문의가 접수되었습니다.</h2>
        <p><b>제목:</b> ${contactData.title}</p>
        <p><b>내용:</b></p>
        <div style="border:1px solid #ddd; padding:10px;">${contactData.content}</div>
        <div style="text-align: center; margin: 40px 0 60px;">
          <a href="${process.env.CLIENT_ADMIN_URL}" 
             style="display: inline-block; background-color: #222222; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            관리자 페이지에서 확인하기
          </a>
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
        <h2 style="color: #222222;">${contactData.name}님의 프로젝트 문의 접수 안내</h2>
        <p>안녕하세요, ${contactData.name}님.</p>
        <p>보내주신 소중한 문의가 정상적으로 접수되었습니다.</p>
        <div style=" border-top: 1px solid #eee; padding-top:20px; margin: 20px 0 20px;">
          <p><b>문의 제목:</b> "${contactData.title}"</p>
          <p>내용을 검토 후 빠른 시일 내에 답변 드리도록 하겠습니다.</p>
        </div>
        <p>감사합니다 :)</p>
        <p style="color: #888; font-size: 12px;">이 링크는 문의 접수 확인을 위해 발신 전용 안내 메일입니다.</p>
      </div>
    `,
    };
    return await mailTransporter.sendMail(mailOptions);
  },
};
