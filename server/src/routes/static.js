import history from 'connect-history-api-fallback';
import Router from 'express-promise-router';
import expressStaticGzip from 'express-static-gzip';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

// SPA 対応のため、ファイルが存在しないときに index.html を返す
router.use(history());

router.use(
  expressStaticGzip(UPLOAD_PATH, {
    etag: true,
    lastModified: true,
    maxAge: 3600 * 1000,
  }),
);

router.use(
  expressStaticGzip(PUBLIC_PATH, {
    etag: true,
    lastModified: true,
    maxAge: 3600 * 1000,
  }),
);

router.use(
  expressStaticGzip(CLIENT_DIST_PATH, {
    etag: true,
    lastModified: true,
    maxAge: 3600 * 1000,
  }),
);

export { router as staticRouter };
