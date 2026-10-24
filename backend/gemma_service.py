def transcribe_audio(audio_bytes, mime_type):
    """
    MOCK VERSION.

    Later this will send the real audio to Gemma 4.
    For now it returns a fake transcript so we can
    test the entire backend/frontend connection.
    """

    return (
        "Officer Alex observed a Toyota Camry swerving between lanes. "
        "The vehicle license plate was 8ABC123. "
        "The driver stated, 'I had two beers.' "
        "A breathalyzer reading of 0.09 was recorded."
    )


def generate_report(transcript):
    """
    MOCK VERSION.

    Later this will send the transcript to Gemma 4.
    """

    return {
        "incident_type": "Traffic Stop",
        "driver_name": None,
        "driver_license": None,
        "vehicle": "Toyota Camry",
        "license_plate": "8ABC123",
        "reason_for_stop": "Vehicle observed swerving between lanes",
        "driver_statement": "I had two beers",
        "breathalyzer": "0.09",
        "location": None,
        "observations": [
            "Vehicle observed swerving between lanes"
        ],
        "missing_information": [
            "driver_name",
            "driver_license",
            "location"
        ],
        "report_narrative": (
            "Officer Alex observed a Toyota Camry swerving between "
            "lanes and initiated a traffic stop. The driver stated "
            "that they had consumed two beers. A breathalyzer "
            "reading of 0.09 was recorded."
        )
    }