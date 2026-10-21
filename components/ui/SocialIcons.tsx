interface SocialIconProps {
  className?: string;
}

/**
 * Vibrant Instagram Icon featuring authentic multi-stop gradient (amber, coral, magenta, purple, blue)
 * and clean white camera glyph.
 */
export function InstagramIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pb-ig-radial" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="url(#pb-ig-radial)" />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="17.5" cy="6.5" r="1.1" fill="#ffffff" />
    </svg>
  );
}

/**
 * Vibrant YouTube Icon with official red badge and white play triangle.
 */
export function YouTubeIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <polygon points="9.75,15.02 15.75,12 9.75,8.98" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Vibrant WhatsApp Icon with official green badge and white receiver.
 */
export function WhatsAppIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10.5" fill="#25D366" />
      <path
        d="M16.8 14.2c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8 1-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.87-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.16 1.59.1.48-.07 1.48-.6 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * Vibrant Email Icon with warm golden envelope badge.
 */
export function EmailIcon({ className = "size-5" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="15" x="2" y="4.5" rx="3" fill="#D4AF37" />
      <path
        d="M2.5 5.5L12 12.5L21.5 5.5"
        fill="none"
        stroke="#111311"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

