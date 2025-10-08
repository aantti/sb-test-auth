import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
          <div className="mt-4 text-center text-sm">
            <Link href="/" className="underline underline-offset-4">
            Return to homepage
            </Link>
          </div>
      </div>
    </div>
  );
}
