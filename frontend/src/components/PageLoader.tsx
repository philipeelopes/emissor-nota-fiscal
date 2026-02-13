import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

type Props = {
  children: React.ReactNode;
};

export default function PageLoader({ children }: Props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // tempo do loader (ajuste como quiser)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Loader />;

  return <>{children}</>;
}
