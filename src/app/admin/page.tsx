import { isAuthenticated, getPostRaw, getAllPosts } from "./actions";
import AdminPanel from "./AdminPanel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Panel | FPV Türkiye",
  robots: { index: false, follow: false },
};

interface AdminPageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authenticated = await isAuthenticated();
  const posts = authenticated ? await getAllPosts() : [];
  const { edit } = await searchParams;
  const initialEditPost =
    authenticated && edit ? await getPostRaw(edit) : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <AdminPanel
        authenticated={authenticated}
        posts={posts}
        initialEditPost={initialEditPost}
      />
    </main>
  );
}
