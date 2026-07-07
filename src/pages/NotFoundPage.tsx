import { Link } from "react-router-dom";
import { BrandMark } from "@/components/shared/Primitives";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="text-center max-w-md">
        <div className="mx-auto h-32 w-32 rounded-3xl grid-bg border border-border grid place-items-center mb-6">
          <BrandMark size={64} />
        </div>
        <h1 className="font-display text-3xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">This workspace could not be found.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center rounded-lg bg-primary text-primary-foreground px-4 h-10 text-sm">Return to dashboard</Link>
      </div>
    </div>
  );
}
