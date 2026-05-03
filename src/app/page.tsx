import { prisma } from "@/lib/prisma";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteContent = await prisma.siteContent.findFirst();
  const services = await prisma.service.findMany();

  const heroTitle = siteContent?.heroTitle ?? "Building Your Vision";
  const heroSubtitle = siteContent?.heroSubtitle ?? "Quality construction services";
  const aboutText = siteContent?.aboutText ?? "About our company...";
  const contactEmail = siteContent?.contactEmail ?? "info@example.com";

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection heroTitle={heroTitle} heroSubtitle={heroSubtitle} />
      <ServicesSection services={services} />
      <AboutSection aboutText={aboutText} />
      <ContactSection contactEmail={contactEmail} />
      <Footer />
    </main>
  );
}
