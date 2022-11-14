import crypto from "crypto";
import fs from "fs";

async function GenerateKeys(): Promise<any> {
  const keyPair = crypto.generateKeyPair(
    "rsa",
    {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    },
    (err: Error | null, publicKey: string, privateKey: string) => {
      if (err) throw err;
      fs.writeFileSync(__dirname + "/id_rsa_pub.pem", publicKey);
      fs.writeFileSync(__dirname + "/id_rsa_priv.pem", privateKey);
    }
  );
}

GenerateKeys();
