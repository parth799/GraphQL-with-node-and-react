import "./App.css";
import { gql, useQuery } from "@apollo/client";

const query = gql`
query GetAllTodos {
  getTodos {
  id
    title
    completed
    user {
      id
      name
      phone
    }
  }
}
`;

function App() {
  const { data, loading } = useQuery(query);
  console.log(data);
  
  if (loading) {
    return (<h1 className="text-3xl font-bold text-center mt-10">Loading ... </h1>);
  }

  return (
    <div className="App bg-gray-100 min-h-screen p-5">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">Todos List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Completed</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.getTodos.map((todo) => (
              <tr key={todo.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{todo.id}</td>
                <td className="py-2 px-4">{todo.title}</td>
                <td className="py-2 px-4">{todo.completed.toString()}</td>
                <td className="py-2 px-4">{todo.user.name}</td>
                <td className="py-2 px-4">{todo.user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
 