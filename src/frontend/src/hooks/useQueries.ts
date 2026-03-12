import { useQuery } from "@tanstack/react-query";
import type { Story } from "../backend";
import { useActor } from "./useActor";

export function useCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export type { Story };
