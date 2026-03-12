import { Actor, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

// ---- Types ----

export type Story = {
  id: string;
  categories: string[];
  value: string;
  url: string;
};

export interface backendInterface {
  getRandomStory(): Promise<[] | [Story]>;
  getCategories(): Promise<string[]>;
  getRandomStoryByCategory(category: string): Promise<[] | [Story]>;
  searchStories(searchTerm: string): Promise<Story[]>;
}

export type CreateActorOptions = {
  agentOptions?: Record<string, unknown>;
  agent?: HttpAgent;
  processError?: (e: unknown) => never;
};

// ---- ExternalBlob ----

export class ExternalBlob {
  private _bytes?: Uint8Array;
  private _url?: string;
  onProgress?: (progress: number) => void;

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const res = await fetch(this._url);
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    }
    throw new Error("ExternalBlob has no data");
  }

  static fromURL(url: string): ExternalBlob {
    const blob = new ExternalBlob();
    blob._url = url;
    return blob;
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    const blob = new ExternalBlob();
    blob._bytes = bytes;
    return blob;
  }
}

// ---- IDL Factory ----

const StoryType = IDL.Record({
  id: IDL.Text,
  categories: IDL.Vec(IDL.Text),
  value: IDL.Text,
  url: IDL.Text,
});

const idlFactory: IDL.InterfaceFactory = ({ IDL: I }) => {
  const Story = I.Record({
    id: I.Text,
    categories: I.Vec(I.Text),
    value: I.Text,
    url: I.Text,
  });
  return I.Service({
    getRandomStory: I.Func([], [I.Opt(Story)], []),
    getCategories: I.Func([], [I.Vec(I.Text)], ["query"]),
    getRandomStoryByCategory: I.Func([I.Text], [I.Opt(Story)], []),
    searchStories: I.Func([I.Text], [I.Vec(Story)], ["query"]),
  });
};

// ---- createActor ----

export async function createActor(
  canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): Promise<backendInterface> {
  const agent =
    options?.agent ??
    new HttpAgent({
      ...(options?.agentOptions ?? {}),
    });

  const actor = Actor.createActor<backendInterface>(idlFactory, {
    agent,
    canisterId,
  });

  // Wrap with processError if provided
  if (options?.processError) {
    const processError = options.processError;
    const handler: ProxyHandler<object> = {
      get(target, prop) {
        const val = (target as Record<string | symbol, unknown>)[prop];
        if (typeof val === "function") {
          return async (...args: unknown[]) => {
            try {
              return await (val as (...a: unknown[]) => Promise<unknown>)(
                ...args,
              );
            } catch (e) {
              processError(e);
            }
          };
        }
        return val;
      },
    };
    return new Proxy(actor, handler) as backendInterface;
  }

  return actor as unknown as backendInterface;
}

// suppress unused import warning
void StoryType;
