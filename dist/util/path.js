"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicDir = void 0;
const path_1 = __importDefault(require("path"));
let rootDir = '';
const fileName = (_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename;
if (fileName) {
    rootDir = path_1.default.dirname(fileName);
}
exports.publicDir = path_1.default.dirname('../public');
exports.default = rootDir;
