import Link from "@/components/Link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  CircleAlert,
  Cloud,
  FileUp,
  LockKeyhole,
  Save,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Brand } from "@/components/SiteChrome";

type FormData = {
  model: string;
  attachment: string;
  startDate: string;
  duration: string;
  shift: string;
  hireType: string;
  pincode: string;
  locality: string;
  access: string;
  notes: string;
  fuel: string;
  operator: string;
  company: string;
  gstin: string;
  deadline: string;
  consent: boolean;
};

const initialData: FormData = {
  model: "Standard 76 HP backhoe loader",
  attachment: "General-purpose bucket",
  startDate: "",
  duration: "",
  shift: "8-hour day shift",
  hireType: "wet",
  pincode: "",
  locality: "",
  access: "",
  notes: "",
  fuel: "buyer",
  operator: "supplier",
  company: "",
  gstin: "",
  deadline: "",
  consent: false,
};

const steps = [
  {
    title: "Equipment",
    short: "Equipment",
    description: "Select the machine and attachments needed for the work.",
  },
  {
    title: "When and how",
    short: "Schedule",
    description: "Tell suppliers when, how long, and how the machine will work.",
  },
  {
    title: "Project site",
    short: "Project site",
    description:
      "Share enough location and access detail for an accurate mobilization quote.",
  },
  {
    title: "Commercial details",
    short: "Commercial",
    description: "Set responsibilities and the deadline for comparable quotes.",
  },
  {
    title: "Review request",
    short: "Review",
    description: "Confirm the requirement before suitable suppliers are invited.",
  },
];

export default function RequestPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const draft = window.localStorage.getItem("buildfleet-rfq-draft");
    if (!draft) return;
    const restore = window.setTimeout(() => {
      try {
        setData({ ...initialData, ...JSON.parse(draft) });
      } catch {
        window.localStorage.removeItem("buildfleet-rfq-draft");
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("buildfleet-rfq-draft", JSON.stringify(data));
    const timer = window.setTimeout(() => setSaved(true), 350);
    const reset = window.setTimeout(() => setSaved(false), 1800);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(reset);
    };
  }, [data]);

  const update = (
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const stepFields = useMemo(
    () => [
      ["model", "attachment"],
      ["startDate", "duration", "shift", "hireType"],
      ["pincode", "locality", "access"],
      ["fuel", "operator", "company", "deadline"],
      ["consent"],
    ],
    [],
  );

  function validate() {
    const required: Record<string, string> = {
      model: "Select an equipment specification.",
      startDate: "Choose the date the machine is required.",
      duration: "Enter the expected hire duration.",
      pincode: "Enter the six-digit project pincode.",
      locality: "Enter the project locality.",
      access: "Select the site access condition.",
      company: "Enter the billing entity or company name.",
      deadline: "Choose a quote deadline.",
    };
    const nextErrors: Record<string, string> = {};
    for (const field of stepFields[step]) {
      if (field === "consent" && !data.consent) {
        nextErrors.consent =
          "Confirm the request details and supplier-contact consent.";
      } else if (
        field !== "consent" &&
        !String(data[field as keyof FormData]).trim()
      ) {
        nextErrors[field] = required[field] || "This field is required.";
      }
    }
    if (step === 2 && data.pincode && !/^\d{6}$/.test(data.pincode)) {
      nextErrors.pincode = "Enter a valid six-digit Indian pincode.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function next(event?: FormEvent) {
    event?.preventDefault();
    if (!validate()) return;
    if (step === steps.length - 1) {
      setSubmitted(true);
      window.localStorage.removeItem("buildfleet-rfq-draft");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStep((current) => current + 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="wizard-shell">
        <header className="wizard-header">
          <Brand />
          <Link href="/" className="wizard-close" aria-label="Close request">
            <X aria-hidden="true" />
          </Link>
        </header>
        <main id="main-content" className="submission-screen">
          <div className="success-mark">
            <Check aria-hidden="true" />
          </div>
          <p className="eyebrow">Request BF-1048 submitted</p>
          <h1>Your equipment request is ready for matching.</h1>
          <p>
            A matching coordinator will review the requirement before suitable
            suppliers receive an invitation. We will update you when quotes
            arrive.
          </p>
          <div className="next-steps-card">
            <h2>What happens next</h2>
            <ol>
              <li>
                <span>1</span>
                <div>
                  <strong>Requirement review</strong>
                  <small>Usually within 2 business hours</small>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Supplier matching</strong>
                  <small>Relevant suppliers receive a structured brief</small>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Quote comparison</strong>
                  <small>Compare clear commercial terms in your dashboard</small>
                </div>
              </li>
            </ol>
          </div>
          <div className="button-row center-buttons">
            <Link className="button button-navy" href="/buyer">
              Go to buyer dashboard <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-outline" href="/">
              Return to homepage
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="wizard-shell">
      <header className="wizard-header">
        <Brand />
        <div className="autosave-state" aria-live="polite">
          {saved ? (
            <>
              <Save aria-hidden="true" /> Draft saved
            </>
          ) : (
            <>
              <Cloud aria-hidden="true" /> Saving draft
            </>
          )}
        </div>
        <Link href="/" className="wizard-close" aria-label="Close request">
          <X aria-hidden="true" />
        </Link>
      </header>

      <div className="wizard-progress">
        <div className="wizard-progress-inner">
          <div className="mobile-step-label">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <strong>{steps[step].short}</strong>
          </div>
          <ol>
            {steps.map((item, index) => (
              <li
                key={item.title}
                className={`${index === step ? "active" : ""} ${
                  index < step ? "complete" : ""
                }`}
                aria-current={index === step ? "step" : undefined}
              >
                <span>
                  {index < step ? <Check aria-hidden="true" /> : index + 1}
                </span>
                <small>{item.short}</small>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <main id="main-content" className="wizard-main">
        <div className="wizard-intro">
          <Link className="back-link" href={step === 0 ? "/" : "#"} onClick={(e) => {
            if (step > 0) {
              e.preventDefault();
              setStep((current) => current - 1);
              setErrors({});
            }
          }}>
            <ArrowLeft aria-hidden="true" /> {step === 0 ? "Back to marketplace" : "Back"}
          </Link>
          <p className="eyebrow">
            Step {step + 1} · {steps[step].short}
          </p>
          <h1>{steps[step].title}</h1>
          <p>{steps[step].description}</p>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="error-summary" role="alert" tabIndex={-1}>
            <CircleAlert aria-hidden="true" />
            <div className="banner-copy">
              <strong>Check {Object.keys(errors).length} field(s)</strong>
              <span>
                We kept everything you entered. Correct the highlighted fields
                to continue.
              </span>
            </div>
          </div>
        )}

        <form className="wizard-form" onSubmit={next} noValidate>
          {step === 0 && (
            <div className="form-section">
              <div className="selection-card selected">
                <span className="selection-icon">
                  <Wrench aria-hidden="true" />
                </span>
                <div>
                  <strong>Backhoe loader</strong>
                  <span>Launch category</span>
                </div>
                <Check aria-hidden="true" />
              </div>
              <div className="field">
                <label htmlFor="model">Machine specification</label>
                <select
                  id="model"
                  value={data.model}
                  onChange={(e) => update("model", e.target.value)}
                  aria-invalid={Boolean(errors.model)}
                  aria-describedby={errors.model ? "model-error" : undefined}
                >
                  <option value="">Select specification</option>
                  <option>Standard 76 HP backhoe loader</option>
                  <option>Higher breakout-force backhoe loader</option>
                  <option>Not sure — help me specify</option>
                </select>
                {errors.model && (
                  <p className="field-error" id="model-error">
                    {errors.model}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="attachment">Required attachment</label>
                <select
                  id="attachment"
                  value={data.attachment}
                  onChange={(e) => update("attachment", e.target.value)}
                >
                  <option>General-purpose bucket</option>
                  <option>Rock breaker</option>
                  <option>Trenching bucket</option>
                  <option>Multiple attachments</option>
                  <option>Not sure</option>
                </select>
              </div>
              <div className="upload-zone">
                <FileUp aria-hidden="true" />
                <div>
                  <strong>Add a site photo or work sketch</strong>
                  <span>Optional · JPG, PNG or PDF up to 10 MB</span>
                </div>
                <button type="button">Choose file</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-section">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="startDate">Required from</label>
                  <input
                    id="startDate"
                    type="date"
                    value={data.startDate}
                    onChange={(e) => update("startDate", e.target.value)}
                    aria-invalid={Boolean(errors.startDate)}
                    aria-describedby={
                      errors.startDate ? "startDate-error" : undefined
                    }
                  />
                  {errors.startDate && (
                    <p className="field-error" id="startDate-error">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="duration">Expected duration</label>
                  <input
                    id="duration"
                    value={data.duration}
                    placeholder="e.g. 12 days"
                    onChange={(e) => update("duration", e.target.value)}
                    aria-invalid={Boolean(errors.duration)}
                    aria-describedby={
                      errors.duration ? "duration-error" : undefined
                    }
                  />
                  {errors.duration && (
                    <p className="field-error" id="duration-error">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="shift">Shift pattern</label>
                <select
                  id="shift"
                  value={data.shift}
                  onChange={(e) => update("shift", e.target.value)}
                >
                  <option>8-hour day shift</option>
                  <option>10-hour day shift</option>
                  <option>12-hour day shift</option>
                  <option>Night shift</option>
                  <option>Multiple shifts</option>
                </select>
              </div>
              <fieldset className="choice-fieldset">
                <legend>How should the machine be supplied?</legend>
                <label className={data.hireType === "wet" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="hireType"
                    checked={data.hireType === "wet"}
                    onChange={() => update("hireType", "wet")}
                  />
                  <span>
                    <strong>Wet hire</strong>
                    <small>Machine supplied with an operator</small>
                  </span>
                </label>
                <label className={data.hireType === "dry" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="hireType"
                    checked={data.hireType === "dry"}
                    onChange={() => update("hireType", "dry")}
                  />
                  <span>
                    <strong>Dry hire</strong>
                    <small>Your team provides a qualified operator</small>
                  </span>
                </label>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <div className="privacy-note">
                <LockKeyhole aria-hidden="true" />
                <div>
                  <strong>Your exact address is not needed yet</strong>
                  <span>
                    Locality and pincode are enough for matching and preliminary
                    mobilization quotes.
                  </span>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="pincode">Project pincode</label>
                  <input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    value={data.pincode}
                    placeholder="e.g. 560001"
                    onChange={(e) =>
                      update("pincode", e.target.value.replace(/\D/g, ""))
                    }
                    aria-invalid={Boolean(errors.pincode)}
                    aria-describedby={
                      errors.pincode ? "pincode-error" : undefined
                    }
                  />
                  {errors.pincode && (
                    <p className="field-error" id="pincode-error">
                      {errors.pincode}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="locality">Locality or area</label>
                  <input
                    id="locality"
                    value={data.locality}
                    placeholder="e.g. Whitefield, Bengaluru"
                    onChange={(e) => update("locality", e.target.value)}
                    aria-invalid={Boolean(errors.locality)}
                    aria-describedby={
                      errors.locality ? "locality-error" : undefined
                    }
                  />
                  {errors.locality && (
                    <p className="field-error" id="locality-error">
                      {errors.locality}
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="access">Site access condition</label>
                <select
                  id="access"
                  value={data.access}
                  onChange={(e) => update("access", e.target.value)}
                  aria-invalid={Boolean(errors.access)}
                  aria-describedby={errors.access ? "access-error" : undefined}
                >
                  <option value="">Select access condition</option>
                  <option>Standard truck access</option>
                  <option>Narrow access road</option>
                  <option>Weight or height restriction</option>
                  <option>Unpaved / difficult access</option>
                  <option>Not sure</option>
                </select>
                {errors.access && (
                  <p className="field-error" id="access-error">
                    {errors.access}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="notes">Mobilization notes</label>
                <textarea
                  id="notes"
                  value={data.notes}
                  placeholder="Gate timing, unloading area, route restriction, site contact process…"
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fuel">Fuel responsibility</label>
                  <select
                    id="fuel"
                    value={data.fuel}
                    onChange={(e) => update("fuel", e.target.value)}
                  >
                    <option value="buyer">Buyer supplies fuel</option>
                    <option value="supplier">Supplier includes fuel</option>
                    <option value="quote">Show both options in quote</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="operator">Operator responsibility</label>
                  <select
                    id="operator"
                    value={data.operator}
                    onChange={(e) => update("operator", e.target.value)}
                  >
                    <option value="supplier">Supplier provides operator</option>
                    <option value="buyer">Buyer provides operator</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="company">Billing entity / company name</label>
                <input
                  id="company"
                  value={data.company}
                  placeholder="e.g. Aarya Civil Projects Pvt Ltd"
                  onChange={(e) => update("company", e.target.value)}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={
                    errors.company ? "company-error" : undefined
                  }
                />
                {errors.company && (
                  <p className="field-error" id="company-error">
                    {errors.company}
                  </p>
                )}
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="gstin">
                    GSTIN <span className="optional">Optional</span>
                  </label>
                  <input
                    id="gstin"
                    value={data.gstin}
                    placeholder="29ABCDE1234F1Z5"
                    onChange={(e) =>
                      update("gstin", e.target.value.toUpperCase())
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="deadline">Quote deadline</label>
                  <input
                    id="deadline"
                    type="datetime-local"
                    value={data.deadline}
                    onChange={(e) => update("deadline", e.target.value)}
                    aria-invalid={Boolean(errors.deadline)}
                    aria-describedby={
                      errors.deadline ? "deadline-error" : undefined
                    }
                  />
                  {errors.deadline && (
                    <p className="field-error" id="deadline-error">
                      {errors.deadline}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-section review-section">
              <ReviewBlock
                title="Equipment"
                onEdit={() => setStep(0)}
                items={[
                  ["Category", "Backhoe loader"],
                  ["Specification", data.model],
                  ["Attachment", data.attachment],
                ]}
              />
              <ReviewBlock
                title="When and how"
                onEdit={() => setStep(1)}
                items={[
                  ["Required from", data.startDate || "Not entered"],
                  ["Duration", data.duration || "Not entered"],
                  ["Shift", data.shift],
                  ["Hire type", data.hireType === "wet" ? "Wet hire" : "Dry hire"],
                ]}
              />
              <ReviewBlock
                title="Project site"
                onEdit={() => setStep(2)}
                items={[
                  ["Locality", data.locality || "Not entered"],
                  ["Pincode", data.pincode || "Not entered"],
                  ["Access", data.access || "Not entered"],
                ]}
              />
              <ReviewBlock
                title="Commercial"
                onEdit={() => setStep(3)}
                items={[
                  [
                    "Fuel",
                    data.fuel === "buyer"
                      ? "Buyer supplies fuel"
                      : "Supplier includes fuel",
                  ],
                  ["Billing entity", data.company || "Not entered"],
                  ["Quote deadline", data.deadline || "Not entered"],
                ]}
              />
              <label className="consent-check">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? "consent-error" : undefined
                  }
                />
                <span>
                  I confirm this requirement is accurate and agree that suitable
                  suppliers may receive the structured brief and approximate
                  project locality.
                </span>
              </label>
              {errors.consent && (
                <p className="field-error" id="consent-error">
                  {errors.consent}
                </p>
              )}
              <div className="privacy-note">
                <ShieldCheck aria-hidden="true" />
                <div>
                  <strong>What suppliers will see</strong>
                  <span>
                    Equipment details, dates, locality, commercial
                    responsibilities, and quote deadline. Your exact address is
                    not included at this stage.
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="wizard-actions">
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                if (step > 0) setStep((current) => current - 1);
              }}
              disabled={step === 0}
            >
              <ChevronLeft aria-hidden="true" /> Back
            </button>
            <button type="submit" className="button button-navy">
              {step === steps.length - 1 ? "Submit request" : "Continue"}
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

function ReviewBlock({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: string[][];
  onEdit: () => void;
}) {
  return (
    <section className="review-block">
      <div className="review-block-header">
        <h2>{title}</h2>
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
      <dl>
        {items.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
