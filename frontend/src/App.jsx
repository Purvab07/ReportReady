import { useState } from "react";

import Header from "./components/Header";
import Recorder from "./components/Recorder";
import Processing from "./components/Processing";
import ReportForm from "./components/ReportForm";

import { mockReport } from "./mock/mockReport";

import "./App.css";

function App() {
  const [screen, setScreen] =
    useState("capture");

  const [report, setReport] =
    useState(mockReport);

  function handleRecordingComplete(audioBlob) {
    /*
     * 🚨 PURVA CONNECTS HERE LATER.
     *
     * Right now:
     * audioBlob exists but we DO NOT send it anywhere.
     *
     * We fake the processing delay and then display
     * mockReport.
     */

    console.log(
      "Demo audio captured:",
      audioBlob
    );

    setScreen("processing");

    window.setTimeout(() => {
      setReport(mockReport);
      setScreen("report");
    }, 2200);
  }

  function startNewRecording() {
    setReport(mockReport);
    setScreen("capture");
  }

  return (
    <div className="app">
      <Header />

      <main className="mainContent">
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

        {screen === "report" && (
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