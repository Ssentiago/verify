import qrcode from "qrcode";

import fs from "fs";
import path from "path";

export async function generateQRCode(id) {
  const link = `https://ssentiago.github.io/verify/?id=${id}`;
  try {
    await qrcode.toFile(`./qr-codes/${id}.png`, link, {
      color: {
        dark: "#000000", // чёрный
        light: "#FFFFFFFF", // белый
      },
      width: 600,
      margin: 2,
    });
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    throw err;
  }
}

async function main() {
  const employeeData = fs.readFileSync(
    path.join(".", "employees.json"),
    "utf-8"
  );
  const employees = JSON.parse(employeeData);
  const ids = employees.map((emp) => emp.id);
  for (const id of ids) {
    await generateQRCode(id);
    console.log(`Generated QR code for ${id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
