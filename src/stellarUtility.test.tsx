import StellarSdk from "stellar-sdk";
import { StellarUtils } from "./stellarUtility";

test("Get stellar public key", async () => {
  const publicKey = await StellarUtils.getStellarPublicKey(
    "SD7N6KJ75YCOLL6GFLKKGGFJZFAKGVY6ODFPRFVUQCWUYWCE4XYXUPYV"
  );
  expect(publicKey).toContain('P')
});
