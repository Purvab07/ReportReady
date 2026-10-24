import { useState } from "react";

import Header from "./components/Header";
import Recorder from "./components/Recorder";
import Processing from "./components/Processing";
import ReportForm from "./components/ReportForm";

import { processAudio } from "./services/api";

import "./App.css";

function convertBackendReport(data) {
  const backendReport = data?.report || {};

  return {
    incidentType:
      backendReport.incident_type || "",

    date:
      backendReport.date || "",

    time:
      backendReport.time || "",

    location:
      backendReport.location || "",

    driver: {
      name:
        backendReport.driver_name || "",

      license:
        backendReport.driver_license || "",
    },

    vehicle: {
      description:
        backendReport.vehicle || "",

      plate:
        backendReport.license_plate || "",
    },

    reasonForStop:
      backendReport.reason_for_stop || "",

    observations: Array.isArray(
      backendReport.observations
    )
      ? backendReport.observations.join("\n")
      : backendReport.observations || "",

    driverStatement:
      backendReport.driver_statement || "",

    measurements: {
      breathAlcohol:
        backendReport.breathalyzer || "",
    },

    narrative:
      backendReport.report_narrative || "",
  };
}

function App() {
  const [screen, setScreen] =
    useState("capture");

  const [report, setReport] =
    useState(null);

  const [error, setError] =
    useState("");

  async function handleRecordingComplete(
    audioBlob
  ) {
    setError("");
    setScreen("processing");

    try {
      const data =
        await processAudio(audioBlob);

      console.log(
        "BACKEND RESPONSE:",
        data
      );

      console.log(
        "TRANSCRIPT:",
        data.transcript
      );

      const convertedReport =
        convertBackendReport(data);

      setReport(convertedReport);
      setScreen("report");
    } catch (err) {
      console.error(
        "PROCESSING ERROR:",
        err
      );

      setError(
        err.message ||
          "Failed to process recording."
      );

      setScreen("capture");
    }
  }

  function startNewRecording() {
    setError("");
    setReport(null);
    setScreen("capture");
  }

  return (
    <div className="app">
      <Header />

      <main className="mainContent">

        {error && (
          <div className="connectionError">
            <strong>
              Processing failed
            </strong>

            <span>{error}</span>
          </div>
        )}

        {screen === "capture" && (
          <Recorder
            onComplete={
              handleRecordingComplete
            }
          />
        )}

        {screen === "processing" && (
          <Processing />
        )}

        {screen === "report" &&
          report && (
            <ReportForm
              report={report}
              setReport={setReport}
              onNewRecording={
                startNewRecording
              }
            />
          )}
      </main>
    </div>
  );
}

export default App;