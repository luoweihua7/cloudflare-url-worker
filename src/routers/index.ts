import { Router } from 'itty-router';

import u from './u'
import api from './api'

const router = Router();

api.use(router);
u.use(router);

// Fallback router for 404
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;