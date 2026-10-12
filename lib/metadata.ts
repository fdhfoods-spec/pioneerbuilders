import type { Metadata } from "next";
import { company } from "@/content/company";
import { absoluteUrl, hasConfirmedUrl } from "./site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/** Builds consistent per-page metadata. Canonical is only emitted once the real domain is known. */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    ...(hasConfirmedUrl ? { alternates: { canonical: absoluteUrl(path) } } : {}),
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      siteName: company.name,
      type: "website",
      locale: "en_IN",
      ...(hasConfirmedUrl ? { url: absoluteUrl(path) } : {}),
    },
    twitter: { card: "summary", title: `${title} | ${company.name}`, description },
  };
}
