import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Demo", href: "#demo" },
  { label: "Docs", href: "#docs" },
  { label: "Categories", href: "#categories" },
];

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#home" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md overflow-hidden ring-1 ring-primary/30">
            <img
              src="/assets/uploads/Akbar_Birbal-1.png"
              alt="Akbar Birbal"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-display font-semibold text-sm text-foreground hidden sm:block">
            Akbar-Birbal <span className="text-primary">Wisdom API</span>
          </span>
        </a>

        <nav className="flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              data-ocid={`nav.link.${i + 1}`}
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            data-ocid="theme.toggle"
            className="ml-2 h-8 w-8 rounded-md"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-primary" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
