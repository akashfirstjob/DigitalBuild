"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Clock3,
  FileCheck2,
  Fuel,
  Gauge,
  HardHat,
  MapPin,
  ShieldAlert,
  UploadCloud,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";
import {
  AppShell,
  ResponsivePicture,
  StatusPill,
} from "../components/SiteChrome";

const handoverItems = [
  "Machine front, rear, and both sides",
  "Front bucket and rear attachment",
  "Tyres, hydraulic lines, and visible leaks",
  "Cab controls and safety equipment",
];

export default function RentalPage() {
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);
  const [handoverComplete, setHandoverComplete] = useState(false);
  const [photos, setPhotos] = useState<boolean[]>([
    true,
    true,
    false,
    false,
  ]);

  function submitIncident(event: FormEvent) {
    event.preventDefault();
    setIncidentSubmitted(true);
  }

  return (
    <AppShell role="buyer" user="Arjun Mehta">
      <div className="app-page rental-page">
        <Link className="back-link" href="/buyer">
          <ArrowLeft aria-hidden="true" /> Back to rentals
        </Link>
        <div className="page-heading rental-heading">
          <div>
            <div className="heading-meta">
              <StatusPill tone="info">Handover due</StatusPill>
              <span>Rental RNT-204</span>
            </div>
            <h1>Backhoe loader rental</h1>
            <p>
              Koramangala stormwater project · 28 Jul–8 Aug · Wet hire
            </p>
          </div>
          <button
            className="button button-danger"
            type="button"
            onClick={() => {
              setIncidentOpen(true);
              setIncidentSubmitted(false);
            }}
          >
            <AlertTriangle aria-hidden="true" /> Report an issue
          </button>
        </div>

        <div className="rental-timeline">
          {[
            ["Rental confirmed", "24 Jul", "complete"],
            ["Pre-handover", "Today", "active"],
            ["Active rental", "28 Jul", ""],
            ["Return handover", "8 Aug", ""],
          ].map(([label, date, state]) => (
            <div className={state} key={label}>
              <span className="timeline-marker">
                {state === "complete" ? <Check aria-hidden="true" /> : null}
              </span>
              <strong>{label}</strong>
              <small>{date}</small>
            </div>
          ))}
        </div>

        {handoverComplete ? (
          <div className="success-banner handover-success">
            <Check aria-hidden="true" />
            <div className="banner-copy">
              <strong>Your handover record is saved</strong>
              <span>
                Awaiting supplier confirmation. Both parties will receive the
                final record.
              </span>
            </div>
            <button type="button" onClick={() => setHandoverComplete(false)}>
              Review
            </button>
          </div>
        ) : (
          <div className="two-column-app handover-layout">
            <section className="app-card">
              <div className="handover-visual">
                <ResponsivePicture
                  desktop="/images/equipment-handover-proof"
                  alt="Two professionals document a stationary backhoe loader handover"
                  width={1100}
                  height={825}
                />
                <div>
                  <p className="eyebrow">Guided handover</p>
                  <h2>Record the machine before work starts</h2>
                  <p>
                    Capture the same facts at delivery and return to reduce
                    ambiguity.
                  </p>
                </div>
              </div>
              <div className="handover-form">
                <section>
                  <div className="handover-section-title">
                    <span>1</span>
                    <div>
                      <h3>Machine photographs</h3>
                      <p>Use clear, well-lit photos with the machine stopped.</p>
                    </div>
                  </div>
                  <div className="photo-check-grid">
                    {handoverItems.map((item, index) => (
                      <button
                        className={photos[index] ? "uploaded" : ""}
                        type="button"
                        key={item}
                        onClick={() =>
                          setPhotos((current) =>
                            current.map((value, itemIndex) =>
                              itemIndex === index ? true : value,
                            ),
                          )
                        }
                      >
                        {photos[index] ? (
                          <Check aria-hidden="true" />
                        ) : (
                          <Camera aria-hidden="true" />
                        )}
                        <span>{item}</span>
                        <small>{photos[index] ? "Added" : "Add photo"}</small>
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="handover-section-title">
                    <span>2</span>
                    <div>
                      <h3>Operating record</h3>
                      <p>Read the machine display while it is stationary.</p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field icon-field">
                      <label htmlFor="meter">Hour meter</label>
                      <Gauge aria-hidden="true" />
                      <input
                        id="meter"
                        inputMode="decimal"
                        placeholder="e.g. 3,421.6"
                      />
                    </div>
                    <div className="field icon-field">
                      <label htmlFor="fuelLevel">Fuel level</label>
                      <Fuel aria-hidden="true" />
                      <select id="fuelLevel" defaultValue="">
                        <option value="" disabled>
                          Select level
                        </option>
                        <option>Full</option>
                        <option>Three quarters</option>
                        <option>Half</option>
                        <option>One quarter</option>
                        <option>Near empty</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="handover-section-title">
                    <span>3</span>
                    <div>
                      <h3>Condition and people</h3>
                      <p>Record visible defects before confirming the handover.</p>
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="defects">Existing defects or notes</label>
                    <textarea
                      id="defects"
                      placeholder="Describe scratches, leaks, damaged lights, attachment wear, or other visible conditions."
                    />
                  </div>
                  <label className="consent-check">
                    <input type="checkbox" />
                    <span>
                      Supplier operator is present and their identity matches the
                      supplied record.
                    </span>
                  </label>
                </section>
              </div>
              <div className="handover-actions">
                <span>
                  <FileCheck2 aria-hidden="true" />
                  Your record remains editable until both parties confirm.
                </span>
                <button
                  className="button button-navy"
                  type="button"
                  onClick={() => {
                    setHandoverComplete(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Save handover record <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </section>

            <aside className="stack">
              <section className="app-card rental-summary-card">
                <div className="app-card-header">
                  <h2>Rental details</h2>
                </div>
                <div className="app-card-body">
                  <dl>
                    <div>
                      <dt>
                        <Wrench aria-hidden="true" /> Machine
                      </dt>
                      <dd>76 HP backhoe loader</dd>
                    </div>
                    <div>
                      <dt>
                        <MapPin aria-hidden="true" /> Site
                      </dt>
                      <dd>Koramangala, Bengaluru</dd>
                    </div>
                    <div>
                      <dt>
                        <Clock3 aria-hidden="true" /> Period
                      </dt>
                      <dd>28 Jul–8 Aug · 12 days</dd>
                    </div>
                    <div>
                      <dt>
                        <UserRound aria-hidden="true" /> Supplier
                      </dt>
                      <dd>Prakash Equipment Services</dd>
                    </div>
                    <div>
                      <dt>
                        <HardHat aria-hidden="true" /> Operator
                      </dt>
                      <dd>Ramesh K. · Record reviewed</dd>
                    </div>
                  </dl>
                </div>
              </section>
              <section className="app-card assistance-card">
                <span className="assistance-icon danger-icon">
                  <ShieldAlert aria-hidden="true" />
                </span>
                <h2>Safety comes first</h2>
                <p>
                  Stop work and move to a safe area if there is immediate
                  danger. The marketplace is not an emergency service.
                </p>
                <button
                  className="button button-outline full-width"
                  type="button"
                  onClick={() => setIncidentOpen(true)}
                >
                  Report an issue
                </button>
              </section>
            </aside>
          </div>
        )}

        {incidentOpen && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setIncidentOpen(false);
            }}
          >
            <section
              className="incident-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="incident-title"
            >
              <div className="incident-header">
                <div>
                  <span>Rental RNT-204</span>
                  <h2 id="incident-title">Report an issue</h2>
                </div>
                <button
                  type="button"
                  aria-label="Close incident form"
                  onClick={() => setIncidentOpen(false)}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              {incidentSubmitted ? (
                <div className="incident-success">
                  <span className="success-mark">
                    <Check aria-hidden="true" />
                  </span>
                  <h3>Issue INC-031 has been reported</h3>
                  <p>
                    The supplier and support coordinator have been notified. You
                    can follow updates in the rental timeline.
                  </p>
                  <div className="incident-timeline-mini">
                    <div className="active">
                      <span />
                      <strong>Reported</strong>
                      <small>Now</small>
                    </div>
                    <div>
                      <span />
                      <strong>Supplier response</strong>
                      <small>Pending</small>
                    </div>
                    <div>
                      <span />
                      <strong>Resolution</strong>
                      <small>Pending</small>
                    </div>
                  </div>
                  <button
                    className="button button-navy full-width"
                    type="button"
                    onClick={() => setIncidentOpen(false)}
                  >
                    Return to rental
                  </button>
                </div>
              ) : (
                <form className="incident-form" onSubmit={submitIncident}>
                  <div className="danger-notice">
                    <ShieldAlert aria-hidden="true" />
                    <div>
                      <strong>Is anyone injured or in immediate danger?</strong>
                      <p>
                        Stop work, move to safety, and contact the appropriate
                        local emergency channel first. This form is not monitored
                        as an emergency service.
                      </p>
                    </div>
                  </div>
                  <fieldset className="choice-fieldset compact-choices">
                    <legend>Does this issue currently affect safety?</legend>
                    <label>
                      <input type="radio" name="safety" value="yes" required />
                      <span>
                        <strong>Yes</strong>
                        <small>Work is stopped or the area is unsafe</small>
                      </span>
                    </label>
                    <label>
                      <input type="radio" name="safety" value="no" required />
                      <span>
                        <strong>No</strong>
                        <small>No immediate safety impact</small>
                      </span>
                    </label>
                  </fieldset>
                  <div className="field">
                    <label htmlFor="issueType">Issue type</label>
                    <select id="issueType" required defaultValue="">
                      <option value="" disabled>
                        Select issue type
                      </option>
                      <option>Breakdown / machine stopped</option>
                      <option>Performance or attachment issue</option>
                      <option>Operator concern</option>
                      <option>Fuel or hour-meter disagreement</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="description">What happened?</label>
                    <textarea
                      id="description"
                      required
                      placeholder="Describe what you observed, when it started, and whether the machine can move safely."
                    />
                  </div>
                  <label className="request-replacement">
                    <input type="checkbox" />
                    <span>
                      <strong>Request a replacement machine</strong>
                      <small>
                        The supplier will confirm availability and timing.
                      </small>
                    </span>
                  </label>
                  <button className="upload-evidence" type="button">
                    <UploadCloud aria-hidden="true" />
                    <span>
                      <strong>Add photos or video</strong>
                      <small>Show the issue only from a safe position</small>
                    </span>
                  </button>
                  <div className="incident-actions">
                    <button
                      className="button button-outline"
                      type="button"
                      onClick={() => setIncidentOpen(false)}
                    >
                      Cancel
                    </button>
                    <button className="button button-danger" type="submit">
                      Submit issue report
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        )}
      </div>
    </AppShell>
  );
}
