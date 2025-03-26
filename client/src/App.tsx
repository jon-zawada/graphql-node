import { gql, useQuery } from "@apollo/client";

const GET_HELLO = gql`
  query {
    hello
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>GraphQL Client</h1>
      <p>Server Response: {data.hello}</p>
    </div>
  );
}

export default App;
