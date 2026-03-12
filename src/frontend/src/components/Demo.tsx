import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Loader2, Search, Shuffle, Tag } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Story } from "../backend";
import { useActor } from "../hooks/useActor";
import { CategoryBadge } from "./Hero";

const CATEGORIES = ["wisdom", "humour", "justice", "cleverness", "royal-court"];
type Mode = "random" | "category" | "search";

function syntaxHighlightJSON(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        if (/^"/u.test(match)) {
          if (/:$/u.test(match))
            return `<span class="json-key">${match}</span>`;
          return `<span class="json-string">${match}</span>`;
        }
        if (/true|false/u.test(match))
          return `<span class="json-bool">${match}</span>`;
        if (/null/u.test(match))
          return `<span class="json-null">${match}</span>`;
        return `<span class="json-number">${match}</span>`;
      },
    );
}

function StoryCard({ story }: { story: Story }) {
  const [copiedStory, setCopiedStory] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);
  const jsonStr = JSON.stringify(story, null, 2);

  const copyStory = async () => {
    await navigator.clipboard.writeText(story.value);
    setCopiedStory(true);
    toast.success("Story copied!");
    setTimeout(() => setCopiedStory(false), 2000);
  };

  const copyJSON = async () => {
    await navigator.clipboard.writeText(jsonStr);
    setCopiedJSON(true);
    toast.success("JSON copied!");
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  return (
    <div data-ocid="demo.story_card" className="space-y-4 animate-fade-in">
      <div className="ornate-border rounded-xl bg-card p-5 space-y-4">
        <p className="font-body text-base text-card-foreground leading-relaxed">
          &ldquo;{story.value}&rdquo;
        </p>
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {story.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
          <span className="font-code text-xs text-muted-foreground">
            {story.id}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={copyStory}
            data-ocid="demo.copy_story_button"
            className="gap-1.5 text-xs"
          >
            {copiedStory ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            Copy Story
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={copyJSON}
            data-ocid="demo.copy_json_button"
            className="gap-1.5 text-xs"
          >
            {copiedJSON ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            Copy JSON
          </Button>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden ring-1 ring-border">
        <div className="flex items-center justify-between px-4 py-2 bg-[oklch(0.09_0.02_255)] border-b border-[oklch(0.26_0.032_255)]">
          <span className="text-xs font-code text-[oklch(0.62_0.02_255)]">
            Response JSON
          </span>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
        </div>
        <pre
          className="p-4 text-xs font-code leading-relaxed overflow-x-auto bg-[oklch(0.09_0.02_255)] text-[oklch(0.92_0.012_85)]"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: syntax highlighting
          dangerouslySetInnerHTML={{ __html: syntaxHighlightJSON(jsonStr) }}
        />
      </div>
    </div>
  );
}

function StoryList({ stories }: { stories: Story[] }) {
  return (
    <div className="space-y-3">
      {stories.slice(0, 10).map((story, i) => (
        <div
          key={story.id}
          data-ocid="demo.story_card"
          className="rounded-lg bg-card border border-border p-4 animate-fade-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <p className="text-sm text-card-foreground leading-relaxed mb-2">
            &ldquo;{story.value}&rdquo;
          </p>
          <div className="flex flex-wrap gap-1.5">
            {story.categories.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Demo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<Mode>("random");
  const [category, setCategory] = useState("wisdom");
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<Story | Story[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      if (mode === "random") {
        await queryClient.invalidateQueries({ queryKey: ["randomStory"] });
        const res = await actor.getRandomStory();
        setResult(res.length > 0 ? (res[0] as Story) : null);
      } else if (mode === "category") {
        const res = await actor.getRandomStoryByCategory(category);
        setResult(res.length > 0 ? (res[0] as Story) : null);
      } else {
        const res = await actor.searchStories(searchQuery);
        setResult(res);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [actor, mode, category, searchQuery, queryClient]);

  const modeButtons: { id: Mode; label: string; icon: React.ReactNode }[] = [
    {
      id: "random",
      label: "Random Story",
      icon: <Shuffle className="h-3.5 w-3.5" />,
    },
    {
      id: "category",
      label: "By Category",
      icon: <Tag className="h-3.5 w-3.5" />,
    },
    { id: "search", label: "Search", icon: <Search className="h-3.5 w-3.5" /> },
  ];

  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Interactive <span className="text-gradient-gold">API Demo</span>
          </h2>
          <p className="text-muted-foreground">
            Try the API right here — no setup required.
          </p>
        </div>

        <div className="flex gap-2 mb-6 p-1 rounded-lg bg-muted w-fit mx-auto">
          {modeButtons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => {
                setMode(btn.id);
                setResult(null);
                setError(null);
              }}
              data-ocid={btn.id === "random" ? "demo.random_button" : undefined}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === btn.id
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {mode === "category" && (
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                data-ocid="demo.category_select"
                className="flex-1"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {mode === "search" && (
            <Input
              placeholder="Search stories… e.g. justice, merchant, crow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              data-ocid="demo.search_input"
              className="flex-1"
            />
          )}
          <Button
            onClick={run}
            disabled={loading || !actor}
            data-ocid={mode === "search" ? "demo.search_button" : undefined}
            className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[120px]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {mode === "random" && <Shuffle className="h-4 w-4 mr-1.5" />}
                {mode === "category" && <Tag className="h-4 w-4 mr-1.5" />}
                {mode === "search" && <Search className="h-4 w-4 mr-1.5" />}
                {mode === "random"
                  ? "Generate"
                  : mode === "search"
                    ? "Search"
                    : "Fetch"}
              </>
            )}
          </Button>
        </div>

        {loading && (
          <div
            data-ocid="demo.loading_state"
            className="flex justify-center py-12"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="font-code text-sm">Fetching from backend…</span>
            </div>
          </div>
        )}

        {error && (
          <div
            data-ocid="demo.error_state"
            className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive font-code"
          >
            Error: {error}
          </div>
        )}

        {!loading &&
          !error &&
          result &&
          (Array.isArray(result) ? (
            result.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground font-code text-sm">
                No stories found for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              <StoryList stories={result} />
            )
          ) : (
            <StoryCard story={result} />
          ))}

        {!loading && !error && !result && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-code text-sm opacity-60">
              Press the button above to fetch a story from the canister.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
