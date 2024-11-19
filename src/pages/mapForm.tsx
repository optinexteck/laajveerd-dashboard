import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import {MapForm} from 'src/sections/Forms/mapForm';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Map Form - ${CONFIG.appName}`}</title>
      </Helmet>

      <MapForm />
    </>
  );
}
