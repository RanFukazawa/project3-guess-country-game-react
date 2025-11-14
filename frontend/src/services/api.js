const API_BASE = "/api";

export async function getRandomCountry() {
  try {
    const res = await fetch(`${API_BASE}/quiz/random`);

    if (!res.ok) {
      throw new Error("Failed to get random country");
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching random country:", err);
    throw err;
  }
}

export async function checkAnswer(countryId, userAnswer) {
  try {
    const res = await fetch(`${API_BASE}/quiz/check-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryId, userAnswer })
    });

    if (!res.ok) {
      throw new Error("Failed to check answer");
    }
    return await res.json();
  } catch (err) {
    console.error("Error checking answer:", err);
    throw err;
  }
}