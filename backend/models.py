from pydantic import BaseModel, Field
from typing import Optional, List


class IncidentReport(BaseModel):
    incident_type: Optional[str] = None

    driver_name: Optional[str] = None
    driver_license: Optional[str] = None

    vehicle: Optional[str] = None
    license_plate: Optional[str] = None

    reason_for_stop: Optional[str] = None
    driver_statement: Optional[str] = None

    breathalyzer: Optional[str] = None
    location: Optional[str] = None

    observations: List[str] = Field(default_factory=list)

    missing_information: List[str] = Field(default_factory=list)

    report_narrative: Optional[str] = None


class ProcessResponse(BaseModel):
    transcript: str
    report: IncidentReport