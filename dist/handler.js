"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const renderer_1 = __importDefault(require("@react-pdf/renderer"));
const renderer_2 = require("@react-pdf/renderer");
const mustache = require('mustache');
function MyView(props) {
    if ('type' in props.view) {
        switch (props.view.type) {
            case 'text':
                const _a = props.view, { content } = _a, other = __rest(_a, ["content"]);
                console.log(content);
                return React.createElement(renderer_2.Text, Object.assign({}, other), mustache.render(content, props.input));
            case 'image':
                const _b = props.view, { source } = _b, otherImageProps = __rest(_b, ["source"]);
                const renderedSource = typeof source === 'string' ? mustache.render(source, props.input) : source;
                return React.createElement(renderer_2.Image, Object.assign({ source: renderedSource }, otherImageProps));
        }
    }
    const _c = props.view, { children } = _c, other = __rest(_c, ["children"]);
    return React.createElement(renderer_2.View, Object.assign({}, other), (children || []).map(view => React.createElement(MyView, { input: props.input, view: view })));
}
function MyDocument(props) {
    const _a = props.document, { pages } = _a, other = __rest(_a, ["pages"]);
    return (React.createElement(renderer_2.Document, Object.assign({}, other), pages.map((_a) => {
        var { views } = _a, other = __rest(_a, ["views"]);
        return (React.createElement(renderer_2.Page, Object.assign({}, other), views.map(view => React.createElement(MyView, { input: props.input, view: view }))));
    })));
}
function convertToBuffer(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            let buf = [];
            stream.on('data', (d) => buf.push(d));
            stream.on('end', () => resolve(Buffer.concat(buf)));
        });
    });
}
function renderTemplate(template, input) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield renderer_1.default.renderToStream(React.createElement(MyDocument, { document: template, input: input }));
        return yield convertToBuffer(res);
    });
}
exports.renderTemplate = renderTemplate;
//# sourceMappingURL=handler.js.map