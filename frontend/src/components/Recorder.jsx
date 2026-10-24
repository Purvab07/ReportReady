import { useEffect, useRef, useState } from "react";

function Recorder({ onComplete }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  async function startRecording() {
    setError("");

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.start();

      setSeconds(0);
      setRecording(true);

      timerRef.current = window.setInterval(() => {
        setSeconds((current) => current + 1);
      }, 1000);
    } catch (err) {
      setError(
        "Microphone access was not available. Allow microphone permission and try again."
      );
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;

    if (!recorder) return;

    recorder.onstop = () => {
      const audioBlob = new Blob(
        chunksRef.current,
        {
          type:
            recorder.mimeType ||
            "audio/webm",
        }
      );

      /*
       * 🚨 PURVA WILL CONNECT HERE LATER.
       *
       * Eventually:
       *
       * await processAudio(audioBlob)
       *
       * For now we pass the Blob upward,
       * but App.jsx deliberately uses mock data.
       */

      onComplete(audioBlob);
    };

    recorder.stop();

    window.clearInterval(timerRef.current);

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    setRecording(false);
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const remaining = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  }

  return (
    <section className="capturePage">
      <div className="pageIntro">
        <span className="eyebrow">
          NEW DOCUMENTATION
        </span>

        <h1>Capture the encounter.</h1>

        <p>
          Record encounter audio and let ReportReady prepare
          structured documentation for officer review.
        </p>
      </div>

      <div
        className={
          recording
            ? "recorderCard recorderCardLive"
            : "recorderCard"
        }
      >
        <div className="recordIcon">
          {recording ? "●" : "◉"}
        </div>

        {recording ? (
          <>
            <span className="liveBadge">
              <span></span>
              LIVE RECORDING
            </span>

            <h2>Listening to encounter...</h2>

            <div className="recordTimer">
              {formatTime(seconds)}
            </div>

            <div className="audioWave">
              {Array.from({ length: 28 }).map(
                (_, index) => (
                  <span
                    key={index}
                    style={{
                      height: `${
                        15 + ((index * 17) % 40)
                      }px`,
                    }}
                  ></span>
                )
              )}
            </div>

            <p>
              Capture explicit statements, observations,
              and measurements. All extracted information
              requires officer verification.
            </p>

            <button
              type="button"
              className="stopButton"
              onClick={stopRecording}
            >
              ■ Stop & Process
            </button>
          </>
        ) : (
          <>
            <span className="readyBadge">
              READY TO CAPTURE
            </span>

            <h2>Start a new encounter recording</h2>

            <p>
              For the demo, use a short staged encounter
              containing several clear facts.
            </p>

            <button
              type="button"
              className="recordButton"
              onClick={startRecording}
            >
              ● Start Recording
            </button>
          </>
        )}

        {error && (
          <div className="recorderError">
            ⚠ {error}
          </div>
        )}

        {!recording && (
          <div className="safetyNotice">
            <strong>
              Officer-controlled workflow
            </strong>

            <span>
              ReportReady produces a draft only. The officer
              must verify extracted information before it is
              approved.
            </span>
          </div>
        )}
      </div>

      <div className="captureSteps">
        <div>
          <span>01</span>
          <strong>Capture</strong>
          <p>Record encounter audio.</p>
        </div>

        <div>
          <span>02</span>
          <strong>Extract</strong>
          <p>Identify explicit facts.</p>
        </div>

        <div>
          <span>03</span>
          <strong>Review</strong>
          <p>Officer verifies the draft.</p>
        </div>

        <div>
          <span>04</span>
          <strong>Approve</strong>
          <p>Officer approves the reviewed record.</p>
        </div>
      </div>
    </section>
  );
}

export default Recorder;