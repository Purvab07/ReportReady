const API_URL = "http://127.0.0.1:8000";

export async function processAudio(audioBlob) {
  const formData = new FormData();

  formData.append(
    "file",
    audioBlob,
    "recording.webm"
  );

  const response = await fetch(
    `${API_URL}/api/process`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Backend error: ${errorText}`
    );
  }

  return await response.json();
}