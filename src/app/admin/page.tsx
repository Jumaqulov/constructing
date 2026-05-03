import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

const defaultContent = {
  id: 1,
  heroTitle: "Building Your Vision, Crafting Excellence",
  heroSubtitle:
    "With over 20 years of experience, we deliver exceptional construction services that stand the test of time.",
  aboutText:
    "Founded in 2003, BuildCraft Construction has been a cornerstone of quality construction in the region.",
  contactEmail: "info@buildcraft-construction.com",
};

export default async function AdminPage() {
  let siteContent = null;
  let services: { id: number; title: string; description: string }[] = [];

  try {
    siteContent = await prisma.siteContent.findFirst();
    services = await prisma.service.findMany();
  } catch {
    // Database not available on Vercel serverless
  }

  return (
    <AdminDashboard
      siteContent={siteContent ?? defaultContent}
      services={services}
    />
  );
}
