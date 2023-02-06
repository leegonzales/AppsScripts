/**
 * Gsheet Apps Script Functions for accessing OpenAIs GPT models via API
 * 
 */

const OPENAI_API_KEY = ""; // <- PASTE YOUR SECRET KEY HERE
const OPENAI_API_URL = "https://api.openai.com/v1/completions";
const GPT_MODEL = "text-davinci-003";
const GPT_TEMP = .7;
const MAX_TOKENS = 256;

function GPTPromptCompletionInput(prompt, input = "", temperature = GPT_TEMP, model = GPT_MODEL, maxTokens = MAX_TOKENS) {
   if (prompt === "") {
    return "";
  }
  const payload = {
    model: model,
    prompt: `${prompt} ${input}`,
    temperature: temperature,
    max_tokens: maxTokens,
  };
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    muteHttpExceptions: true,
    followRedirects: true,
    timeout: 60000 // Increased the timeout value to 60 seconds
  };

  const backoff = (n) => {
    Utilities.sleep(Math.pow(2, n) * 1000 + Math.floor(Math.random() * 1000));
  };

  let response;
  let attempt = 0;
  while (attempt < 5) { // Attempt a maximum of 5 times
    try {
      response = UrlFetchApp.fetch(OPENAI_API_URL, options);
      break;
    } catch (error) {
      console.error(`Request failed with error: ${error}. Retrying in ${Math.pow(2, attempt)} seconds...`);
      backoff(attempt);
      attempt++;
    }
  }

  if (!response) {
    console.error("Request failed after maximum attempts.");
    return "Error completing prompt, Request failed after maximum attempts of " + attempt;
  }

  const responseText = response.getContentText();
  let responseJson;
  try {
    responseJson = JSON.parse(responseText);
  } catch (error) {
    console.error(`Failed to parse API response: ${error}`);
    return "Error completing prompt, return was " + responseText;
  }

  if (!responseJson.choices || !Array.isArray(responseJson.choices) || responseJson.choices.length === 0) {
    console.error("Response from API does not contain a valid 'choices' array");
    return "Error completing prompt, return was " + responseText;
  }

  const { text } = responseJson.choices[0];
  if (typeof text !== 'string') {
    console.error("Response from API does not contain a valid 'text' string");
    return "Error completing prompt, return was " + responseText;
  }

  return text.trim();

}
