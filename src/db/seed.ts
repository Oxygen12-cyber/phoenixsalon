import "dotenv/config";
import { db } from "./index";
import { admin } from "./schema";

const username = process.env.ADMIN_USERNAME ?? "admin";
const password = process.env.ADMIN_PASSWORD ?? "phoenix123";

const main = async () => {
  await db.insert(admin).values({ username, password }).onConflictDoNothing();
  console.log(`Admin ready → username: ${username}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
