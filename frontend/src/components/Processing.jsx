function Processing() {
  return (
    <section className="processingPage">
      <div className="processingCard">
        <div className="processingSpinner"></div>

        <span className="eyebrow">
          REPORTREADY AI
        </span>

        <h1>Preparing draft documentation...</h1>

        <p className="processingDescription">
          Processing the encounter into structured information
          for officer review.
        </p>

        <div className="processingSteps">
          <div className="processingDone">
            <span>✓</span>

            <p>
              <strong>Audio captured</strong>
              <small>Recording successfully received</small>
            </p>
          </div>

          <div className="processingDone">
            <span>✓</span>

            <p>
              <strong>Transcript generated</strong>
              <small>Encounter converted to text</small>
            </p>
          </div>

          <div className="processingActive">
            <span>●</span>

            <p>
              <strong>Identifying explicit facts</strong>
              <small>
                Separating statements and observations
              </small>
            </p>
          </div>

          <div>
            <span>○</span>

            <p>
              <strong>Building draft record</strong>
              <small>Preparing structured fields</small>
            </p>
          </div>
        </div>

        <div className="processingNotice">
          AI-generated content is never approved or submitted
          automatically.
        </div>
      </div>
    </section>
  );
}

export default Processing;