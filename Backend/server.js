import app from "./app.js";
import { config } from "dotenv";
import connectToDB from "./config/dbConnection.js";
config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async (err) => {
  await connectToDB();
  if (err) {
    console.error(`Error starting the server: ${err}`);
  } else {
    console.log(`App is running at http://localhost:${PORT}`);
  }
});

export default app;