import { prisma } from "@/lib/prisma";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export const dynamic = "force-dynamic";

const defaultContent = {
  heroTitle: "Building Your Vision, Crafting Excellence",
  heroSubtitle:
    "With over 20 years of experience, we deliver exceptional construction services that stand the test of time. From concept to completion, your project is in expert hands.",
  aboutText:
    "Founded in 2003, BuildCraft Construction has been a cornerstone of quality construction in the region. Our team of experienced professionals brings dedication, precision, and innovation to every project. We believe that every structure tells a story, and we are committed to making yours extraordinary. From residential homes to commercial complexes, we handle projects of all scales with the same level of care and attention to detail. Our commitment to sustainable building practices and cutting-edge technology ensures that your investment stands strong for generations to come.",
  contactEmail: "info@buildcraft-construction.com",
};

const defaultServices = [
  {
    id: 1,
    title: "Residential Construction",
    description:
      "Custom home building and residential projects tailored to your lifestyle. From modern minimalist designs to classic architecture, we bring your dream home to life with premium materials and expert craftsmanship.",
  },
  {
    id: 2,
    title: "Commercial Building",
    description:
      "Full-scale commercial construction services for offices, retail spaces, and industrial facilities. We deliver projects on time and within budget, ensuring your business space meets all regulatory standards.",
  },
  {
    id: 3,
    title: "Renovation & Remodeling",
    description:
      "Transform your existing space with our comprehensive renovation services. Whether it's a kitchen upgrade, bathroom remodel, or complete home transformation, we handle every detail with precision.",
  },
  {
    id: 4,
    title: "Project Management",
    description:
      "End-to-end project management services that keep your construction project on track. Our experienced managers coordinate all aspects from planning and permits to final inspection and handover.",
  },
  {
    id: 5,
    title: "Interior Design",
    description:
      "Professional interior design services that complement our construction work. Our designers create functional, beautiful spaces that reflect your personal style and maximize your property's potential.",
  },
  {
    id: 6,
    title: "Green Building",
    description:
      "Sustainable and eco-friendly construction solutions that reduce environmental impact. We incorporate energy-efficient systems, sustainable materials, and green certifications into every project.",
  },
];

export default async function HomePage() {
  let siteContent = null;
  let services = defaultServices;

  try {
    siteContent = await prisma.siteContent.findFirst();
    const dbServices = await prisma.service.findMany();
    if (dbServices.length > 0) services = dbServices;
  } catch {
    // Database not available (e.g. Vercel serverless), use defaults
  }

  const heroTitle = siteContent?.heroTitle ?? defaultContent.heroTitle;
  const heroSubtitle = siteContent?.heroSubtitle ?? defaultContent.heroSubtitle;
  const aboutText = siteContent?.aboutText ?? defaultContent.aboutText;
  const contactEmail = siteContent?.contactEmail ?? defaultContent.contactEmail;

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
