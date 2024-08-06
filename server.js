import express from "express";
import corsAnywhere from "cors-anywhere";

const app = express();
const port = 8080;

// Create a CORS Anywhere server
corsAnywhere
  .createServer({
    // Define options here (e.g., originBlacklist, originWhitelist)
  })
  .listen(port, () => {
    console.log(`CORS Proxy running on port ${port}`);
  });
