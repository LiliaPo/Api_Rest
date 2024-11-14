import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual de una manera compatible
const currentDir = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(currentDir, '../../public');

export { publicPath };
