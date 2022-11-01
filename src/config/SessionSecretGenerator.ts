import crypto from "crypto";
import fs from "fs";

function GenerateKey(): void {
  const SessionToken: string = crypto.randomBytes(48).toString("hex");

  fs.writeFileSync(__dirname + "/session_priv_key.pem", SessionToken);
}

GenerateKey();
