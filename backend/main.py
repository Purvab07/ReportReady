from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.gemma_service import transcribe_audio, generate_report
from backend.models import ProcessResponse

app = FastAPI(
    title="ReportReady API",
    version="1.0"
)


# Allows Jada's frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "ReportReady"
    }


@app.post("/api/process", response_model=ProcessResponse)
async def process_encounter(file: UploadFile = File(...)):
    try:
        audio_bytes = await file.read()

        if not audio_bytes:
            raise HTTPException(
                status_code=400,
                detail="Audio file is empty"
            )

        transcript = transcribe_audio(
            audio_bytes,
            file.content_type
        )

        report = generate_report(transcript)

        return {
            "transcript": transcript,
            "report": report
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Processing error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to process encounter"
        )