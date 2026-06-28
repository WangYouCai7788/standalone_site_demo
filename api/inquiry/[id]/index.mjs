export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") { return res.status(200).end(); }
  var fs = require("fs"), path = require("path");
  var dataFile = fs.existsSync(path.join(process.cwd(), "data")) ? path.join(process.cwd(), "data", "inquiries.json") : "/tmp/inquiries.json";
  function read() { try { if (fs.existsSync(dataFile)) return JSON.parse(fs.readFileSync(dataFile, "utf-8")); } catch(e) {} return []; }
  function save(a) { try { var d = path.dirname(dataFile); if (!fs.existsSync(d)) fs.mkdirSync(d, {recursive:true}); fs.writeFileSync(dataFile, JSON.stringify(a,null,2),"utf-8"); } catch(e) {} }
  var id = req.query.id;
  if (!id) return res.status(400).json({error:"ID required"});
  var list = read(), idx = list.findIndex(function(i){return i.id===id;});
  if (idx===-1) return res.status(404).json({error:"Not found"});
  if (req.method==="PATCH") { list[idx].status="read"; save(list); return res.json({success:true}); }
  if (req.method==="DELETE") { list.splice(idx,1); save(list); return res.json({success:true}); }
  return res.status(405).json({error:"Method not allowed"});
}
