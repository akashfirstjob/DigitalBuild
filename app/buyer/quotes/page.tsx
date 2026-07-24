"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CircleHelp,
  FileCheck2,
  MapPin,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { AppShell, StatusPill } from "../../components/SiteChrome";

const quotes = [
  {
    id: "QT-2091",
    supplier: "Prakash Equipment Services",
    featured: true,
    rate: "₹1,850",
    estimate: "₹1,95,820",
    mobilization: "₹8,500",
    demobilization: "₹8,500",
    overtime: "₹260 / hr",
    operator: "Included",
    fuel: "Buyer",
    tax: "GST 18% extra",
    minimum: "8 hours / day",
    deposit: "₹25,000",
    payment: "7 days",
    commitment: "Replacement within 24 hours",
    availability: "Confirmed",
  },
  {
    id: "QT-2094",
    supplier: "Nandi Earthmovers",
    featured: false,
    rate: "₹1,780",
    estimate: "₹1,99,196",
    mobilization: "₹12,000",
    demobilization: "₹12,000",
    overtime: "₹285 / hr",
    operator: "Included",
    fuel: "Buyer",
    tax: "GST 18% extra",
    minimum: "9 hours / day",
    deposit: "₹30,000",
    payment: "Advance",
    commitment: "Repair attendance within 12 hours",
    availability: "Confirmed",
  },
  {
    id: "QT-2097",
    supplier: "Cauvery Plant Hire",
    featured: false,
    rate: "₹1,920",
    estimate: "₹2,03,416",
    mobilization: "Included",
    demobilization: "Included",
    overtime: "₹300 / hr",
    operator: "Included",
    fuel: "Buyer",
    tax: "GST 18% extra",
    minimum: "8 hours / day",
    deposit: "No deposit",
    payment: "15 days",
    commitment: "Replacement within 36 hours",
    availability: "Hold until 6 PM",
  },
];

const rows: [string, keyof (typeof quotes)[number]][] = [
  ["Estimated total", "estimate"],
  ["Base hire rate", "rate"],
  ["Mobilization", "mobilization"],
  ["Demobilization", "demobilization"],
  ["Overtime", "overtime"],
  ["Operator", "operator"],
  ["Fuel responsibility", "fuel"],
  ["Taxes", "tax"],
  ["Minimum billing", "minimum"],
  ["Refundable deposit", "deposit"],
  ["Payment terms", "payment"],
  ["Downtime commitment", "commitment"],
  ["Availability", "availability"],
];

export default function QuoteComparison() {
  const [selected, setSelected] = useState<string[]>([
    quotes[0].id,
    quotes[1].id,
  ]);
  const [shortlisted, setShortlisted] = useState<string | null>(null);
  const [verificationOpen, setVerificationOpen] = useState<string | null>(
    null,
  );

  const toggle = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 2
          ? [...current, id]
          : [current[1], id],
    );
  };

  return (
    <AppShell role="buyer" user="Arjun Mehta">
      <div className="app-page quote-page">
        <Link className="back-link" href="/buyer">
          <ArrowLeft aria-hidden="true" /> Back to requests
        </Link>
        <div className="page-heading quote-heading">
          <div>
            <div className="heading-meta">
              <StatusPill tone="info">3 quotes received</StatusPill>
              <span>RFQ BF-1042</span>
            </div>
            <h1>Compare quotations</h1>
            <p>
              Backhoe loader · Wet hire · 28 Jul–8 Aug · Whitefield,
              Bengaluru
            </p>
          </div>
          <button className="button button-outline" type="button">
            Request details <ChevronDown aria-hidden="true" />
          </button>
        </div>

        <div className="warning-banner">
          <CalendarDays aria-hidden="true" />
          <div className="banner-copy">
            <strong>Quotes valid until today, 6:00 PM</strong>
            <span>
              Availability can change after the deadline. Shortlisting does not
              confirm the rental.
            </span>
          </div>
        </div>

        <div className="mobile-quote-cards">
          {quotes.map((quote) => (
            <article
              className={`mobile-quote-card ${
                selected.includes(quote.id) ? "selected" : ""
              }`}
              key={quote.id}
            >
              {quote.featured && (
                <span className="best-fit">
                  <Star aria-hidden="true" /> Best overall fit
                </span>
              )}
              <div className="mobile-quote-header">
                <label className="compare-check">
                  <input
                    type="checkbox"
                    checked={selected.includes(quote.id)}
                    onChange={() => toggle(quote.id)}
                  />
                  <span>Compare</span>
                </label>
                <small>{quote.id}</small>
              </div>
              <h2>{quote.supplier}</h2>
              <button
                className="verification-trigger"
                type="button"
                onClick={() =>
                  setVerificationOpen(
                    verificationOpen === quote.id ? null : quote.id,
                  )
                }
                aria-expanded={verificationOpen === quote.id}
              >
                <ShieldCheck aria-hidden="true" /> 3 review facts
                <ChevronDown aria-hidden="true" />
              </button>
              {verificationOpen === quote.id && (
                <VerificationDetails />
              )}
              <div className="mobile-price">
                <span>Estimated 12-day total</span>
                <strong>{quote.estimate}</strong>
                <small>{quote.rate} / hour · GST extra</small>
              </div>
              <dl>
                {rows.slice(2).map(([label, key]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{quote[key]}</dd>
                  </div>
                ))}
              </dl>
              <button
                className={`button full-width ${
                  shortlisted === quote.id ? "button-outline" : "button-navy"
                }`}
                type="button"
                onClick={() =>
                  setShortlisted(shortlisted === quote.id ? null : quote.id)
                }
              >
                {shortlisted === quote.id ? (
                  <>
                    <Check aria-hidden="true" /> Shortlisted
                  </>
                ) : (
                  <>
                    Shortlist quote <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>
            </article>
          ))}
        </div>

        <div className="comparison-table-wrap">
          <div
            className="comparison-table"
            role="table"
            aria-label="Quotation comparison"
          >
            <div className="comparison-label-column" role="rowgroup">
              <div className="quote-column-header label-header">
                <span>Commercial comparison</span>
                <small>All amounts in INR</small>
              </div>
              <div className="verification-spacer" />
              {rows.map(([label]) => (
                <div className="comparison-cell label-cell" key={label}>
                  <span>{label}</span>
                  {label === "Estimated total" && (
                    <CircleHelp aria-label="Calculated using the requested 12-day duration and minimum billing" />
                  )}
                </div>
              ))}
              <div className="shortlist-spacer" />
            </div>

            {quotes.map((quote) => (
              <div
                className={`quote-column ${quote.featured ? "featured" : ""}`}
                role="rowgroup"
                key={quote.id}
              >
                {quote.featured && (
                  <span className="best-fit desktop-best-fit">
                    <Star aria-hidden="true" /> Best overall fit
                  </span>
                )}
                <div className="quote-column-header">
                  <div>
                    <strong>{quote.supplier}</strong>
                    <small>{quote.id}</small>
                  </div>
                  <label className="compare-check">
                    <input
                      type="checkbox"
                      checked={selected.includes(quote.id)}
                      onChange={() => toggle(quote.id)}
                    />
                    <span>Compare</span>
                  </label>
                </div>
                <button
                  className="verification-trigger desktop-verification"
                  type="button"
                  onClick={() =>
                    setVerificationOpen(
                      verificationOpen === quote.id ? null : quote.id,
                    )
                  }
                  aria-expanded={verificationOpen === quote.id}
                >
                  <ShieldCheck aria-hidden="true" /> 3 review facts
                  <ChevronDown aria-hidden="true" />
                </button>
                {rows.map(([label, key]) => (
                  <div
                    className={`comparison-cell ${
                      label === "Estimated total" ? "price-cell" : ""
                    }`}
                    key={label}
                  >
                    <span className="mobile-field-label">{label}</span>
                    <strong>{quote[key]}</strong>
                    {label === "Estimated total" && (
                      <small>Indicative · GST extra</small>
                    )}
                  </div>
                ))}
                <div className="shortlist-cell">
                  <button
                    className={`button full-width ${
                      shortlisted === quote.id
                        ? "button-outline"
                        : "button-navy"
                    }`}
                    type="button"
                    onClick={() =>
                      setShortlisted(
                        shortlisted === quote.id ? null : quote.id,
                      )
                    }
                  >
                    {shortlisted === quote.id ? (
                      <>
                        <Check aria-hidden="true" /> Shortlisted
                      </>
                    ) : (
                      "Shortlist quote"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="comparison-note">
          <CircleAlert aria-hidden="true" />
          <p>
            <strong>About verification:</strong> Review facts refer to submitted
            records and their review dates. They do not represent a physical
            machine inspection or a guarantee of performance.
          </p>
        </div>

        {verificationOpen && (
          <div className="verification-popover" role="dialog" aria-label="Review facts">
            <div className="popover-header">
              <div>
                <strong>Review facts</strong>
                <span>
                  {quotes.find((quote) => quote.id === verificationOpen)?.supplier}
                </span>
              </div>
              <button
                type="button"
                aria-label="Close review facts"
                onClick={() => setVerificationOpen(null)}
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <VerificationDetails />
          </div>
        )}

        {selected.length === 2 && (
          <div className="mobile-compare-bar">
            <div>
              <span>{selected.length} quotes selected</span>
              <small>Fields shown in the same order</small>
            </div>
            <button type="button">
              Compare selected <ArrowRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function VerificationDetails() {
  return (
    <div className="verification-details">
      <div>
        <BadgeCheck aria-hidden="true" />
        <p>
          <strong>Business GST registration</strong>
          <span>Reviewed 12 Jul 2026</span>
        </p>
      </div>
      <div>
        <FileCheck2 aria-hidden="true" />
        <p>
          <strong>Equipment registration</strong>
          <span>Reviewed 18 Jul 2026</span>
        </p>
      </div>
      <div>
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>Insurance document</strong>
          <span>Valid until 18 Mar 2027</span>
        </p>
      </div>
      <div className="verification-disclaimer">
        <MapPin aria-hidden="true" />
        <p>Document review is not a physical machine inspection.</p>
      </div>
    </div>
  );
}
