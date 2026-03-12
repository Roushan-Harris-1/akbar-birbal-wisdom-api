import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BASE_URL = "https://your-canister.ic0.app";

interface Endpoint {
  method: string;
  path: string;
  description: string;
  curl: string;
  fetchCode: string;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    method: "GET",
    path: "/Akbar-Birbal-API/random",
    description:
      "Returns a single random Akbar-Birbal story from the full collection.",
    curl: `curl -s "${BASE_URL}/Akbar-Birbal-API/random"`,
    fetchCode: `const res = await fetch("${BASE_URL}/Akbar-Birbal-API/random");
const story = await res.json();`,
    response: `{
  "id": "birbal-ab-001",
  "value": "Emperor Akbar once challenged Birbal to draw a line shorter without erasing it...",
  "categories": ["wisdom", "cleverness"],
  "url": "${BASE_URL}/Akbar-Birbal-API/jokes/birbal-ab-001"
}`,
  },
  {
    method: "GET",
    path: "/Akbar-Birbal-API/categories",
    description: "Returns an array of all available story category strings.",
    curl: `curl -s "${BASE_URL}/Akbar-Birbal-API/categories"`,
    fetchCode: `const res = await fetch("${BASE_URL}/Akbar-Birbal-API/categories");
const categories = await res.json();`,
    response: `["wisdom", "humour", "justice", "cleverness", "royal-court"]`,
  },
  {
    method: "GET",
    path: "/Akbar-Birbal-API/random/{category}",
    description: "Returns a random story filtered by the given category name.",
    curl: `curl -s "${BASE_URL}/Akbar-Birbal-API/random/wisdom"`,
    fetchCode: `const res = await fetch("${BASE_URL}/Akbar-Birbal-API/random/wisdom");
const story = await res.json();`,
    response: `{
  "id": "birbal-ab-005",
  "value": "Birbal once told the king: 'The wisest man is the one who knows what he does not know.'",
  "categories": ["wisdom"],
  "url": "${BASE_URL}/Akbar-Birbal-API/jokes/birbal-ab-005"
}`,
  },
  {
    method: "GET",
    path: "/Akbar-Birbal-API/search?q={term}",
    description:
      "Full-text search across all story values. Returns an array of matching stories.",
    curl: `curl -s "${BASE_URL}/Akbar-Birbal-API/search?q=justice"`,
    fetchCode: `const res = await fetch("${BASE_URL}/Akbar-Birbal-API/search?q=justice");
const results = await res.json();`,
    response: `[
  {
    "id": "birbal-ab-022",
    "value": "Birbal's sense of justice was legendary in Akbar's court...",
    "categories": ["justice"],
    "url": "${BASE_URL}/Akbar-Birbal-API/jokes/birbal-ab-022"
  }
]`,
  },
];

const gettingStartedSteps = [
  {
    key: "auth",
    text: "No authentication needed — all endpoints are public and free.",
  },
  { key: "base", text: `Base URL: ${BASE_URL}` },
  {
    key: "content",
    text: "All responses return Content-Type: application/json.",
  },
  {
    key: "host",
    text: "The API is hosted on the Internet Computer — decentralized and always on.",
  },
];

function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden ring-1 ring-border mb-3">
      {label && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-muted border-b border-border">
          <span className="text-xs font-code text-muted-foreground">
            {label}
          </span>
          <button
            type="button"
            onClick={copy}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}
      <pre className="p-4 text-xs font-code leading-relaxed overflow-x-auto bg-[oklch(0.09_0.02_255)] text-[oklch(0.92_0.012_85)] whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

export default function ApiDocs() {
  return (
    <section id="docs" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            API <span className="text-gradient-gold">Documentation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simple REST-style endpoints to integrate Birbal&apos;s wisdom into
            your applications.
          </p>
        </div>

        <div className="ornate-border rounded-xl bg-card p-6 mb-10">
          <h3 className="font-display text-lg font-semibold mb-4">
            Getting Started
          </h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            {gettingStartedSteps.map((step, i) => (
              <li key={step.key} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <h3 className="font-display text-xl font-semibold mb-6">
          Endpoint Reference
        </h3>
        <div className="space-y-8">
          {endpoints.map((ep) => (
            <div
              key={ep.path}
              className="rounded-xl bg-card border border-border overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-border bg-muted/50">
                <span className="px-2.5 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/30 text-xs font-code font-bold">
                  {ep.method}
                </span>
                <code className="font-code text-sm text-primary">
                  {ep.path}
                </code>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {ep.description}
                </p>
                <CodeBlock code={ep.curl} label="cURL" />
                <CodeBlock code={ep.fetchCode} label="JavaScript (fetch)" />
                <CodeBlock code={ep.response} label="Example Response" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
