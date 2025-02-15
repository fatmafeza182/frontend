import React from "react";

import Header from "./components/Header";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "./Context/context";


const Providers = ({ children }) => {
  return (
    <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
      <UserProvider>
        <Header />
        {children}
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
