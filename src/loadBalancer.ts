import express, { Request, Response, NextFunction} from "express";
import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const allServers = [
    'http://localhost:8081',
    'http://localhost:8082'
];


//active servers
let servers = [...allServers];
let currentIndex = 0;

function nextServer(){
    currentIndex++;
    if(currentIndex >= servers.length){
        currentIndex = 0;
    }

    return servers[currentIndex];
}

const healthCheck = async () => {
    for(let i=0; i<servers.length; i++){
        try {
            const result = await axios.get(servers[i] + '/health');
            if(result.status !== 200){
                console.log(`server ${servers[i]} is unhealthy`)
                servers.splice(i,1);
                i--;
            }
        } catch (error) {
            console.log(`Error while connecting to ${servers[i]}`)
            servers.splice(i,1);
            i--;
        }
    }

    setInterval(async () => {
        for (const server of allServers) {
            if (!servers.includes(server)) {
                try {
                    const result = await axios.get(server + '/health');
                    if (result.status === 200) {
                        console.log(`Server ${server} is back online and added to the pool`);
                        servers.push(server);
                    }
                } catch (error) {
                    console.log(`Server ${server} is still offline`);
                }
            }
        }
    }, 5000);
}

healthCheck();

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
})

app.get('*', async(req: Request, res: Response) => {
    const server = nextServer();
    try {
        console.log("load babalcner hitted")
        const result = await axios.get(server + req.url);
        res.status(result.status).send(result.data)
    } catch (error) {
        res.status(500).send('failed to connect to backend')
    }
})

const PORT = process.env.PORT3 || 80;
app.listen(PORT, ()=>{
    console.log(`load balancer running on PORT ${PORT}`)
})