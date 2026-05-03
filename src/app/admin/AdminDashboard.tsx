"use client";

import { useRef, useState } from "react";
import { updateSiteContent, createService, updateService, deleteService } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SiteContent {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactEmail: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
}

interface Props {
  siteContent: SiteContent | null;
  services: Service[];
}

export default function AdminDashboard({ siteContent, services }: Props) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [editingService, setEditingService] = useState<number | null>(null);
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const newServiceFormRef = useRef<HTMLFormElement>(null);

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSiteContentSubmit(formData: FormData) {
    try {
      await updateSiteContent(formData);
      showToast("Site content updated successfully!");
    } catch {
      showToast("Failed to update site content", "error");
    }
  }

  async function handleCreateService(formData: FormData) {
    try {
      await createService(formData);
      showToast("Service created successfully!");
      setShowNewServiceForm(false);
      newServiceFormRef.current?.reset();
    } catch {
      showToast("Failed to create service", "error");
    }
  }

  async function handleUpdateService(formData: FormData) {
    try {
      await updateService(formData);
      showToast("Service updated successfully!");
      setEditingService(null);
    } catch {
      showToast("Failed to update service", "error");
    }
  }

  async function handleDeleteService(id: number) {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const formData = new FormData();
    formData.set("id", id.toString());
    try {
      await deleteService(formData);
      showToast("Service deleted successfully!");
    } catch {
      showToast("Failed to delete service", "error");
    }
  }

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-in-up ${
          toast.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your website content and services.</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {services.length} Services
        </Badge>
      </div>

      {/* ── Site Content Form ──────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <div>
              <CardTitle>Site Content</CardTitle>
              <CardDescription>Edit your landing page hero, about, and contact info</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form action={handleSiteContentSubmit} className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input id="heroTitle" name="heroTitle" type="text"
                  defaultValue={siteContent?.heroTitle ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" name="contactEmail" type="email"
                  defaultValue={siteContent?.contactEmail ?? ""} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea id="heroSubtitle" name="heroSubtitle" rows={2}
                defaultValue={siteContent?.heroSubtitle ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutText">About Text</Label>
              <Textarea id="aboutText" name="aboutText" rows={5}
                defaultValue={siteContent?.aboutText ?? ""} />
            </div>
            <Separator />
            <div className="flex justify-end">
              <Button type="submit" className="bg-slate-900 hover:bg-slate-800">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* ── Services Section ───────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.655 4.655a2.121 2.121 0 11-3-3l4.656-4.656m3-3l4.655-4.655a2.122 2.122 0 113 3L15.42 12.17m-3 3l-3-3" />
                </svg>
              </div>
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage the services displayed on your website</CardDescription>
              </div>
            </div>
            <Button onClick={() => setShowNewServiceForm(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* New Service Form */}
          {showNewServiceForm && (
            <Card className="border-2 border-dashed border-amber-300 bg-amber-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-amber-800">New Service</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={newServiceFormRef} action={handleCreateService} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-title">Title</Label>
                    <Input id="new-title" name="title" type="text" required
                      placeholder="e.g. Residential Construction" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-desc">Description</Label>
                    <Textarea id="new-desc" name="description" rows={3} required
                      placeholder="Describe this service..." />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="ghost" onClick={() => setShowNewServiceForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                      Create Service
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {services.length === 0 && !showNewServiceForm && (
            <div className="text-center py-12 text-muted-foreground">
              <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <p className="text-sm">No services yet. Click &quot;Add Service&quot; to get started.</p>
            </div>
          )}

          {/* Service List */}
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              {editingService === service.id ? (
                /* Edit Mode */
                <CardContent className="p-5 bg-blue-50/50">
                  <form action={handleUpdateService} className="space-y-4">
                    <input type="hidden" name="id" value={service.id} />
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input name="title" type="text" defaultValue={service.title} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea name="description" rows={3} defaultValue={service.description} required />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button type="button" variant="ghost" onClick={() => setEditingService(null)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Save
                      </Button>
                    </div>
                  </form>
                </CardContent>
              ) : (
                /* View Mode */
                <CardContent className="p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon"
                      onClick={() => setEditingService(service.id)} title="Edit">
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon"
                      onClick={() => handleDeleteService(service.id)} title="Delete">
                      <svg className="w-4 h-4 text-slate-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
