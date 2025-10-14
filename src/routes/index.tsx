import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: false,
});

function App() {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-blue-950/50
        via-violet-950/50 to-purple-950/70 p-4 text-white"
    >
      <div className="relative space-y-6 overflow-hidden px-6">
        <h1 className="text-center text-3xl">Welcome!</h1>
      </div>
    </div>
  );
}
