"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const handler_1 = require("./handler");
const types_1 = require("./types");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const myImage = path_1.default.join(__dirname, './images/myimage.jpg');
myImage.replace("&#x2F", "/");
const url = "https://picjumbo.com/wp-content/uploads/pienza-town-in-tuscany_free_stock_photos_picjumbo_DSC04564-2210x1473.jpg";
const newUrl = "www.react-pdf.org/test.jpg";
handler_1.renderTemplate(types_1.template, { firstName: 'Andrea', lastName: 'Lunetta', age: 34, url, date: Date.now() }).then(res => {
    fs_1.writeFileSync('example.pdf', res);
});
//# sourceMappingURL=run.js.map