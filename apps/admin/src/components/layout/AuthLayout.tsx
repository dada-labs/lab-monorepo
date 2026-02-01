import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="flex h-screen w-full min-w-7xl overflow-hidden">
        <div className="flex flex-col flex-1 bg-primary-light bg-[url('/images/bg_stack.png')] bg-no-repeat bg-cover bg-center"></div>
        <div className="flex flex-col flex-1 bg-white">
          <main className="flex-1 overflow-hidden relative">
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                <span className="sr-only">Dada Lab</span>
                <img
                  src="/images/logo.svg"
                  alt="DadaChat logo"
                  width={206}
                  height={48}
                />
              </h2>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
