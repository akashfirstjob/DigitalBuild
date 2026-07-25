import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  FileClock,
  FileText,
  Filter,
  Search,
  ShieldCheck,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "@/components/SiteChrome";

const queue = [
  {
    id: "VER-810",
    supplier: "Prakash Equipment Services",
    document: "Equipment registration",
    submitted: "Today, 9:42 AM",
    age: "32 min",
    priority: "normal",
  },
  {
    id: "VER-807",
    supplier: "Nandi Earthmovers",
    document: "Insurance policy",
    submitted: "Today, 8:15 AM",
    age: "1 hr 59 min",
    priority: "expiring",
  },
  {
    id: "VER-802",
    supplier: "Sri Sai Plant Hire",
    document: "Ownership authorization",
    submitted: "Yesterday, 4:38 PM",
    age: "17 hr",
    priority: "action",
  },
  {
    id: "VER-796",
    supplier: "Cauvery Plant Hire",
    document: "Operator licence",
    submitted: "Yesterday, 2:08 PM",
    age: "20 hr",
    priority: "normal",
  },
];

export default function AdminDashboard() {
  const [review, setReview] = useState<(typeof queue)[number] | null>(null);
  const [reason, setReason] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);

  const closeReview = () => {
    setReview(null);
    setReason("");
  };

  return (
    <AppShell role="admin" user="Neha Shah">
      <div className="app-page admin-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Operations overview</p>
            <h1>Marketplace control centre</h1>
            <p>
              Review the queues, exceptions, and deadlines that need human
              attention today.
            </p>
          </div>
          <div className="admin-heading-actions">
            <span className="live-indicator">
              <span /> Live operations
            </span>
            <button className="button button-outline" type="button">
              Export day report
            </button>
          </div>
        </div>

        <section className="metric-grid admin-metrics" aria-label="Operations summary">
          {[
            {
              label: "Verification queue",
              value: "18",
              detail: "4 past target",
              icon: ShieldCheck,
              tone: "danger",
            },
            {
              label: "Open RFQs",
              value: "24",
              detail: "6 need matching",
              icon: FileText,
              tone: "info",
            },
            {
              label: "Active rentals",
              value: "11",
              detail: "2 handovers due",
              icon: Truck,
              tone: "success",
            },
            {
              label: "Open incidents",
              value: "3",
              detail: "1 safety-impacting",
              icon: AlertTriangle,
              tone: "warning",
            },
          ].map(({ label, value, detail, icon: Icon, tone }) => (
            <article className={`metric-card metric-${tone}`} key={label}>
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

        <div className="operations-grid">
          <section className="app-card verification-queue">
            <div className="app-card-header operations-header">
              <div>
                <h2>Verification queue</h2>
                <span className="card-subtitle">
                  Ordered by service target and document risk
                </span>
              </div>
              <div className="table-actions">
                <label className="table-search">
                  <Search aria-hidden="true" />
                  <span className="sr-only">Search verification queue</span>
                  <input placeholder="Search supplier" />
                </label>
                <button type="button" aria-label="Filter queue">
                  <Filter aria-hidden="true" /> Filter
                </button>
              </div>
            </div>
            <div className="admin-table" role="table" aria-label="Verification queue">
              <div className="admin-table-header" role="row">
                <span role="columnheader">Supplier</span>
                <span role="columnheader">Document</span>
                <span role="columnheader">Submitted</span>
                <span role="columnheader">Queue age</span>
                <span role="columnheader">Status</span>
                <span role="columnheader" className="sr-only">
                  Action
                </span>
              </div>
              {queue.map((item) => (
                <div
                  className={`admin-table-row ${
                    completed.includes(item.id) ? "completed-row" : ""
                  }`}
                  role="row"
                  key={item.id}
                >
                  <span data-label="Supplier" role="cell">
                    <strong>{item.supplier}</strong>
                    <small>{item.id}</small>
                  </span>
                  <span data-label="Document" role="cell">
                    {item.document}
                  </span>
                  <span data-label="Submitted" role="cell">
                    {item.submitted}
                  </span>
                  <span data-label="Queue age" role="cell">
                    <Clock3 aria-hidden="true" /> {item.age}
                  </span>
                  <span data-label="Status" role="cell">
                    {completed.includes(item.id) ? (
                      <StatusPill tone="success">Reviewed</StatusPill>
                    ) : item.priority === "action" ? (
                      <StatusPill tone="danger">Past target</StatusPill>
                    ) : item.priority === "expiring" ? (
                      <StatusPill tone="warning">Expiring soon</StatusPill>
                    ) : (
                      <StatusPill tone="neutral">Pending</StatusPill>
                    )}
                  </span>
                  <span role="cell">
                    <button
                      className="row-action"
                      type="button"
                      onClick={() => setReview(item)}
                      disabled={completed.includes(item.id)}
                    >
                      {completed.includes(item.id) ? "Done" : "Review"}
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <button className="load-more" type="button">
              View all 18 records <ArrowRight aria-hidden="true" />
            </button>
          </section>

          <aside className="stack admin-side-stack">
            <section className="app-card">
              <div className="app-card-header">
                <h2>Needs attention</h2>
              </div>
              <div className="attention-list">
                <button type="button">
                  <span className="attention-icon danger">
                    <AlertTriangle aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Safety-impacting incident</strong>
                    <small>RNT-198 · Reported 18 min ago</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </button>
                <button type="button">
                  <span className="attention-icon warning">
                    <FileClock aria-hidden="true" />
                  </span>
                  <span>
                    <strong>6 documents expire in 14 days</strong>
                    <small>Supplier contact not yet sent</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </button>
                <button type="button">
                  <span className="attention-icon info">
                    <Users aria-hidden="true" />
                  </span>
                  <span>
                    <strong>4 RFQs need supplier matching</strong>
                    <small>Oldest waiting 2 hr 14 min</small>
                  </span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </section>

            <section className="app-card">
              <div className="app-card-header">
                <h2>Operations activity</h2>
                <button type="button" className="icon-button">
                  <ChevronDown aria-hidden="true" />
                </button>
              </div>
              <div className="app-card-body">
                <ol className="activity-list">
                  <li>
                    <strong>Quote override approved</strong>
                    <span>Neha · RFQ BF-1039 · 14 min ago</span>
                  </li>
                  <li>
                    <strong>Insurance record rejected</strong>
                    <span>Vikram · Nandi Earthmovers · 32 min ago</span>
                  </li>
                  <li>
                    <strong>Incident supplier response logged</strong>
                    <span>Riya · RNT-198 · 48 min ago</span>
                  </li>
                </ol>
              </div>
            </section>
          </aside>
        </div>

        {review && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeReview();
            }}
          >
            <section
              className="review-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-title"
            >
              <div className="incident-header">
                <div>
                  <span>{review.id}</span>
                  <h2 id="review-title">{review.document}</h2>
                </div>
                <button
                  type="button"
                  aria-label="Close review"
                  onClick={closeReview}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <div className="review-drawer-body">
                <div className="document-preview">
                  <FileText aria-hidden="true" />
                  <strong>Submitted document preview</strong>
                  <span>PDF · 2 pages · 1.8 MB</span>
                  <button type="button">Open full document</button>
                </div>
                <dl className="review-facts">
                  <div>
                    <dt>Supplier</dt>
                    <dd>{review.supplier}</dd>
                  </div>
                  <div>
                    <dt>Submitted</dt>
                    <dd>{review.submitted}</dd>
                  </div>
                  <div>
                    <dt>Extracted expiry</dt>
                    <dd>18 March 2027</dd>
                  </div>
                  <div>
                    <dt>Machine reference</dt>
                    <dd>KA-05-MX-****</dd>
                  </div>
                </dl>
                <div className="field">
                  <label htmlFor="reviewReason">
                    Review reason / audit note
                  </label>
                  <textarea
                    id="reviewReason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Explain the basis for acceptance, rejection, or an override."
                  />
                  <span className="field-hint">
                    Required for every decision and stored in audit history.
                  </span>
                </div>
              </div>
              <div className="review-drawer-actions">
                <button
                  className="button button-outline"
                  type="button"
                  disabled={!reason.trim()}
                  onClick={() => {
                    setCompleted((current) => [...current, review.id]);
                    closeReview();
                  }}
                >
                  Request correction
                </button>
                <button
                  className="button button-navy"
                  type="button"
                  disabled={!reason.trim()}
                  onClick={() => {
                    setCompleted((current) => [...current, review.id]);
                    closeReview();
                  }}
                >
                  <Check aria-hidden="true" /> Accept record
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </AppShell>
  );
}
