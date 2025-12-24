import { getUserApi } from "@/Api/UserApi/user.api";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/Store/Store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const ProtectRoute = ({ children }) => {
  const setUser = useUserStore((state) => state.setUser);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUserApi,
    retry: false,
  });

  // Debug
  // console.log("getUser data:", data, "error:", error);

  useEffect(() => {
    if (data?.user) {
      // backend agar { user: {...} } bhej raha hai
      setUser(data.user);
    } else if (data) {
      // agar direct user object bhej raha hai
      setUser(data);
    }
  }, [data, setUser]);

  // 1) Jab tak query loading hai → redirect mat karo
  if (isLoading) {
     return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="w-12 h-12 text-emerald-600" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Loading your dashboard...</h1>
        </div>
      </div>
    )
  }

  // 2) Agar 401 / unauthorized error aaya → login pe bhej do
  if (isError && error?.response?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  // 3) Agar data hi nahi mila (aur error bhi nahi) → safe side pe login
  if (!data) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
