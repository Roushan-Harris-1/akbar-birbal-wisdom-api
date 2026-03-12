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
};

export declare class ExternalBlob {
  getBytes(): Promise<Uint8Array>;
  onProgress?: (progress: number) => void;
  static fromURL(url: string): ExternalBlob;
}

export declare function createActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions
): Promise<backendInterface>;
