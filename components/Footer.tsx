export default function Footer() {
  const socials = [
    {
      label: "TikTok",
      href: "https://tiktok.com/@brubaworld",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.81a8.18 8.18 0 004.78 1.52V6.89a4.85 4.85 0 01-1.01-.2z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/brubaworld",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      label: "Linktree",
      href: "https://linktr.ee/brgm_bruba",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.953 15.066c-.08.163-.08.324 0 .486l2.54 4.402c.081.162.243.243.405.243h2.215c.162 0 .324-.081.405-.243l2.54-4.402c.08-.162.08-.324 0-.486l-2.54-4.402a.472.472 0 00-.405-.243h-2.215a.472.472 0 00-.405.243l-2.54 4.402zM12 2.1C6.48 2.1 2 6.58 2 12.1s4.48 10 10 10 10-4.48 10-10S17.52 2.1 12 2.1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-preto py-16 px-5 md:px-10 border-t border-offwhite/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#"
            className="font-syne font-extrabold text-2xl text-offwhite hover:text-manteiga transition-colors"
          >
            bruba<span className="text-rosa">world</span>
          </a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-offwhite/5 text-offwhite/50 hover:bg-rosa hover:text-white transition-all duration-200"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-jakarta font-light text-offwhite/30 text-sm text-center">
            © {new Date().getFullYear()} brubaworld. Todos os direitos
            reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
