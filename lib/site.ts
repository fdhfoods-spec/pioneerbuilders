import { company } from "@/content/company";

/**
 * Canonical origin. Falls back to localhost ONLY so that metadata, sitemap and
 * robots can be built before the final domain is confirmed. `hasConfirmedUrl`
 * gates canonical URLs and structured-data URLs so a fake domain never ships.
 */
export const siteUrl = (company.siteUrl ?? "http://localhost:3000").replace(/\/$/, "");
export const hasConfirmedUrl = Boolean(company.siteUrl);

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
