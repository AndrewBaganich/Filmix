import app from "./app.js";
import { PORT } from "./config/uploadConfig.js"
import prisma from "./config/prisma.js";

async function main() {
  try {
    await prisma.$connect() ? console.log("Database not connected") : console.log("Database connected")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

main();