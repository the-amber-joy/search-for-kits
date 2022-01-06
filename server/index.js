const express = require("express");
const allKits = require("./KITS_SHIPPING_DATA.json");

const PORT = process.env.PORT || 3001;
const app = express();

/**
 * Endpoint to GET kits for the autocomplete function
 *
 * I would normally query a database here,
 * but since we're using JSON, we'll filter those records
 * using the submitted query string,
 * and send back the top 10 results since I don't want
 * an autocomplete to show more than 10 at a time
 */
app.get("/kits", (req, res) => {
  const regex = new RegExp(`^${req.query.qs}`);
  
  // find all kits with that match the query string 
  const filteredKits = allKits.filter(kit => {
    // Strip hyphens from the IDs for more human-friendly searchability
    const sanitizedId = kit.label_id.replace(/-/g, "");
    return regex.test(sanitizedId);
  });

  // sort results
  const sortedResults = filteredKits.sort((a, b) =>
    a.label_id.localeCompare(b.label_id)
  );
  
  const firstTenResults = sortedResults.slice(0, 10);

  // We love CORS...
  res.set("Access-Control-Allow-Origin", "*");

  // respond with the top 10 results
  res.json(firstTenResults);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
