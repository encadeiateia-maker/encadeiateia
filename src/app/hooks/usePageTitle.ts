import { useEffect } from "react";

const BASE = "encadeiateia";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — AI, Automation & Custom Apps for SMEs`;
  }, [title]);
}
