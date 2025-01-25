"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    console.log(`Request received on server1`);
    res.json({
        message: "welcome to server1"
    });
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
const PORT = process.env.PORT1 || 8081;
app.listen(PORT, () => {
    console.log(`server1 is running on ${PORT}`);
});
