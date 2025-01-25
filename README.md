# Load Balancer

This project is a simple load balancer built using Node.js and Express. It distributes incoming HTTP requests to multiple backend servers, ensuring that the traffic is balanced and system resources are used efficiently.

## Features

- Distributes requests between multiple backend servers.
- Performs health checks to ensure that only healthy servers are included in the load balancing.
- Automatically removes unhealthy servers from the list of available servers.
- Uses a round-robin strategy to distribute the traffic evenly across servers.

## Algorithm (Load Balancing)

1. **Backend Servers**: The load balancer keeps a list of available backend servers.
2. **Round-Robin Strategy**: Requests are forwarded to the backend servers in a cyclic manner (i.e., each incoming request is forwarded to the next server in line).
3. **Health Checks**: Every few seconds, the load balancer checks the health of the backend servers by sending a request to the `/health` endpoint of each server.
   - If a server responds with a status code 200, it is considered healthy and remains in the list.
   - If a server is unhealthy or unresponsive, it is removed from the list.
4. **Server Addition**: When a previously removed server becomes healthy again, it is re-added to the pool of available servers.

## Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Lalit9025/Load-Balancer.git
   cd Load-Balancer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory to configure the port for the load balancer:

   ```bash
   PORT=80
   ```

4. Start the load balancer:

   ```bash
   npm run start
   ```

5. Start the backend servers (`server1` and `server2`) on their respective ports (`8081`, `8082`).

## Example Usage

Once the load balancer is running, it will start distributing requests to backend servers. You can test it by sending requests to the load balancer's endpoint (e.g., `http://localhost`).

```bash
curl http://localhost
```

---
