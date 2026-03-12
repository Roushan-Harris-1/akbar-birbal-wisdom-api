import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Story } from "../backend";
import { useActor } from "../hooks/useActor";

export function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    wisdom: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20",
    humour:
      "bg-green-500/10 text-green-600 dark:text-green-400 ring-green-500/20",
    justice:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20",
    cleverness:
      "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-500/20",
    "royal-court":
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
  };
  const cls = colors[category] ?? "bg-muted text-muted-foreground ring-border";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1 ${cls}`}
    >
      {category}
    </span>
  );
}

export default function Hero() {
  const { actor } = useActor();
  const [heroStory, setHeroStory] = useState<Story | null>(null);

  useEffect(() => {
    if (!actor) return;
    actor.getRandomStory().then((res) => {
      if (res.length > 0) setHeroStory(res[0] as Story);
    });
  }, [actor]);

  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-24"
    >
      <div className="absolute inset-0 bg-pattern-grid opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,oklch(0.76_0.17_60/0.12),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-primary/10 ring-1 ring-primary/30 text-primary text-xs font-code font-medium">
          <Sparkles className="h-3 w-3" />
          Free JSON API &middot; No Auth Required
        </div>

        {/* Hero Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-110" />
            <img
              src="/assets/uploads/Akbar_Birbal-1.png"
              alt="Akbar and Birbal"
              className="relative rounded-2xl ring-2 ring-primary/40 shadow-gold w-48 h-48 object-cover"
            />
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          <span className="text-gradient-gold">Akbar-Birbal</span>
          <br />
          <span className="text-foreground">Wisdom API</span>
        </h1>

        <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A free, open JSON API delivering the timeless wisdom and wit of Birbal
          — the legendary advisor to Emperor Akbar.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-gold"
            onClick={() =>
              document
                .getElementById("demo")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.primary_button"
          >
            Try the API
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 hover:bg-primary/5"
            onClick={() =>
              document
                .getElementById("docs")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-ocid="hero.secondary_button"
          >
            View Docs
          </Button>
        </div>

        {heroStory && (
          <div className="ornate-border relative max-w-2xl mx-auto rounded-xl bg-card p-6 text-left animate-fade-in shadow-gold">
            <div className="absolute -top-3 left-6 px-2 bg-card text-xs font-code text-primary">
              GET /Akbar-Birbal-API/random
            </div>
            <p className="font-body text-base text-card-foreground leading-relaxed mb-4">
              &ldquo;{heroStory.value}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              {heroStory.categories.map((cat) => (
                <CategoryBadge key={cat} category={cat} />
              ))}
            </div>
          </div>
        )}

        <a
          href="#demo"
          className="inline-flex flex-col items-center gap-1 mt-12 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-code">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
