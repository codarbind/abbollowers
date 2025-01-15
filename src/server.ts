import app from "./app";
import { envconfig } from "./config/env";

const PORT = envconfig.port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
