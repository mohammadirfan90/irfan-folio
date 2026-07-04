"use client";

import React, { useState } from "react";
import { upsertSkill, deleteSkill } from "@/actions/admin";
import { Skill } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MediaUploader } from "./MediaUploader";



interface SkillsManagerProps {
  initialSkills: Skill[];
}

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [customLogoUrl, setCustomLogoUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEditClick = (skill: Skill) => {
    setEditingSkill(skill);
    setCustomLogoUrl(skill.custom_logo_url || "");
    setMsg("");
  };

  const handleAddNewClick = () => {
    setEditingSkill({
      name: "",
      category: "Frontend",
      display_order: skills.length + 1,
    });
    setCustomLogoUrl("");
    setMsg("");
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setCustomLogoUrl("");
    setMsg("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg("");

    const formData = new FormData(e.currentTarget);
    if (editingSkill?.id) {
      formData.append("id", editingSkill.id);
    }
    formData.set("custom_logo_url", customLogoUrl);

    try {
      const res = await upsertSkill(formData);
      if (res?.error) {
        setMsg(`Error: ${res.error}`);
      } else {
        setMsg("Skill saved successfully.");
        // Refresh local state (in a production app, we would reload or use router refresh)
        window.location.reload();
      }
    } catch (err: any) {
      setMsg(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await deleteSkill(id);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      } else {
        setSkills(skills.filter((s) => s.id !== id));
      }
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to delete."}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Left Column - List of Skills */}
      <MagicCard
        mode="gradient"
        gradientColor="rgba(42, 77, 215, 0.03)"
        gradientSize={200}
        className="md:col-span-7 p-6 border border-outline-variant/20 rounded-2xl shadow-sm space-y-6"
      >
        <div className="flex justify-between items-center">

          <h2 className="font-headline-md text-[18px] text-primary font-semibold">
            Technical Stack
          </h2>
          <button
            onClick={handleAddNewClick}
            className="px-4 py-2 bg-primary text-on-primary rounded-md text-xs font-semibold hover:bg-on-surface-variant transition-colors"
          >
            Add New Skill
          </button>
        </div>

        <div className="divide-y divide-outline-variant/10 max-h-[60vh] overflow-y-auto pr-2">
          {skills.length === 0 ? (
            <p className="text-on-surface-variant font-body-md py-4 text-center">
              No skills added yet. Click Add New Skill to populate.
            </p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest block mb-1">
                    {skill.category}
                  </span>
                  <h4 className="font-headline-md text-[16px] text-primary font-medium">
                    {skill.name}
                  </h4>
                  <span className="font-label-mono text-[10px] text-on-surface-variant/70">
                    Order: {skill.display_order} {skill.custom_logo_url ? "| Custom Logo Set" : ""}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(skill)}
                    className="p-2 text-on-surface-variant hover:text-secondary transition-colors"
                    aria-label="Edit skill"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-on-surface-variant hover:text-error transition-colors"
                    aria-label="Delete skill"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </MagicCard>

      {/* Right Column - Editor Form */}
      <div className="md:col-span-5">
        {editingSkill ? (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.03)"
            gradientSize={150}
            className="border border-outline-variant/20 rounded-2xl shadow-sm"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

            <h3 className="font-headline-md text-[16px] text-primary font-semibold border-b border-outline-variant/10 pb-3">
              {editingSkill.id ? "Edit Skill" : "Add New Skill"}
            </h3>

            <div>
              <Label htmlFor="name" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Skill Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingSkill.name || ""}
                required
                placeholder="e.g. Next.js"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={editingSkill.category || "Frontend"}
                  className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-md text-body-md focus:outline-none focus:border-primary transition-colors h-10"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Design">Design</option>
                </select>
              </div>

              <div>
                <Label htmlFor="display_order" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Display Order
                </Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingSkill.display_order ?? 0}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="custom_logo_url" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Custom Logo URL (Optional)
              </Label>
              <Input
                id="custom_logo_url"
                name="custom_logo_url"
                type="text"
                placeholder="https://example.com/logo.png"
                value={customLogoUrl}
                onChange={(e) => setCustomLogoUrl(e.target.value)}
              />
            </div>

            <MediaUploader
              label="Upload Custom Logo"
              destinationPath="skills"
              currentUrl={customLogoUrl}
              onUploadSuccess={(url) => setCustomLogoUrl(url)}
            />

            {msg && (
              <p className="font-body-md text-xs text-secondary bg-surface p-2 border border-outline-variant/10 rounded">
                {msg}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                size="sm"
              >
                {isSaving ? "Saving..." : "Save Skill"}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
         </MagicCard>
        ) : (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.02)"
            gradientSize={150}
            className="bg-surface-container-low border border-dashed border-outline-variant/30 p-8 rounded-2xl text-center cursor-default"
          >
            <span className="material-symbols-outlined text-on-surface-variant/40 text-[48px] mb-2 block">
              category
            </span>
            <p className="font-body-md text-sm text-on-surface-variant">
              Select a skill to edit, or click Add New Skill to configure your technical stack.
            </p>
          </MagicCard>
        )}
      </div>
    </div>
  );
}
