import { useState } from "react";

function ReportForm({
  report,
  setReport,
  onNewRecording,
}) {
  const [approved, setApproved] = useState(false);

  const [checks, setChecks] = useState({
    driver: false,
    vehicle: false,
    statements: false,
    measurement: false,
    narrative: false,
  });

  function updateTopLevel(field, value) {
    setReport((current) => ({
      ...current,
      [field]: value,
    }));

    setApproved(false);
  }

  function updateDriver(field, value) {
    setReport((current) => ({
      ...current,
      driver: {
        ...current.driver,
        [field]: value,
      },
    }));

    setApproved(false);
  }

  function updateVehicle(field, value) {
    setReport((current) => ({
      ...current,
      vehicle: {
        ...current.vehicle,
        [field]: value,
      },
    }));

    setApproved(false);
  }

  function updateMeasurement(value) {
    setReport((current) => ({
      ...current,
      measurements: {
        ...current.measurements,
        breathAlcohol: value,
      },
    }));

    setApproved(false);
  }

  const missingFields = [];

  if (!report.location.trim()) {
    missingFields.push("Incident location");
  }

  if (!report.driver.license.trim()) {
    missingFields.push("Driver license");
  }

  const allChecksComplete =
    Object.values(checks).every(Boolean);

  const canApprove =
    missingFields.length === 0 &&
    allChecksComplete;

  function toggleCheck(field) {
    setChecks((current) => ({
      ...current,
      [field]: !current[field],
    }));

    setApproved(false);
  }

  function approveDraft() {
    if (!canApprove) {
      return;
    }

    setApproved(true);
  }

  return (
    <section className="reportPage">
      <header className="reportHeader">
        <div>
          <span className="eyebrow">
            AI-ASSISTED DRAFT
          </span>

          <h1>Traffic Enforcement Record</h1>

          <p>
            DUI / traffic-stop investigation draft prepared
            from captured encounter information.
          </p>
        </div>

        <div className="reportHeaderActions">
          <span className="aiBadge">
            ✦ AI GENERATED
          </span>

          <button
            type="button"
            className="secondaryButton"
            onClick={onNewRecording}
          >
            + New Recording
          </button>
        </div>
      </header>

      <div className="reportWarning">
        <div>!</div>

        <p>
          <strong>Officer review required</strong>

          <span>
            This is an AI-assisted draft, not an official
            submitted report. Verify all facts, measurements,
            statements, and attributions before approval.
          </span>
        </p>
      </div>

      <div className="reportLayout">
        <div className="reportMain">
          {/* INCIDENT */}

          <section className="reportSection">
            <SectionHeader
              number="01"
              title="Incident"
              description="Basic event information"
            />

            <div className="fieldGrid">
              <Field
                label="Incident Type"
                value={report.incidentType}
                onChange={(value) =>
                  updateTopLevel(
                    "incidentType",
                    value
                  )
                }
              />

              <Field
                label="Date"
                value={report.date}
                onChange={(value) =>
                  updateTopLevel("date", value)
                }
              />

              <Field
                label="Time"
                value={report.time}
                onChange={(value) =>
                  updateTopLevel("time", value)
                }
              />

              <Field
                label="Location"
                value={report.location}
                missing={!report.location.trim()}
                onChange={(value) =>
                  updateTopLevel(
                    "location",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* DRIVER */}

          <section className="reportSection">
            <SectionHeader
              number="02"
              title="Driver"
              description="Identification and attributed statements"
            />

            <div className="fieldGrid">
              <Field
                label="Driver Name"
                value={report.driver.name}
                onChange={(value) =>
                  updateDriver("name", value)
                }
              />

              <Field
                label="Driver License"
                value={report.driver.license}
                missing={
                  !report.driver.license.trim()
                }
                onChange={(value) =>
                  updateDriver(
                    "license",
                    value
                  )
                }
              />
            </div>

            <TextField
              label="Driver Statement"
              value={report.driverStatement}
              onChange={(value) =>
                updateTopLevel(
                  "driverStatement",
                  value
                )
              }
            />
          </section>

          {/* VEHICLE */}

          <section className="reportSection">
            <SectionHeader
              number="03"
              title="Vehicle"
              description="Vehicle information captured during encounter"
            />

            <div className="fieldGrid">
              <Field
                label="Vehicle"
                value={
                  report.vehicle.description
                }
                onChange={(value) =>
                  updateVehicle(
                    "description",
                    value
                  )
                }
              />

              <Field
                label="License Plate"
                value={report.vehicle.plate}
                onChange={(value) =>
                  updateVehicle(
                    "plate",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* OBSERVATIONS */}

          <section className="reportSection">
            <SectionHeader
              number="04"
              title="Officer Observations"
              description="Facts captured from the source encounter"
            />

            <TextField
              label="Reason for Stop"
              value={report.reasonForStop}
              onChange={(value) =>
                updateTopLevel(
                  "reasonForStop",
                  value
                )
              }
            />

            <TextField
              label="Observed Behavior"
              value={report.observations}
              onChange={(value) =>
                updateTopLevel(
                  "observations",
                  value
                )
              }
            />
          </section>

          {/* MEASUREMENT */}

          <section className="reportSection">
            <SectionHeader
              number="05"
              title="Measurements"
              description="Recorded values requiring source verification"
            />

            <div className="measurementBox">
              <div>
                <span>
                  Breath-Alcohol Reading
                </span>

                <input
                  value={
                    report.measurements
                      .breathAlcohol
                  }
                  onChange={(event) =>
                    updateMeasurement(
                      event.target.value
                    )
                  }
                />
              </div>

              <p>
                ⚠ Verify against the source instrument or
                official measurement record.
              </p>
            </div>
          </section>

          {/* NARRATIVE */}

          <section className="reportSection">
            <SectionHeader
              number="06"
              title="Draft Narrative"
              description="Generated from extracted information"
            />

            <TextField
              label="AI-Generated Narrative"
              large
              value={report.narrative}
              onChange={(value) =>
                updateTopLevel(
                  "narrative",
                  value
                )
              }
            />
          </section>
        </div>

        {/* REVIEW PANEL */}

        <aside className="reviewPanel">
          <span className="eyebrow">
            REVIEW STATUS
          </span>

          <h2>Officer Verification</h2>

          <div className="reviewStats">
            <div>
              <span>Missing fields</span>

              <strong
                className={
                  missingFields.length
                    ? "warningValue"
                    : ""
                }
              >
                {missingFields.length}
              </strong>
            </div>

            <div>
              <span>Checks completed</span>

              <strong>
                {
                  Object.values(checks).filter(
                    Boolean
                  ).length
                }
                /5
              </strong>
            </div>
          </div>

          {missingFields.length > 0 && (
            <div className="missingInformation">
              <strong>
                Missing Information
              </strong>

              {missingFields.map((field) => (
                <div key={field}>
                  <span>!</span>
                  {field}
                </div>
              ))}
            </div>
          )}

          <div className="verificationList">
            <VerificationCheck
              label="Driver information reviewed"
              checked={checks.driver}
              onChange={() =>
                toggleCheck("driver")
              }
            />

            <VerificationCheck
              label="Vehicle information reviewed"
              checked={checks.vehicle}
              onChange={() =>
                toggleCheck("vehicle")
              }
            />

            <VerificationCheck
              label="Statements reviewed"
              checked={checks.statements}
              onChange={() =>
                toggleCheck("statements")
              }
            />

            <VerificationCheck
              label="Measurement verified"
              checked={checks.measurement}
              onChange={() =>
                toggleCheck("measurement")
              }
            />

            <VerificationCheck
              label="Narrative reviewed"
              checked={checks.narrative}
              onChange={() =>
                toggleCheck("narrative")
              }
            />
          </div>

          <button
            type="button"
            className={
              approved
                ? "approveDraftButton approved"
                : "approveDraftButton"
            }
            disabled={!canApprove}
            onClick={approveDraft}
          >
            {approved
              ? "✓ Draft Approved"
              : "✓ Approve Draft"}
          </button>

          {!canApprove && (
            <p className="approvalHelp">
              Complete missing fields and all verification
              checks before approval.
            </p>
          )}

          <div className="legalBoundary">
            ReportReady assists with documentation only. It
            does not determine impairment, guilt, probable
            cause, charges, or legal disposition.
          </div>
        </aside>
      </div>
    </section>
  );
}

function SectionHeader({
  number,
  title,
  description,
}) {
  return (
    <div className="sectionHeader">
      <span>{number}</span>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  missing = false,
}) {
  return (
    <label className="field">
      <span>{label}</span>

      <div className="fieldControl">
        <input
          value={value}
          placeholder={
            missing
              ? "Officer input required"
              : ""
          }
          className={
            missing ? "missingField" : ""
          }
          onChange={(event) =>
            onChange(event.target.value)
          }
        />

        <span
          className={
            missing
              ? "fieldIndicator fieldMissing"
              : "fieldIndicator fieldComplete"
          }
        >
          {missing ? "!" : "✓"}
        </span>
      </div>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  large = false,
}) {
  return (
    <label className="textField">
      <span>{label}</span>

      <textarea
        rows={large ? 7 : 4}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </label>
  );
}

function VerificationCheck({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="verificationCheck">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span>{label}</span>
    </label>
  );
}

export default ReportForm;