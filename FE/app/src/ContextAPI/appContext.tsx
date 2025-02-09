import { createContext } from "react";
import { useContext } from "react";
type AppContextType = {};
type AppProviderProps = {
  children: React.ReactNode;
  state: AppContextType;
};
export const appContext = createContext<AppContextType>({});
export const AppProvider = (props: AppProviderProps) => {
  const { state, children } = props;
  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
export function useAppContext() {
  return useContext(appContext);
}
