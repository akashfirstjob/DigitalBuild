import Link from "@/components/Link";
import { useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  FileText,
  HardHat,
  Headphones,
  Home,
  LayoutDashboard,
  Menu,
  PackageCheck,
  ShieldCheck,
  Truck,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand${compact ? " brand-compact" : ""}`} href="/">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="brand-word">
        Build<span>Fleet</span>
      </span>
      {!compact && <small>Equipment marketplace</small>}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/request">Request equipment</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/#trust">Trust & verification</Link>
          <Link href="/supplier">For suppliers</Link>
          <Link href="/#help">Help</Link>
        </nav>
        <div className="header-actions">
          <Link className="sign-in-link" href="/buyer">
            Sign in
          </Link>
          <Link className="button button-amber button-small" href="/request">
            Request equipment
          </Link>
          <a
            className="mobile-help"
            aria-label="Call for help"
            href="tel:+918000000000"
          >
            <Headphones aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <Link href="/request" onClick={() => setOpen(false)}>
            Request equipment <ChevronRight aria-hidden="true" />
          </Link>
          <Link href="/#how-it-works" onClick={() => setOpen(false)}>
            How it works <ChevronRight aria-hidden="true" />
          </Link>
          <Link href="/#trust" onClick={() => setOpen(false)}>
            Trust & verification <ChevronRight aria-hidden="true" />
          </Link>
          <Link href="/supplier" onClick={() => setOpen(false)}>
            For suppliers <ChevronRight aria-hidden="true" />
          </Link>
          <Link href="/buyer" onClick={() => setOpen(false)}>
            Sign in <ChevronRight aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            A structured way to request construction equipment from reviewed
            suppliers.
          </p>
          <span className="footer-note">
            Working brand for product prototyping.
          </span>
        </div>
        <div>
          <h3>Marketplace</h3>
          <Link href="/request">Request equipment</Link>
          <Link href="/supplier">For suppliers</Link>
          <Link href="/#how-it-works">How it works</Link>
        </div>
        <div>
          <h3>Support</h3>
          <Link href="/#help">Help centre</Link>
          <a href="tel:+918000000000">+91 80000 00000</a>
          <a href="mailto:help@buildfleet.example">Email support</a>
        </div>
        <div>
          <h3>Company</h3>
          <Link href="/#trust">Trust & verification</Link>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 BuildFleet prototype</span>
        <span>English · Translation-ready</span>
      </div>
    </footer>
  );
}

export function ResponsivePicture({
  desktop,
  mobile,
  alt,
  width,
  height,
  className,
  priority = false,
}: {
  desktop: string;
  mobile?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const mobileBase = mobile || desktop;
  return (
    <picture>
      <source
        media="(max-width: 639px)"
        srcSet={`${mobileBase}.avif`}
        type="image/avif"
      />
      <source
        media="(max-width: 639px)"
        srcSet={`${mobileBase}.webp`}
        type="image/webp"
      />
      <source srcSet={`${desktop}.avif`} type="image/avif" />
      <source srcSet={`${desktop}.webp`} type="image/webp" />
      <img
        className={className}
        src={`${desktop}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

type AppRole = "buyer" | "supplier" | "admin";

const roleNav = {
  buyer: [
    { href: "/buyer", label: "Home", icon: Home },
    { href: "/buyer/quotes", label: "Requests", icon: FileText },
    { href: "/rental", label: "Rentals", icon: Truck },
    { href: "/#help", label: "Help", icon: CircleHelp },
    { href: "/buyer#account", label: "Account", icon: UserRound },
  ],
  supplier: [
    { href: "/supplier", label: "Overview", icon: Home },
    { href: "/supplier/quote", label: "RFQ invitations", icon: FileText },
    { href: "/supplier#fleet", label: "Fleet", icon: Wrench },
    { href: "/supplier#documents", label: "Documents", icon: ShieldCheck },
    { href: "/#help", label: "Help", icon: CircleHelp },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin#verification", label: "Verification", icon: ShieldCheck },
    { href: "/admin#rfqs", label: "RFQ operations", icon: FileText },
    { href: "/admin#rentals", label: "Rentals", icon: Truck },
    { href: "/admin#incidents", label: "Incidents", icon: HardHat },
    { href: "/admin#suppliers", label: "Suppliers", icon: PackageCheck },
  ],
};

export function AppShell({
  role,
  user,
  children,
}: {
  role: AppRole;
  user: string;
  children: React.ReactNode;
}) {
  const { pathname } = useLocation();
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <Brand compact />
        <span className="role-label">{role} workspace</span>
        <nav aria-label={`${role} navigation`}>
          {roleNav[role].map(({ href, label, icon: Icon }, index) => {
            const hrefPath = href.split("#")[0];
            const active =
              !href.includes("#") &&
              (pathname === hrefPath ||
                (index > 0 &&
                  hrefPath !== "/" &&
                  pathname.startsWith(`${hrefPath}/`)));
            return (
              <Link
                href={href}
                className={active ? "active" : ""}
                key={`${href}-${label}`}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-support">
          <Headphones aria-hidden="true" />
          <div>
            <strong>Need help?</strong>
            <a href="tel:+918000000000">Call coordinator</a>
          </div>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <div className="mobile-app-brand">
            <Brand compact />
          </div>
          <span className="workspace-name">{role} workspace</span>
          <div className="app-user">
            <button type="button" aria-label="Notifications">
              <Bell aria-hidden="true" />
              <span className="notification-dot" />
            </button>
            <span className="avatar" aria-hidden="true">
              {user
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <div>
              <strong>{user}</strong>
              <span>{role === "admin" ? "Operations" : role}</span>
            </div>
          </div>
        </header>
        <main id="main-content" className="app-content">
          {children}
        </main>
        <nav className="mobile-app-nav" aria-label="Mobile application navigation">
          {roleNav[role].slice(0, 5).map(({ href, label, icon: Icon }) => (
            <Link
              href={href}
              className={pathname === href ? "active" : ""}
              key={`${href}-${label}`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function StatusPill({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
}) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}
