import { useEffect } from "react";
import { initDB } from "./src/database";

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    // Aqui entrarão suas telas
    null
  );
}

