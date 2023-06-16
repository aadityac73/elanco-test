import React, { createContext, useContext, useState } from 'react';

interface TypeContext {
  resource: string;
  setResource: any;
}

const SideBarContext = createContext<TypeContext>({
  resource: 'dashboard',
  setResource: () => void 0
});

export const useSidebar = () => {
  return useContext(SideBarContext);
};

interface ProviderProps {
  children: JSX.Element;
}

const SidebarProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = useState<string>('dashboard');
  return (
    <SideBarContext.Provider value={{ resource: data, setResource: setData }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SidebarProvider;
