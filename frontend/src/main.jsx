import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client for the query provider
const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true,
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
