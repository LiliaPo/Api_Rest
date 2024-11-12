<<<<<<< HEAD
import path from 'path';
import { fileURLToPath } from 'url';
=======
import { fileURLToPath } from 'url';
import path from 'path';

>>>>>>> upstream/develop

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

<<<<<<< HEAD
const publicPath = path.join(__dirname, '../../public');
export { publicPath };
=======
const publicPath = path.join(__dirname, '../../public');  

export { publicPath };
>>>>>>> upstream/develop
