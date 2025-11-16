import fs from "fs";
import dotenv from "dotenv";
import { Options } from "swagger-jsdoc";

dotenv.config();

import { generateSwaggerSpec } from "../config/swaggerOptions";

const swaggerSpecs: Options = generateSwaggerSpec();

fs.writeFileSync("./openapi.json", JSON.stringify(swaggerSpecs, null, 2));

console.log("OpenAPI specification generated successfully!");