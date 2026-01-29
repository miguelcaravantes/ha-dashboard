import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { ReactNode } from "react";

// Stylis plugin to wrap all rules in @layer mui
// Based on https://github.com/emotion-js/emotion/issues/2422#issuecomment-884848529
function stylisLayerPlugin(element: {
  type: string;
  value: string;
  parent: { type: string } | null;
}) {
  if (element.type === "rule" && element.parent?.type !== "@layer") {
    element.value = `@layer mui { ${element.value} }`;
  }
}

// Stylis plugin to wrap all rules in @layer mui
// Based on https://github.com/emotion-js/emotion/issues/2422#issuecomment-884848529
function stylisLayerPlugin(element: StylisElement) {
  if (element.type === "rule" && element.parent?.type !== "@layer") {
    element.value = `@layer mui { ${element.value} }`;
  }
}

const cache = createCache({
  key: "mui-layer",
  stylisPlugins: [stylisLayerPlugin],
});

export function MuiLayerProvider({ children }: { children: ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
