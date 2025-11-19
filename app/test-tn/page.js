import { tiendanubeFetch } from '../../utils/tiendanube';

export default async function TestTNPage() {
  let products = null;
  let error = null;

  try {
    // Opcional: loguear para chequear
    console.log('🔗 Fetching:', `https://api.tiendanube.com/v1/${process.env.TN_STORE_ID}/products`);
    console.log('🔑 Token:', process.env.TN_ACCESS_TOKEN);

    products = await tiendanubeFetch('products');
  } catch (err) {
    error = err.message;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Tiendanube API</h1>
      {error ? (
        <pre style={{ color: 'red', background: '#ffe6e6', padding: '10px' }}>
          {error}
        </pre>
      ) : (
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(products, null, 2)}
        </pre>
      )}
    </div>
  );
}
