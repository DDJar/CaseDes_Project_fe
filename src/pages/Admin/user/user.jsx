import { Helmet } from 'react-helmet-async';

import { UserView } from './view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> List Product | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
