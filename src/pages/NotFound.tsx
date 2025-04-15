
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center japanese-paper px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light mb-6">
          <span className="text-indigo">4</span>
          <span className="text-foreground">0</span>
          <span className="text-indigo">4</span>
        </h1>
        <p className="text-xl text-foreground mb-8">The page you're looking for cannot be found.</p>
        <p className="text-lg text-muted-foreground mb-8">
          "In the beginner's mind there are many possibilities, in the expert's mind there are few."
          <br />
          <span className="text-sm">— Shunryu Suzuki</span>
        </p>
        <a href="/" className="text-indigo hover:text-indigo/80 underline underline-offset-4">
          Return to Tasks
        </a>
      </div>
    </div>
  );
};

export default NotFound;
