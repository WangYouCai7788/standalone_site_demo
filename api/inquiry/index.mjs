export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Try to read from data file (dev) or /tmp (vercel)
  var fs = require("fs");
  var path = require("path");
  var dataDir = path.join(process.cwd(), "data");
  var tmpFile = "/tmp/inquiries.json";
  var dataFile = fs.existsSync(dataDir) ? path.join(dataDir, "inquiries.json") : tmpFile;

  function readInquiries() {
    try {
      if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      }
    } catch(e) {}
    return [];
  }

  function saveInquiries(arr) {
    try {
      var dir = path.dirname(dataFile);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2), "utf-8");
    } catch(e) { console.error("save error:", e); }
  }

  if (req.method === "GET") {
    var inquiries = readInquiries();
    return res.status(200).json({ inquiries });
  }

  if (req.method === "POST") {
    var body = req.body || {};
    if (!body.name || !body.email || !body.message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    var inquiry = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      company: body.company || "",
      product: body.product || "",
      message: body.message,
      quantity: body.quantity || "",
      status: "unread",
      createdAt: new Date().toISOString()
    };
    var list = readInquiries();
    list.unshift(inquiry);
    saveInquiries(list);
    return res.status(201).json({ success: true, inquiry });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
