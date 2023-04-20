
import app from "./app";
require('dotenv').config();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(port);
    console.log(`app is running in port ${port}`);
});
