export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Projects", href: "/projects/" },
  { label: "Contact", href: "/contact/" },
];

/** One label per intent: this is the single "enquire" call to action used site-wide. */
export const enquiryCta: NavItem = { label: "Send an Enquiry", href: "/contact/" };
