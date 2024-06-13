import { useEffect } from "react";
import { useSelector } from "react-redux";

const GlobalStateViewer = () => {
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log("Global State:", state);
  }, [state]);

  return null; // This component doesn't render anything, it just logs the state changes.
};

export default GlobalStateViewer;
