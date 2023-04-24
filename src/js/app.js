// Loaders
import { loadFooter } from './layout.js';
import { loadContact, loadCarreras } from './components.js';

import { showHeaderMenu } from './routes.js'
showHeaderMenu()

// loaders
loadFooter();
loadCarreras();
loadContact();