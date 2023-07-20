import Header from "../components/Header.tsx";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100dvh] flex flex-col">
      <Header />
      {children}
    </div>
  );
}
