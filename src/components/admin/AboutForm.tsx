"use client";

import React, { useState } from "react";
import { updateProfile, updateSiteSettings } from "@/actions/admin";
import { MediaUploader } from "./MediaUploader";
import { Profile, SiteSettings } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AboutFormProps {
  profile: Profile | null;
  settings: SiteSettings | null;
}

export function AboutForm({ profile, settings }: AboutFormProps) {
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [resumeUrl, setResumeUrl] = useState(profile?.resume_url || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [settingsMsg, setSettingsMsg] = useState("");

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMsg("");

    const formData = new FormData(e.currentTarget);
    formData.append("avatar_url", avatarUrl);
    formData.append("resume_url", resumeUrl);

    try {
      const res = await updateProfile(formData);
      if (res?.error) {
        setProfileMsg(`Error: ${res.error}`);
      } else {
        setProfileMsg("Profile updated successfully.");
      }
    } catch (err: any) {
      setProfileMsg(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsMsg("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await updateSiteSettings(formData);
      if (res?.error) {
        setSettingsMsg(`Error: ${res.error}`);
      } else {
        setSettingsMsg("Site settings updated successfully.");
      }
    } catch (err: any) {
      setSettingsMsg(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. PROFILE SECTION FORM */}
      <MagicCard
        mode="gradient"
        gradientColor="rgba(42, 77, 215, 0.03)"
        gradientSize={250}
        className="border border-outline-variant/20 rounded-2xl shadow-sm animate-fade-in"
      >
        <form onSubmit={handleProfileSubmit} className="p-6 md:p-8 space-y-6">
          <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2 uppercase tracking-wider select-none">
            Biography &amp; Resume Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Full Name
              </Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile?.full_name || ""}
                required
                className="h-9.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Professional Title
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={profile?.title || ""}
                required
                className="h-9.5 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio_description" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Biography Paragraph
            </Label>
            <Textarea
              id="bio_description"
              name="bio_description"
              rows={4}
              defaultValue={profile?.bio_description || ""}
              required
              className="text-sm min-h-[90px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue={profile?.location || ""}
                required
                className="h-9.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="focus_area" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Focus Area
              </Label>
              <Input
                id="focus_area"
                name="focus_area"
                defaultValue={profile?.focus_area || ""}
                required
                className="h-9.5 text-sm"
              />
            </div>
          </div>

          {/* Media Uploaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-outline-variant/20 pt-6">
            <MediaUploader
              label="Upload Avatar Picture"
              destinationPath="profile"
              currentUrl={avatarUrl}
              onUploadSuccess={setAvatarUrl}
            />
            <MediaUploader
              label="Upload Resume Document"
              destinationPath="profile"
              currentUrl={resumeUrl}
              onUploadSuccess={setResumeUrl}
            />
          </div>

          {profileMsg && (
            <div className="p-3.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700">
              {profileMsg}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSavingProfile}
            size="sm"
            className="h-9 px-4 text-sm bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
          >
            {isSavingProfile ? "Saving Biography..." : "Save Biography"}
          </Button>
        </form>
      </MagicCard>

      {/* 2. SITE SETTINGS SECTION FORM */}
      <MagicCard
        mode="gradient"
        gradientColor="rgba(42, 77, 215, 0.03)"
        gradientSize={250}
        className="border border-outline-variant/20 rounded-2xl shadow-sm animate-fade-in"
      >
        <form onSubmit={handleSettingsSubmit} className="p-6 md:p-8 space-y-6">
          <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-2 uppercase tracking-wider select-none">
            Site Settings &amp; Availability
          </h2>

          <input type="hidden" name="id" value={settings?.id || ""} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Contact Email Address
              </Label>
              <Input
                id="contact_email"
                name="contact_email"
                type="email"
                defaultValue={settings?.contact_email || ""}
                required
                className="h-9.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Contact Phone Number <span className="text-neutral-400 normal-case font-normal">(optional)</span>
              </Label>
              <Input
                id="contact_phone"
                name="contact_phone"
                type="tel"
                defaultValue={settings?.contact_phone || ""}
                placeholder="+1 (555) 019-2834"
                className="h-9.5 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_whatsapp" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                WhatsApp Number <span className="text-neutral-400 normal-case font-normal">(optional)</span>
              </Label>
              <Input
                id="contact_whatsapp"
                name="contact_whatsapp"
                type="tel"
                defaultValue={settings?.contact_whatsapp || ""}
                placeholder="+15550192834"
                className="h-9.5 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="is_available_for_hire" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Hiring Availability
              </Label>
              <select
                id="is_available_for_hire"
                name="is_available_for_hire"
                defaultValue={settings?.is_available_for_hire ? "true" : "false"}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-md text-sm focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all h-9.5 font-medium"
              >
                <option value="true">Active (Open to Opportunities)</option>
                <option value="false">Inactive (Not Available)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_message" className="block text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Availability Status Message
            </Label>
            <Input
              id="availability_message"
              name="availability_message"
              defaultValue={settings?.availability_message || "Available for new opportunities"}
              required
              className="h-9.5 text-sm"
            />
          </div>

          {settingsMsg && (
            <div className="p-3.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm font-semibold text-neutral-700">
              {settingsMsg}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSavingSettings}
            size="sm"
            className="h-9 px-4 text-sm bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
          >
            {isSavingSettings ? "Saving Settings..." : "Save Settings"}
          </Button>
        </form>
      </MagicCard>
    </div>
  );
}
