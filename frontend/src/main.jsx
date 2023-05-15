import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./contexts/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <ChakraProvider>
    <ChatProvider>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </ChatProvider>
  </ChakraProvider>
);
