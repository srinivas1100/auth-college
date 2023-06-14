
import app from "./app";
import { config } from "./config/config";

app.listen(config.server.port, () => {
    console.log(config.server.port);
    console.log(`app is running in port ${config.server.port}`);
});
