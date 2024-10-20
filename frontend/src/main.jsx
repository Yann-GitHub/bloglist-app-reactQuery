import ReactDOM from "react-dom/client";
import App from "./App";
import "../index.css";
import { NotificationContextProvider } from "./NotificationContext";
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

// Create a client for the query provider
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true,
//     },
//     mutations: {
//       onError: (error) => {
//         console.error("Mutation error:", error);
//       },
//     },
//   },
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);
