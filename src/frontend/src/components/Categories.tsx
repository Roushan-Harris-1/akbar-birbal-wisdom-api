interface CategoryInfo {
  id: string;
  emoji: string;
  name: string;
  description: string;
  color: string;
}

const categories: CategoryInfo[] = [
  {
    id: "wisdom",
    emoji: "🦉",
    name: "Wisdom",
    description:
      "Timeless philosophical insights and life lessons delivered through Birbal's sage counsel.",
    color:
      "from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40",
  },
  {
    id: "humour",
    emoji: "😄",
    name: "Humour",
    description:
      "Clever jokes and witty repartees that kept Akbar's royal court in stitches.",
    color:
      "from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-500/40",
  },
  {
    id: "justice",
    emoji: "⚖️",
    name: "Justice",
    description:
      "Tales of Birbal's legendary fairness in resolving disputes and delivering verdicts.",
    color:
      "from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40",
  },
  {
    id: "cleverness",
    emoji: "🧩",
    name: "Cleverness",
    description:
      "Stories showcasing Birbal's unmatched wit in outwitting rivals and solving impossible riddles.",
    color:
      "from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-500/40",
  },
  {
    id: "royal-court",
    emoji: "👑",
    name: "Royal Court",
    description:
      "Tales from Emperor Akbar's magnificent Mughal court and the intrigues of courtly life.",
    color:
      "from-rose-500/10 to-rose-600/5 border-rose-500/20 hover:border-rose-500/40",
  },
];

export default function Categories() {
  const handleTry = (categoryId: string) => {
    const demo = document.getElementById("demo");
    if (demo) demo.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(
      new CustomEvent("select-category", { detail: categoryId }),
    );
  };

  return (
    <section id="categories" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Story <span className="text-gradient-gold">Categories</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore 50+ authentic Akbar-Birbal tales across five thematic
            categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              data-ocid={`category.item.${i + 1}`}
              className={`relative rounded-xl border bg-gradient-to-br p-6 transition-all duration-200 ${cat.color}`}
            >
              <div className="text-3xl mb-3">{cat.emoji}</div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {cat.description}
              </p>
              <button
                type="button"
                onClick={() => handleTry(cat.id)}
                data-ocid={`category.try_button.${i + 1}`}
                className="text-xs font-code font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Try it →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
