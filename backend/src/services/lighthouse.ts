import lighthouse from "@lighthouse-web3/sdk";

export async function uploadToLighthouse(data: unknown): Promise<string> {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;
  
  if (!apiKey) {
    throw new Error("LIGHTHOUSE_API_KEY environment variable is required");
  }

  try {
    // Convert data to JSON string, then to Buffer
    const jsonString = JSON.stringify(data, null, 2);
    const buffer = Buffer.from(jsonString, 'utf-8');
    
    // Upload to Lighthouse
    const response = await lighthouse.uploadBuffer(buffer, apiKey);
    
    if (!response.data || !response.data.Hash) {
      throw new Error("Failed to upload to Lighthouse: No CID returned");
    }
    
    return response.data.Hash;
  } catch (error) {
    console.error("Lighthouse upload error:", error);
    throw new Error(`Failed to upload to Lighthouse: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
