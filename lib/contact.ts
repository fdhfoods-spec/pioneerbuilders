import { company } from "@/content/company";

const digits = (v: string) => v.replace(/[^\d+]/g, "");

export const hasEmail = Boolean(company.contact.email);
export const hasPhone = Boolean(company.contact.phone);
export const hasWhatsapp = Boolean(company.contact.whatsapp);

export const mailHref = (subject?: string, body?: string) => {
  if (!company.contact.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString();
  return `mailto:${company.contact.email}${q ? `?${q.replace(/\+/g, "%20")}` : ""}`;
};

export const telHref = () => (company.contact.phone ? `tel:${digits(company.contact.phone)}` : null);

export const whatsappHref = (message?: string) => {
  if (!company.contact.whatsapp) return null;
  const number = company.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
};
