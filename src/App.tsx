import Translator from "./components/Translator";
import TransparentBackground from "./images/transparent-background.png";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-400"
      style={{
        backgroundImage: `url(${TransparentBackground})`,
        backgroundSize: isMobile ? "70%" : "40%",
        backgroundPosition: "top",
        backgroundRepeat: "repeat-x",
      }}
    >
      <Translator />
    </div>
  );
}

export default App;
