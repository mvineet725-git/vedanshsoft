import { useEffect } from "react";
import { track, type AnalyticsProperties } from "./analytics";

/** Fires a product_page_view event once when a product/industry page mounts. */
export function useTrackPageView(product: AnalyticsProperties["product"], page: string) {
  useEffect(() => {
    track("product_page_view", { product, page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
