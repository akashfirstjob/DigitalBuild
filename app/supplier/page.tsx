"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileCheck2,
  FileText,
  MapPin,
  Plus,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "../components/SiteChrome";

const checklist = [
  {
    icon: Building2,
    title: "Business profile",
    detail: "Company, GSTIN and primary contact",
    status: "accepted",
  },
  {
    icon: MapPin,
    title: "Service area",
    detail: "Bengaluru Urban and 75 km radius",
    status: "accepted",
  },
  {
    icon: Wrench,
    title: "First machine",
    detail: "Backhoe loader · KA-05-MX-****",
    status: "pending review",
  },
  {
    icon: FileText,
    title: "Ownership / authorization",
    detail: "Upload a clear ownership or authorization record",
    status: "action required",
  },
  {
    icon: FileCheck2,
    title: "Registration documents",
    detail: "RC submitted on 24 July",
    status: "pending review",
  },
  {
    icon: ShieldCheck,
    title: "Insurance documents",
    detail: "Policy valid until 18 March 2027",
    status: "accepted",
  },
  {
    icon: UserRound,
    title: "Wet-hire operator",
    detail: "Licence and contact details",
    status: "in progress",
  },
  {
    icon: Clock3,
    title: "Rate and availability",
    detail: "Set minimum billing and next available date",
    status: "not started",
  },
];

const tones: Record<
  string,
  "success" | "warning" | "danger" | "info" | "neutral"
> = {
  accepted: "success",
  "pending review": "info",
  "action required": "danger",
  "in progress": "warning",
  "not started": "neutral",
};

export default function SupplierDashboard() {
  const [declined, setDeclined] = useState(false);

  return (
    <AppShell role="supplier" user="Prakash Rao">
      <div className="app-page">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Supplier onboarding</p>
            <h1>Finish your first machine profile</h1>
            <p>
              Complete the remaining information so this machine can receive
              relevant RFQ invitations.
            </p>
          </div>
          <button className="button button-outline" type="button">
            <Plus aria-hidden="true" /> Add another machine
          </button>
        </div>

        <div className="onboarding-progress-card">
          <div className="onboarding-progress-copy">
            <span className="progress-score">5 of 8</span>
            <div>
              <strong>Profile 63% complete</strong>
              <span>Your saved work is available on any device.</span>
            </div>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Supplier onboarding completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={63}
          >
            <span style={{ width: "63%" }} />
          </div>
        </div>

        <div className="two-column-app supplier-layout">
          <div className="stack">
            <section className="app-card">
              <div className="app-card-header">
                <div>
                  <h2>Onboarding checklist</h2>
                  <span className="card-subtitle">
                    Prakash Equipment Services
                  </span>
                </div>
                <StatusPill tone="warning">In progress</StatusPill>
              </div>
              <div className="checklist-list">
                {checklist.map(({ icon: Icon, title, detail, status }) => (
                  <button className="checklist-row" type="button" key={title}>
                    <span
                      className={`checklist-icon ${
                        status === "accepted" ? "complete" : ""
                      }`}
                    >
                      {status === "accepted" ? (
                        <Check aria-hidden="true" />
                      ) : (
                        <Icon aria-hidden="true" />
                      )}
                    </span>
                    <span className="checklist-copy">
                      <strong>{title}</strong>
                      <small>{detail}</small>
                    </span>
                    <StatusPill tone={tones[status]}>{status}</StatusPill>
                    <ChevronRight aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>

            <section className="app-card">
              <div className="app-card-header">
                <h2>Your fleet</h2>
                <button className="small-link" type="button">
                  Manage fleet
                </button>
              </div>
              <div className="supplier-machine">
                <div className="machine-thumb">
                  <img
                    src="/images/backhoe-loader-cutout.png"
                    alt=""
                    width="320"
                    height="220"
                  />
                </div>
                <div>
                  <strong>76 HP backhoe loader</strong>
                  <span>KA-05-MX-**** · Model year 2022</span>
                  <div className="machine-badges">
                    <StatusPill tone="info">Pending review</StatusPill>
                    <span>Available from 28 Jul</span>
                  </div>
                </div>
                <button className="button button-outline" type="button">
                  Continue profile
                </button>
              </div>
            </section>
          </div>

          <aside className="stack">
            <section className="app-card rfq-invite-card">
              <div className="invite-accent">
                <FileText aria-hidden="true" />
                <span>New RFQ invitation</span>
              </div>
              {declined ? (
                <div className="declined-state">
                  <Check aria-hidden="true" />
                  <h2>Invitation declined</h2>
                  <p>
                    Thanks for letting us know. It will no longer appear in your
                    active invitations.
                  </p>
                  <button
                    className="small-link"
                    type="button"
                    onClick={() => setDeclined(false)}
                  >
                    Undo
                  </button>
                </div>
              ) : (
                <>
                  <h2>Backhoe loader with rock breaker</h2>
                  <div className="invite-meta">
                    <span>
                      <MapPin aria-hidden="true" /> Whitefield, Bengaluru
                    </span>
                    <span>
                      <Clock3 aria-hidden="true" /> 28 Jul–8 Aug · 12 days
                    </span>
                    <span>
                      <UserRound aria-hidden="true" /> Wet hire
                    </span>
                  </div>
                  <div className="invite-deadline">
                    <CircleAlert aria-hidden="true" />
                    <span>
                      Quote by <strong>Today, 6:00 PM</strong>
                    </span>
                  </div>
                  <Link
                    className="button button-navy full-width"
                    href="/supplier/quote"
                  >
                    Review and quote <ArrowRight aria-hidden="true" />
                  </Link>
                  <button
                    className="decline-link"
                    type="button"
                    onClick={() => setDeclined(true)}
                  >
                    Decline invitation
                  </button>
                </>
              )}
            </section>

            <section className="app-card review-explainer">
              <BadgeCheck aria-hidden="true" />
              <h2>How document review works</h2>
              <p>
                Each accepted status identifies the record reviewed and its
                review date. It does not claim a physical machine inspection.
              </p>
              <button className="small-link" type="button">
                Read verification policy
              </button>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
