/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */

export async function request(apiUrl) {
  // required for fetch to work in node.  should move this to a config file
  const URL = 'http://localhost:8080';
  try {
    const response = await fetch(`${URL}/${apiUrl}`);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${apiUrl}:`, error.message); 
    throw new Error(`Failed to fetch from ${apiUrl}: ${error.message}`);
  }
}
