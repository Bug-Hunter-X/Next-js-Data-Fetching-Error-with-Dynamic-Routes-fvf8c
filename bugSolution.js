```javascript
// bugSolution.js
export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    // Validate the ID (e.g., ensure it's an integer)
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return { notFound: true };
    }

    const res = await fetch(`https://api.example.com/data/${numericId}`);
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        error: 'Failed to fetch data',
        data: null,
      },
    };
  }
}

export default function Product({ data, error }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
```