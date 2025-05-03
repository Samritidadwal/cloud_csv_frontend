async function fetchDefinition() {
  const term = document.getElementById("searchTerm").value.trim();
  const resultBox = document.getElementById("result");

  if (!term) {
    resultBox.innerHTML = "Please enter a term.";
    return;
  }

  resultBox.innerHTML = "Searching...";

  try {
    const response = await fetch(`https://your-api-id.execute-api.region.amazonaws.com/define?term=${term}`);
    const data = await response.json();

    if (response.status === 200 && data.definition) {
      resultBox.innerHTML = `<strong>${term}:</strong> ${data.definition}`;
    } else {
      resultBox.innerHTML = "❌ Definition not found.";
    }
  } catch (error) {
    resultBox.innerHTML = "⚠️ Error fetching data.";
    console.error("API Error:", error);
  }
}
