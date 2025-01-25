"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allServers = [
    'http://localhost:8081',
    'http://localhost:8082'
];
//active servers
let servers = [...allServers];
let currentIndex = 0;
function nextServer() {
    currentIndex++;
    if (currentIndex >= servers.length) {
        currentIndex = 0;
    }
    return servers[currentIndex];
}
const healthCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < servers.length; i++) {
        try {
            const result = yield axios_1.default.get(servers[i] + '/health');
            if (result.status !== 200) {
                console.log(`server ${servers[i]} is unhealthy`);
                servers.splice(i, 1);
                i--;
            }
        }
        catch (error) {
            console.log(`Error while connecting to ${servers[i]}`);
            servers.splice(i, 1);
            i--;
        }
    }
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        for (const server of allServers) {
            if (!servers.includes(server)) {
                try {
                    const result = yield axios_1.default.get(server + '/health');
                    if (result.status === 200) {
                        console.log(`Server ${server} is back online and added to the pool`);
                        servers.push(server);
                    }
                }
                catch (error) {
                    console.log(`Server ${server} is still offline`);
                }
            }
        }
    }), 5000);
});
healthCheck();
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});
app.get('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const server = nextServer();
    try {
        console.log("load babalcner hitted");
        const result = yield axios_1.default.get(server + req.url);
        res.status(result.status).send(result.data);
    }
    catch (error) {
        res.status(500).send('failed to connect to backend');
    }
}));
const PORT = process.env.PORT3 || 80;
app.listen(PORT, () => {
    console.log(`load balancer running on PORT ${PORT}`);
});
