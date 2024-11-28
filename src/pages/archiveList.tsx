import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserView } from 'src/sections/archive/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Archive Form - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserView />
    </>
  );
}
