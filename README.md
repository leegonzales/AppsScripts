# GPTPromptCompletion

GPTPromptCompletion is a JavaScript function that makes an API request to OpenAI's GPT-3 language model to complete a prompt. The function takes in four parameters: prompt (the prompt to be completed), input (additional input to the prompt), temperature (sampling temperature of the model), and maxTokens (maximum number of tokens to generate).

## WARNING - this is a good way to accidentally spend a LOT of money calling OpenAIs API endpoints. Be very careful in how you use this function in a spreadsheet. Also be sure your spending caps are set to a sensible limits on the Billing page for OpenAI. 

## Getting Started
1. Obtain an API key for OpenAI's GPT-3 API.
2. Create a new Google Sheet, open Extensions --> Apps Script 
3. Update the OPENAI_API_KEY constant with your API key.
4. (Optional) Update the GPT_MODEL and GPT_TEMP constants with the desired model and temperature, respectively.
5. Call the GPTPromptCompletion function with the desired parameters.

## Function Details

The function sends the API request using the UrlFetchApp.fetch method and implements error handling and retrying for failed requests with a maximum of 5 attempts and exponential backoff. The function returns the completed prompt as a string, or an error message if the request fails after 5 attempts or if the response from the API is invalid.

## Example Usage
'''
const completedPrompt = GPTPromptCompletion("What is the meaning of life?", "", 0.5, "text-davinci-002", 100);
console.log(completedPrompt);
'''

## Error Handling

The function includes error handling to catch any issues with the API response and returns a default error message if the response is invalid. The error message and any error messages from failed API requests will be logged to the console.
