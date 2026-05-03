import { prisma } from "@/lib/prisma";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const siteContent = await prisma.siteContent.findFirst();
  const services = await prisma.service.findMany();

  return (
    <AdminDashboard
      siteContent={siteContent}
      services={services}
    />
  );
}
