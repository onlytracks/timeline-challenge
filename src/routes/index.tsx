import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: false,
});

function App() {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center
        bg-gradient-to-br from-white to-slate-400 p-4"
    >
      <div className="relative space-y-6 px-6">
        <h1 className="text-center text-3xl">Welcome!</h1>
        <ul
          className="list-none **:[a]:hover:text-slate-300
            **:[a]:hover:underline"
        >
          <li>
            <Button asChild>
              <Link to="/timeline">Go to Timeline</Link>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
