"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  MapPin,
  Save,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { AppShell, StatusPill } from "../../components/SiteChrome";

export default function SupplierQuote() {
  const [preview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rate, setRate] = useState("1850");
  const [hours, setHours] = useState("8");
  const [mobilization, setMobilization] = useState("8500");
  const [demobilization, setDemobilization] = useState("8500");
  const [overtime, setOvertime] = useState("260");
  const [deposit, setDeposit] = useState("25000");

  const total = useMemo(() => {
    const base =
      Number(rate || 0) * Number(hours || 0) * 12 +
      Number(mobilization || 0) +
      Number(demobilization || 0);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(base);
  }, [rate, hours, mobilization, demobilization]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!preview) {
      setPreview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AppShell role="supplier" user="Prakash Rao">
      <div className="app-page">
        <Link className="back-link" href="/supplier">
          <ArrowLeft aria-hidden="true" /> Back to invitations
        </Link>
        <div className="page-heading quote-form-heading">
          <div>
            <div className="heading-meta">
              <StatusPill tone="warning">Due today, 6:00 PM</StatusPill>
              <span>RFQ BF-1042</span>
            </div>
            <h1>{submitted ? "Quotation submitted" : "Create quotation"}</h1>
            <p>
              Use the requested units so the buyer can compare your commercial
              terms clearly.
            </p>
          </div>
          {!submitted && (
            <span className="autosave-state">
              <Save aria-hidden="true" /> Draft saved
            </span>
          )}
        </div>

        {submitted ? (
          <div className="quote-success app-card">
            <span className="success-mark">
              <Check aria-hidden="true" />
            </span>
            <p className="eyebrow">Quotation QT-2091</p>
            <h2>Your quote has been sent to the buyer.</h2>
            <p>
              We will notify you if it is shortlisted or if the buyer requests
              a clarification. You can revise it until the deadline.
            </p>
            <div className="submission-total">
              <span>Indicative 12-day total</span>
              <strong>{total}</strong>
              <small>GST extra</small>
            </div>
            <div className="button-row center-buttons">
              <Link className="button button-navy" href="/supplier">
                Return to dashboard
              </Link>
              <button
                className="button button-outline"
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setPreview(false);
                }}
              >
                Revise before deadline
              </button>
            </div>
          </div>
        ) : (
          <form className="quote-form-layout" onSubmit={submit}>
            <div className="stack">
              {preview && (
                <div className="info-banner">
                  <ShieldCheck aria-hidden="true" />
                  <div className="banner-copy">
                    <strong>Review before submission</strong>
                    <span>
                      Confirm the units, inclusions, and terms. The buyer will
                      see this information in the same structure.
                    </span>
                  </div>
                </div>
              )}
              <section className="app-card quote-section">
                <div className="app-card-header">
                  <h2>Hire rate</h2>
                  <span className="required-label">Required</span>
                </div>
                <div className="app-card-body">
                  <div className="form-row">
                    <div className="field currency-field">
                      <label htmlFor="rate">Base hire rate</label>
                      <span className="input-prefix">₹</span>
                      <input
                        id="rate"
                        inputMode="numeric"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        required
                        readOnly={preview}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="unit">Rate unit</label>
                      <select id="unit" defaultValue="hour" disabled={preview}>
                        <option value="hour">Per operating hour</option>
                        <option value="shift">Per shift</option>
                        <option value="day">Per day</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="minimum">Minimum billing</label>
                      <input
                        id="minimum"
                        inputMode="numeric"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        readOnly={preview}
                      />
                      <span className="field-hint">Hours per day</span>
                    </div>
                    <div className="field">
                      <label htmlFor="overtime">Overtime rate</label>
                      <input
                        id="overtime"
                        inputMode="numeric"
                        value={overtime}
                        onChange={(e) => setOvertime(e.target.value)}
                        readOnly={preview}
                      />
                      <span className="field-hint">₹ per additional hour</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="app-card quote-section">
                <div className="app-card-header">
                  <h2>Mobilization and responsibilities</h2>
                </div>
                <div className="app-card-body">
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="mobilization">Mobilization</label>
                      <input
                        id="mobilization"
                        inputMode="numeric"
                        value={mobilization}
                        onChange={(e) => setMobilization(e.target.value)}
                        readOnly={preview}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="demobilization">Demobilization</label>
                      <input
                        id="demobilization"
                        inputMode="numeric"
                        value={demobilization}
                        onChange={(e) => setDemobilization(e.target.value)}
                        readOnly={preview}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="operator">Operator</label>
                      <select id="operator" defaultValue="included" disabled={preview}>
                        <option value="included">Included in hire rate</option>
                        <option value="separate">Charged separately</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="fuel">Fuel responsibility</label>
                      <select id="fuel" defaultValue="buyer" disabled={preview}>
                        <option value="buyer">Buyer supplies fuel</option>
                        <option value="supplier">Included by supplier</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="app-card quote-section">
                <div className="app-card-header">
                  <h2>Payment and downtime terms</h2>
                </div>
                <div className="app-card-body">
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="deposit">Refundable deposit</label>
                      <input
                        id="deposit"
                        inputMode="numeric"
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        readOnly={preview}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="payment">Payment terms</label>
                      <select id="payment" defaultValue="7days" disabled={preview}>
                        <option value="advance">Advance</option>
                        <option value="7days">Within 7 days</option>
                        <option value="15days">Within 15 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="downtime">
                      Replacement / downtime commitment
                    </label>
                    <textarea
                      id="downtime"
                      defaultValue="If the machine cannot return to service, a suitable replacement will be arranged within 24 hours, subject to site access."
                      readOnly={preview}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cancellation">Cancellation terms</label>
                    <textarea
                      id="cancellation"
                      defaultValue="No charge if cancelled more than 24 hours before mobilization. Mobilization cost applies after dispatch."
                      readOnly={preview}
                    />
                  </div>
                </div>
              </section>
            </div>

            <aside className="quote-summary app-card">
              <div className="app-card-header">
                <h2>RFQ summary</h2>
                <button type="button" aria-label="Expand RFQ summary">
                  <ChevronDown aria-hidden="true" />
                </button>
              </div>
              <div className="app-card-body">
                <h3>Backhoe loader with rock breaker</h3>
                <dl>
                  <div>
                    <dt>
                      <MapPin aria-hidden="true" /> Site
                    </dt>
                    <dd>Whitefield, Bengaluru</dd>
                  </div>
                  <div>
                    <dt>
                      <Clock3 aria-hidden="true" /> Dates
                    </dt>
                    <dd>28 Jul–8 Aug · 12 days</dd>
                  </div>
                  <div>
                    <dt>
                      <UserRound aria-hidden="true" /> Hire
                    </dt>
                    <dd>Wet hire · 8-hour day shift</dd>
                  </div>
                  <div>
                    <dt>
                      <Wrench aria-hidden="true" /> Fuel
                    </dt>
                    <dd>Buyer responsibility</dd>
                  </div>
                </dl>
                <div className="deadline-box">
                  <CircleAlert aria-hidden="true" />
                  Quote due today, 6:00 PM
                </div>
                <div className="quote-calculation">
                  <span>Indicative 12-day total</span>
                  <strong>{total}</strong>
                  <small>
                    Hire + mobilization + demobilization · GST extra
                  </small>
                </div>
                <button className="button button-navy full-width" type="submit">
                  {preview ? "Submit quotation" : "Preview quotation"}
                  <ArrowRight aria-hidden="true" />
                </button>
                {preview && (
                  <button
                    className="decline-link"
                    type="button"
                    onClick={() => setPreview(false)}
                  >
                    Return to edit
                  </button>
                )}
              </div>
            </aside>
          </form>
        )}
      </div>
    </AppShell>
  );
}
