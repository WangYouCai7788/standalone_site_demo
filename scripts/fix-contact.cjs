var fs = require("fs");
var p = "E:\\work\\project\\standalone_site_demo\\src\\views\\Contact.vue";
var c = fs.readFileSync(p, "utf-8");
// Update contact info
var reps = [
  ["info@sunshinetrade.com", "oldobj@163.com"],
  ["+86 755 8888 8888", "+86 136 4413 3963"],
  ["+86 138 0000 0000", "+86 136 4413 3963"],
  ["Shenzhen", "Shenyang"],
  ["\u6df1\u5733", "\u6c88\u9633"],
  ["Sunshine Trade", "OLD-OBJ Trading"],
  ["to_email: 'info@sunshinetrade.com'", "to_email: 'oldobj@163.com'"],
];
for (var i = 0; i < reps.length; i++) {
  while (c.indexOf(reps[i][0]) !== -1) {
    c = c.replace(reps[i][0], reps[i][1]);
  }
}
// Add API call after localStorage save
var marker = "localStorage.setItem('inquiries', JSON.stringify(saved))";
var apiBlock = "\n  try {\n    await fetch(window.location.origin + '/api/inquiry', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify(inquiry)\n    });\n  } catch(e) {\n    console.warn('API save failed:', e);\n  }";
c = c.replace(marker, marker + apiBlock);
fs.writeFileSync(p, c, "utf-8");
console.log("Contact.vue updated");
