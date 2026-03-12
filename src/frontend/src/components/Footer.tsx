import { Github, Globe, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="border-t border-border bg-card py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display text-base font-semibold text-foreground mb-1">
              Akbar-Birbal Wisdom API
            </p>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <Heart className="inline h-3.5 w-3.5 text-rose-500 fill-rose-500" />{" "}
              by{" "}
              <span className="text-foreground font-medium">
                Roushan Harris Ahmed
              </span>
            </p>
          </div>
          {/* About section with creator photo */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/uploads/My-Image-1.jpeg"
              alt="Roushan Harris Ahmed"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/40 shadow-sm"
            />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground">
                Roushan Harris Ahmed
              </p>
              <p>Creator &amp; Developer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-secondary transition-colors text-xs font-code text-muted-foreground hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="#docs"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-secondary transition-colors text-xs font-code text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-3.5 w-3.5" />
              API Docs
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            &copy; {year} Akbar-Birbal Wisdom API. All rights reserved.
          </span>
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
