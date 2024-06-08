import { Helmet } from 'react-helmet-async';

import { OrderView } from './view';

// ----------------------------------------------------------------------

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title> List Order | Minimal UI </title>
      </Helmet>

      <OrderView />
    </>
  );
}
