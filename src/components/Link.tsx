import type { AnchorHTMLAttributes } from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Drop-in replacement for `next/link` so the rest of the app keeps using an
 * `href` prop. Internal paths go through React Router's client-side navigation;
 * protocol links (tel:, mailto:, http:) and bare `#` anchors fall back to a
 * plain <a>.
 */
export default function Link({ href, children, ...rest }: LinkProps) {
  const isPlainAnchor =
    /^(https?:|tel:|mailto:)/i.test(href) || href.startsWith("#");

  if (isPlainAnchor) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={href} {...rest}>
      {children}
    </RouterLink>
  );
}
