import fs from "fs"
import path from "path"
const __dirname = path.resolve();
const directory = fs.readdirSync(path.join(__dirname,"src"))
console.log(directory)