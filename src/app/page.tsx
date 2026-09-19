import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">WatchList</h1>
      <p className="text-sm text-neutral-500">
        Signed in as {user?.email ?? "unknown"}.
      </p>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm dark:border-neutral-700"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
