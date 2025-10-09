import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="container py-24">
        <div className="text-center">
          <h1 className="text-5xl font-heading mb-4">404</h1>
          <p className="text-lg text-foreground/70 mb-6">Oops! Page not found.</p>
          <a href="/" className="btn-glow rounded-full px-6 py-3 inline-block">Return to Home</a>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
