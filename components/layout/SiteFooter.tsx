import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { company } from "@/content/company";
import { mainNav } from "@/content/navigation";
import { services } from "@/content/services";
import { hasEmail, mailHref } from "@/lib/contact";

const linkCls = "text-warm/70 transition-colors hover:text-gold";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const mail = mailHref();

  return (
    <footer className="border-t border-warm/10 bg-charcoal-2 text-warm">
      <div className="container-x grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" aria-label="Pioneer Builders, home" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-warm/65">
            {company.descriptor} company, founded in Coimbatore ({company.established}), with ~25 years in Chennai and present operations in Bangalore.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-cherry/40 bg-cherry/15 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-cherry-accent">
              <span className="size-1.5 rounded-full bg-cherry" aria-hidden />
              Est. {company.established} (Coimbatore)
            </span>
            <span className="inline-flex items-center gap-1.5 border border-[#44d62c]/40 bg-[#44d62c]/10 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-[#44d62c]">
              <span className="size-1.5 rounded-full bg-[#44d62c]" aria-hidden />
              Present Base: Bangalore
            </span>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <h2 className="eyebrow mb-5 font-sans text-gold">Navigate</h2>
          <ul className="space-y-3 text-sm">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={linkCls}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Service categories" className="md:col-span-3">
          <h2 className="eyebrow mb-5 font-sans text-gold">Services</h2>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/#${s.slug}`} className={linkCls}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 text-sm md:col-span-3">
          <div>
            <h2 className="eyebrow mb-5 font-sans text-gold">{company.registeredOffice.label}</h2>
            <address className="not-italic leading-relaxed text-warm/70">
              {company.registeredOffice.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div>
            <h2 className="eyebrow mb-4 font-sans text-gold">{company.adminOffice.label}</h2>
            <p className="text-concrete">{company.adminOffice.lines.join(", ")}</p>
          </div>
          <div>
            <h2 className="eyebrow mb-4 font-sans text-gold">Connect</h2>
            <ul className="space-y-2.5 text-warm/75">
              <li>
                {hasEmail && mail ? (
                  <a href={mail} className={linkCls}>
                    {company.contact.email}
                  </a>
                ) : (
                  <span className="text-concrete">Email to be added</span>
                )}
              </li>
              <li>
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={company.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-warm/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-warm/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <span>Privacy policy</span>
            <PlaceholderTag>To be added</PlaceholderTag>
          </p>
        </div>
      </div>
    </footer>
  );
}
