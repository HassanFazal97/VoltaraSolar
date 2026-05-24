// TODO: replace with Voltara's real WhatsApp number before launch.
export const WHATSAPP_PHONE = "923001234567";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Voltara! I'd like to learn more about a solar installation for my home.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;
