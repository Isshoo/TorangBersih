import { Outlet } from "react-router";
import AuthInfo from "../features/auth/AuthInfo";

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white p-5 transition-colors duration-200">
      <main className="flex h-full w-full flex-1">
        <AuthInfo />
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
