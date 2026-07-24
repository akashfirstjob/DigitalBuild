/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Headphones,
  MapPin,
  ShieldCheck,
  TimerReset,
  Wrench,
} from "lucide-react";
import { Footer, Header, ResponsivePicture } from "./components/SiteChrome";

const trustFacts = [
  { icon: FileCheck2, label: "Business documents reviewed" },
  { icon: ClipboardCheck, label: "Equipment documents tracked" },
  { icon: Wrench, label: "Wet and dry hire supported" },
  { icon: Headphones, label: "Human-assisted matching" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <ResponsivePicture
              desktop="/images/marketplace-hero-desktop"
              mobile="/images/marketplace-hero-mobile"
              alt=""
              priority
              className="hero-photo"
              width={1600}
              height={1000}
            />
            <div className="hero-media-fade" />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Curated equipment rental</p>
              <h1>
                The right equipment.
                <br />
                <span>Verified suppliers.</span>
                <br />
                One request.
              </h1>
              <p className="hero-lede">
                Tell us what your site needs. We structure the requirement,
                invite suitable suppliers, and help you compare clear quotes.
              </p>
              <div className="button-row">
                <Link className="button button-amber" href="/request">
                  Request equipment <ArrowRight aria-hidden="true" />
                </Link>
                <Link className="button button-outline" href="/supplier">
                  List your equipment
                </Link>
              </div>
              <p className="microcopy">
                <BadgeCheck aria-hidden="true" /> Launch category: backhoe
                loaders in selected service areas
              </p>
            </div>

            <form className="quick-card" action="/request">
              <div className="quick-card-heading">
                <span className="step-kicker">Start a request</span>
                <span className="time-note">
                  <TimerReset aria-hidden="true" /> About 3 minutes
                </span>
              </div>
              <h2>What does your site need?</h2>
              <div className="field">
                <label htmlFor="equipment">Equipment type</label>
                <select id="equipment" name="equipment" defaultValue="backhoe">
                  <option value="backhoe">Backhoe loader</option>
                </select>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="pincode">Project pincode</label>
                  <input
                    id="pincode"
                    name="pincode"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    placeholder="e.g. 560001"
                  />
                </div>
                <div className="field">
                  <label htmlFor="date">Required from</label>
                  <input id="date" name="date" type="date" />
                </div>
              </div>
              <fieldset className="segmented-field">
                <legend>Hire type</legend>
                <div className="segmented">
                  <label>
                    <input type="radio" name="hire" value="wet" defaultChecked />
                    <span>Wet hire</span>
                  </label>
                  <label>
                    <input type="radio" name="hire" value="dry" />
                    <span>Dry hire</span>
                  </label>
                </div>
              </fieldset>
              <button className="button button-navy full-width" type="submit">
                Continue request <ArrowRight aria-hidden="true" />
              </button>
              <p className="form-assurance">
                No payment required. Your exact site address stays private until
                it is needed.
              </p>
            </form>
          </div>
        </section>

        <section className="trust-strip" aria-label="Marketplace trust facts">
          <div className="container trust-grid">
            {trustFacts.map(({ icon: Icon, label }) => (
              <div className="trust-item" key={label}>
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-white" id="how-it-works">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Built around the job to be done</p>
              <h2>From site requirement to comparable quotes</h2>
              <p>
                A focused process replaces scattered calls, unclear rate cards,
                and unstructured messages.
              </p>
            </div>
            <div className="steps-grid">
              {[
                {
                  n: "01",
                  icon: ClipboardCheck,
                  title: "Describe the requirement",
                  text: "Capture attachment, shift, duration, site access, fuel, and operator needs once.",
                },
                {
                  n: "02",
                  icon: ShieldCheck,
                  title: "Receive structured quotes",
                  text: "Suitable suppliers respond in the same commercial format, with review facts visible.",
                },
                {
                  n: "03",
                  icon: Handshake,
                  title: "Choose with clarity",
                  text: "Compare line items, shortlist a supplier, and document handover without guesswork.",
                },
              ].map(({ n, icon: Icon, title, text }) => (
                <article className="step-card" key={n}>
                  <div className="step-icon">
                    <Icon aria-hidden="true" />
                    <span>{n}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section category-section">
          <div className="container split-feature">
            <div className="cutout-stage">
              <div className="cutout-ring" aria-hidden="true" />
              <img
                src="/images/backhoe-loader-cutout.png"
                alt="Unbranded yellow backhoe loader shown from the front and side"
                width="1536"
                height="1024"
                loading="lazy"
              />
              <span className="availability-tag">
                <span className="status-dot" />
                Selected service areas
              </span>
            </div>
            <div className="feature-copy">
              <p className="eyebrow">A focused launch</p>
              <h2>Backhoe loaders, specified properly</h2>
              <p>
                The first release goes deep on one high-demand category. That
                keeps matching relevant and the request form practical.
              </p>
              <ul className="check-list">
                {[
                  "General-purpose, rock, trenching, and loading attachments",
                  "Wet hire with operator or dry hire options",
                  "Shift, overtime, fuel, and minimum billing captured",
                  "Mobilization and demobilization shown separately",
                ].map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
              <Link className="text-link" href="/request">
                Create a backhoe-loader request <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-navy">
          <div className="container split-feature reverse-on-mobile">
            <div className="feature-copy light-copy">
              <p className="eyebrow eyebrow-amber">Comparison without the fog</p>
              <h2>See what each quote actually includes</h2>
              <p>
                Rates are normalized into consistent rows. Taxes, mobilization,
                fuel, operator, overtime, and minimum billing stay visible.
              </p>
              <div className="comparison-mini" aria-label="Example quote summary">
                <div>
                  <span>Base hire rate</span>
                  <strong>₹1,850 / hour</strong>
                </div>
                <div>
                  <span>Mobilization</span>
                  <strong>₹8,500</strong>
                </div>
                <div>
                  <span>Operator</span>
                  <strong className="included">Included</strong>
                </div>
              </div>
              <Link className="button button-amber" href="/buyer/quotes">
                View quote comparison <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="framed-image">
              <ResponsivePicture
                desktop="/images/buyer-jobsite-request"
                alt="Site engineer creates an equipment request on a smartphone at an Indian construction project"
                width={1100}
                height={825}
              />
              <div className="image-caption">
                <MapPin aria-hidden="true" />
                Share locality first. Exact address comes later.
              </div>
            </div>
          </div>
        </section>

        <section className="section section-white" id="trust">
          <div className="container split-feature">
            <div className="framed-image procedural-image">
              <ResponsivePicture
                desktop="/images/equipment-handover-proof"
                alt="Two professionals document a backhoe loader handover with a phone and checklist"
                width={1100}
                height={825}
              />
            </div>
            <div className="feature-copy">
              <p className="eyebrow">Granular, not vague</p>
              <h2>Trust facts beside the decision</h2>
              <p>
                Each status explains what was reviewed and when. Document review
                does not claim to be a physical machine inspection.
              </p>
              <div className="verification-stack">
                <div className="verification-row">
                  <span className="verification-icon success">
                    <Check aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Insurance document reviewed</strong>
                    <span>Valid until 18 March 2027</span>
                  </div>
                </div>
                <div className="verification-row">
                  <span className="verification-icon info">
                    <Building2 aria-hidden="true" />
                  </span>
                  <div>
                    <strong>Business GST registration reviewed</strong>
                    <span>Reviewed 12 July 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section pathways-section" id="suppliers">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Two clear paths</p>
              <h2>Built for the people requesting and supplying equipment</h2>
            </div>
            <div className="pathway-grid">
              <article className="pathway-card buyer-path">
                <span className="path-label">For contractors</span>
                <h3>Make one clear request</h3>
                <p>
                  Compare commercial terms, review documents, and keep the
                  rental record in one place.
                </p>
                <Link className="button button-navy" href="/request">
                  Request equipment <ArrowRight aria-hidden="true" />
                </Link>
              </article>
              <article className="pathway-card supplier-path">
                <div className="path-image">
                  <ResponsivePicture
                    desktop="/images/supplier-fleet-yard"
                    alt="Indian equipment fleet manager reviews availability beside three backhoe loaders"
                    width={1100}
                    height={825}
                  />
                </div>
                <div className="path-content">
                  <span className="path-label">For fleet owners</span>
                  <h3>Respond to relevant work</h3>
                  <p>
                    Complete documents once, control availability, and quote
                    using a consistent commercial format.
                  </p>
                  <Link className="button button-outline" href="/supplier">
                    Explore supplier onboarding
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="help">
          <div className="container faq-grid">
            <div className="section-heading">
              <p className="eyebrow">Clear before you commit</p>
              <h2>Frequently asked questions</h2>
              <p>
                Need help describing the job? A matching coordinator can guide
                the request.
              </p>
              <a className="text-link" href="tel:+918000000000">
                Call +91 80000 00000
              </a>
            </div>
            <div className="accordion-list">
              {[
                [
                  "Does document review mean the machine was inspected?",
                  "No. We show exactly which business, equipment, insurance, or operator documents were reviewed. A document review is not a physical machine inspection.",
                ],
                [
                  "When is my exact site address shared?",
                  "The marketplace begins with locality and pincode. Exact access details are shared only when they are operationally required.",
                ],
                [
                  "Can I request an operator with the machine?",
                  "Yes. Choose wet hire and include shift and operator requirements in the request.",
                ],
                [
                  "Does the marketplace handle the physical handover?",
                  "The buyer and supplier complete the handover. The interface provides a structured photo, meter, fuel, attachment, and defect record.",
                ],
              ].map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <p className="eyebrow eyebrow-amber">Start with the requirement</p>
              <h2>Ready to source your next backhoe loader?</h2>
              <p>Save a draft, invite quotes, and decide with clearer facts.</p>
            </div>
            <Link className="button button-amber" href="/request">
              Request equipment <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Link className="mobile-bottom-cta" href="/request">
        Request equipment <ArrowRight aria-hidden="true" />
      </Link>
    </>
  );
}
