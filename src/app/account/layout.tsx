import { AuthRedirect } from "@/components/auth-redirect";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold font-headline mb-8">My Account</h1>
        {children}
      </div>
    </AuthRedirect>
  );
}
