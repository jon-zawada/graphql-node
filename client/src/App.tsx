import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

// Define GraphQL queries & mutations
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

function App() {
  const { data, loading, error, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [newTodo, setNewTodo] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    await addTodo({ variables: { title: newTodo } });
    setNewTodo("");
    refetch(); // Refresh todo list after adding
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data.todos.map((todo: { id: string; title: string; completed: boolean }) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo..."
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}

export default App;
