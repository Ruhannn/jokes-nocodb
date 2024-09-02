import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ErrorBoundary from "./Components/ErrorBoundary.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary >
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{
            classNames: {
              toast: "border-neutral-900 bg-neutral-950 p-3 border",
              title: "text-neutral-100",
              icon: "text-neutral-100",
            },
          }}
        />
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
