import { useEffect } from 'react';

import { NotFoundPage } from '../../components/application/NotFoundPage';

const NotFoundContainer = () => {
  useEffect(() => {
    document.title = 'ページが見つかりません - CAwitter'
  }, []);
  return <NotFoundPage />
};

export { NotFoundContainer };
