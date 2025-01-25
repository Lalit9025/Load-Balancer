import express, {Request, Response} from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
    console.log(`Request received on server2`);
    res.json({
        message:"welcome to server2"
    })
})
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK'})
})

const PORT = process.env.PORT2 || 8082;

app.listen(PORT ,() => {
    console.log(`server2 is running on ${PORT}`)
})