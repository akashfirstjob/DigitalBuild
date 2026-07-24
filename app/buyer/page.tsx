import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleAlert,
  Clock3,
  FileText,
  MessageSquareQuote,
  Plus,
  Truck,
} from "lucide-react";
import { AppShell, StatusPill } from "../components/SiteChrome";

export default function BuyerDashboard() {
  return (
    <AppShell role="buyer" user="Arjun Mehta">
      <div className="app-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Friday, 25 July</p>
            <h1>Good morning, Arjun</h1>
            <p>
              One request needs your attention and a rental starts in three
              days.
            </p>
          </div>
          <Link className="button button-navy" href="/request">
            <Plus aria-hidden="true" /> New equipment request
          </Link>
        </div>

        <div className="info-banner dashboard-banner">
          <CircleAlert aria-hidden="true" />
          <div className="banner-copy">
            <strong>3 quotations are ready to compare</strong>
            <span>
              RFQ BF-1042 · Backhoe loader · Whitefield, Bengaluru
            </span>
          </div>
          <Link href="/buyer/quotes">
            Compare quotes <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <section className="metric-grid" aria-label="Request summary">
          {[
            {
              label: "Active requests",
              value: "3",
              detail: "1 needs action",
              icon: FileText,
            },
            {
              label: "Quotes received",
              value: "7",
              detail: "Across 3 requests",
              icon: MessageSquareQuote,
            },
            {
              label: "Upcoming rentals",
              value: "1",
              detail: "Starts 28 July",
              icon: CalendarClock,
            },
            {
              label: "Active rentals",
              value: "1",
              detail: "No open incidents",
              icon: Truck,
            },
          ].map(({ label, value, detail, icon: Icon }) => (
            <article className="metric-card" key={label}>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </div>
              <span className="metric-icon">
                <Icon aria-hidden="true" />
              </span>
            </article>
          ))}
        </section>

        <div className="two-column-app">
          <div className="stack">
            <section className="app-card">
              <div className="app-card-header">
                <h2>Active requests</h2>
                <Link className="small-link" href="/buyer/quotes">
                  View all
                </Link>
              </div>
              <div className="item-list">
                <div className="item-row">
                  <div className="item-title">
                    <strong>Backhoe loader · BF-1042</strong>
                    <span>Whitefield, Bengaluru · Wet hire</span>
                  </div>
                  <div className="item-meta">
                    <StatusPill tone="info">3 quotes received</StatusPill>
                    <span>Required 28 Jul · 12 days</span>
                  </div>
                  <Link className="row-action" href="/buyer/quotes">
                    Compare <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <div className="item-row">
                  <div className="item-title">
                    <strong>Backhoe loader · BF-1045</strong>
                    <span>Hoskote, Bengaluru · Dry hire</span>
                  </div>
                  <div className="item-meta">
                    <StatusPill tone="warning">Quotes pending</StatusPill>
                    <span>Deadline today, 6:00 PM</span>
                  </div>
                  <Link className="row-action" href="/buyer/quotes">
                    View <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                <div className="item-row">
                  <div className="item-title">
                    <strong>Backhoe loader · BF-1048</strong>
                    <span>Electronic City, Bengaluru · Wet hire</span>
                  </div>
                  <div className="item-meta">
                    <StatusPill tone="neutral">Matching</StatusPill>
                    <span>Submitted 36 minutes ago</span>
                  </div>
                  <Link className="row-action" href="/buyer/quotes">
                    View <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </section>

            <section className="app-card">
              <div className="app-card-header">
                <h2>Rentals</h2>
                <Link className="small-link" href="/rental">
                  View all
                </Link>
              </div>
              <div className="rental-card-row">
                <div className="rental-date">
                  <span>JUL</span>
                  <strong>28</strong>
                </div>
                <div className="item-title">
                  <strong>Backhoe loader · RNT-204</strong>
                  <span>Koramangala stormwater project</span>
                  <small>Supplier: Prakash Equipment Services</small>
                </div>
                <StatusPill tone="info">Handover due</StatusPill>
                <Link className="row-action" href="/rental">
                  Open <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </section>
          </div>

          <aside className="stack">
            <section className="app-card">
              <div className="app-card-header">
                <h2>Recent activity</h2>
              </div>
              <div className="app-card-body">
                <ol className="activity-list">
                  <li>
                    <strong>New quote from Nandi Earthmovers</strong>
                    <span>BF-1042 · 18 minutes ago</span>
                  </li>
                  <li>
                    <strong>Insurance review updated</strong>
                    <span>Prakash Equipment · 2 hours ago</span>
                  </li>
                  <li>
                    <strong>Rental handover reminder</strong>
                    <span>RNT-204 · Yesterday</span>
                  </li>
                  <li>
                    <strong>Request moved to matching</strong>
                    <span>BF-1048 · Yesterday</span>
                  </li>
                </ol>
              </div>
            </section>
            <section className="app-card assistance-card">
              <span className="assistance-icon">
                <Clock3 aria-hidden="true" />
              </span>
              <h2>Need a quote sooner?</h2>
              <p>
                A coordinator can check supplier availability and clarify your
                requirement.
              </p>
              <a className="button button-outline full-width" href="tel:+918000000000">
                Call matching support
              </a>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
