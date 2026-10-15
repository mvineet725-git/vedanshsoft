export const COMPANY_NAME = "Vedansh Software Services";
export const COMPANY_PHONE_DISPLAY = "+91 91724 76575";
export const COMPANY_PHONE_TEL = "+919172476575";
export const COMPANY_PHONE_RAW = "9172476575";
export const COMPANY_EMAIL = "vedanshsoft@gmail.com";
export const WHATSAPP_NUMBER = "919172476575";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
