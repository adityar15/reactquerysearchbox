import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBox from "./components/SearchBox";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-black p-12 w-screen h-screen">
        <SearchBox />
      </div>
    </QueryClientProvider>
  );
}

export default App;
