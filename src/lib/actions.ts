"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─── SiteContent Actions ────────────────────────────────────────────────────

export async function updateSiteContent(formData: FormData) {
  const heroTitle = formData.get("heroTitle") as string;
  const heroSubtitle = formData.get("heroSubtitle") as string;
  const aboutText = formData.get("aboutText") as string;
  const contactEmail = formData.get("contactEmail") as string;

  const existing = await prisma.siteContent.findFirst();

  if (existing) {
    await prisma.siteContent.update({
      where: { id: existing.id },
      data: { heroTitle, heroSubtitle, aboutText, contactEmail },
    });
  } else {
    await prisma.siteContent.create({
      data: { heroTitle, heroSubtitle, aboutText, contactEmail },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

// ─── Service Actions ────────────────────────────────────────────────────────

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.service.create({
    data: { title, description },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateService(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await prisma.service.update({
    where: { id },
    data: { title, description },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteService(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
