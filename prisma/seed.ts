import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed SiteContent
  const existingContent = await prisma.siteContent.findFirst();
  if (!existingContent) {
    await prisma.siteContent.create({
      data: {
        heroTitle: "Building Your Vision, Crafting Excellence",
        heroSubtitle:
          "With over 20 years of experience, we deliver exceptional construction services that stand the test of time. From concept to completion, your project is in expert hands.",
        aboutText:
          "Founded in 2003, BuildCraft Construction has been a cornerstone of quality construction in the region. Our team of experienced professionals brings dedication, precision, and innovation to every project. We believe that every structure tells a story, and we are committed to making yours extraordinary. From residential homes to commercial complexes, we handle projects of all scales with the same level of care and attention to detail. Our commitment to sustainable building practices and cutting-edge technology ensures that your investment stands strong for generations to come.",
        contactEmail: "info@buildcraft-construction.com",
      },
    });
    console.log("✅ SiteContent seeded");
  }

  // Seed Services
  const existingServices = await prisma.service.count();
  if (existingServices === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: "Residential Construction",
          description:
            "Custom home building and residential projects tailored to your lifestyle. From modern minimalist designs to classic architecture, we bring your dream home to life with premium materials and expert craftsmanship.",
        },
        {
          title: "Commercial Building",
          description:
            "Full-scale commercial construction services for offices, retail spaces, and industrial facilities. We deliver projects on time and within budget, ensuring your business space meets all regulatory standards.",
        },
        {
          title: "Renovation & Remodeling",
          description:
            "Transform your existing space with our comprehensive renovation services. Whether it's a kitchen upgrade, bathroom remodel, or complete home transformation, we handle every detail with precision.",
        },
        {
          title: "Project Management",
          description:
            "End-to-end project management services that keep your construction project on track. Our experienced managers coordinate all aspects from planning and permits to final inspection and handover.",
        },
        {
          title: "Interior Design",
          description:
            "Professional interior design services that complement our construction work. Our designers create functional, beautiful spaces that reflect your personal style and maximize your property's potential.",
        },
        {
          title: "Green Building",
          description:
            "Sustainable and eco-friendly construction solutions that reduce environmental impact. We incorporate energy-efficient systems, sustainable materials, and green certifications into every project.",
        },
      ],
    });
    console.log("✅ Services seeded");
  }

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
