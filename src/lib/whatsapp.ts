export const SST_WHATSAPP_NUMBER = "917977954302";
export const SST_PHONE_DISPLAY = "+91 79 7795 4302";
export const SST_PHONE_CALL_LINK = "tel:+917977954302";
export const SST_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/RgC4ZUFohx93mFne8";

export function getWhatsAppBookingUrl(params?: {
  serviceName?: string;
  price?: string;
  location?: string;
  customMessage?: string;
}): string {
  if (params?.customMessage) {
    return `https://wa.me/${SST_WHATSAPP_NUMBER}?text=${encodeURIComponent(params.customMessage)}`;
  }

  let text = "Hello SST CARE, I want to enquire about ";
  if (params?.serviceName) {
    text += `${params.serviceName}.`;
  } else {
    text += "electronics repair services.";
  }

  if (params?.serviceName) {
    text += `\n\nService: ${params.serviceName}`;
  }

  if (params?.price && params.price !== 'Contact for Pricing') {
    text += `\nPrice: ${params.price}`;
  }

  if (params?.location) {
    text += `\nLocation: ${params.location}`;
  } else {
    text += `\nLocation: Mumbai`;
  }

  text += `\n\nPlease share the visit details and technician availability.`;

  return `https://wa.me/${SST_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
