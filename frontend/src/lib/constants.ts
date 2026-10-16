export const COMPANY_NAME = "Vedansh Software Services";
export const COMPANY_PHONE_DISPLAY = "+91 91724 76575";
export const COMPANY_PHONE_TEL = "+919172476575";
export const COMPANY_PHONE_RAW = "9172476575";
export const COMPANY_EMAIL = "vedanshsoft@gmail.com";
export const WHATSAPP_NUMBER = "919172476575";

export const COMPANY_ADDRESS_LINE1 = "Plot No 106, Mangalmurti Colony";
export const COMPANY_ADDRESS_LINE2 = "Near ITI College, Wanadongri";
export const COMPANY_ADDRESS_CITY = "Nagpur";
export const COMPANY_ADDRESS_STATE = "Maharashtra";
export const COMPANY_ADDRESS_POSTAL_CODE = "441110";
export const COMPANY_ADDRESS_COUNTRY = "India";
export const COMPANY_ADDRESS_FULL = `${COMPANY_ADDRESS_LINE1}, ${COMPANY_ADDRESS_LINE2}, ${COMPANY_ADDRESS_CITY}, ${COMPANY_ADDRESS_STATE} - ${COMPANY_ADDRESS_POSTAL_CODE}, ${COMPANY_ADDRESS_COUNTRY}`;
export const COMPANY_ADDRESS_MAPS_QUERY = encodeURIComponent(COMPANY_ADDRESS_FULL);

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
