"use client";

import React, { useState } from "react";
import {
  upsertExperience,
  deleteExperience,
  upsertEducation,
  deleteEducation,
} from "@/actions/admin";
import { Experience, Education } from "@/types";
import { MagicCard } from "@/components/ui/magic-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";



interface ExperienceManagerProps {
  initialExperiences: Experience[];
  initialEducations: Education[];
}

export function ExperienceManager({
  initialExperiences,
  initialEducations,
}: ExperienceManagerProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);

  // Active editor states
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [msgExp, setMsgExp] = useState("");
  const [msgEdu, setMsgEdu] = useState("");
  const [isSavingExp, setIsSavingExp] = useState(false);
  const [isSavingEdu, setIsSavingEdu] = useState(false);

  // --- EXPERIENCE ACTIONS ---
  const handleEditExp = (exp: Experience) => {
    setEditingExp(exp);
    setEditingEdu(null);
    setMsgExp("");
  };

  const handleAddNewExp = () => {
    setEditingExp({
      role: "",
      company: "",
      duration: "2026 — PRES",
      description: "",
      display_order: experiences.length + 1,
    });
    setEditingEdu(null);
    setMsgExp("");
  };

  const handleExpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingExp(true);
    setMsgExp("");

    const formData = new FormData(e.currentTarget);
    if (editingExp?.id) formData.append("id", editingExp.id);

    try {
      const res = await upsertExperience(formData);
      if (res?.error) {
        setMsgExp(`Error: ${res.error}`);
      } else {
        setMsgExp("Experience saved successfully.");
        window.location.reload();
      }
    } catch (err: any) {
      setMsgExp(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSavingExp(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience entry?")) return;

    try {
      const res = await deleteExperience(id);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      } else {
        setExperiences(experiences.filter((exp) => exp.id !== id));
      }
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to delete."}`);
    }
  };

  // --- EDUCATION ACTIONS ---
  const handleEditEdu = (edu: Education) => {
    setEditingEdu(edu);
    setEditingExp(null);
    setMsgEdu("");
  };

  const handleAddNewEdu = () => {
    setEditingEdu({
      degree: "",
      school: "",
      duration: "2022 — 2026",
      description: "",
      display_order: educations.length + 1,
    });
    setEditingExp(null);
    setMsgEdu("");
  };

  const handleEduSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSavingEdu(true);
    setMsgEdu("");

    const formData = new FormData(e.currentTarget);
    if (editingEdu?.id) formData.append("id", editingEdu.id);

    try {
      const res = await upsertEducation(formData);
      if (res?.error) {
        setMsgEdu(`Error: ${res.error}`);
      } else {
        setMsgEdu("Education saved successfully.");
        window.location.reload();
      }
    } catch (err: any) {
      setMsgEdu(`Error: ${err.message || "Failed to save."}`);
    } finally {
      setIsSavingEdu(false);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      const res = await deleteEducation(id);
      if (res?.error) {
        alert(`Error: ${res.error}`);
      } else {
        setEducations(educations.filter((edu) => edu.id !== id));
      }
    } catch (err: any) {
      alert(`Error: ${err.message || "Failed to delete."}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Left Column: Lists */}
      <div className="md:col-span-7 space-y-8">
        {/* Experience List Container */}
        <MagicCard
          mode="gradient"
          gradientColor="rgba(42, 77, 215, 0.03)"
          gradientSize={200}
          className="border border-outline-variant/20 p-6 rounded-2xl shadow-sm space-y-4 cursor-default animate-fade-in"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-[18px] text-primary font-semibold">
              Work Experience
            </h2>
            <button
              onClick={handleAddNewExp}
              className="px-4 py-2 bg-primary text-on-primary rounded-md text-xs font-semibold hover:bg-on-surface-variant transition-colors"
            >
              Add Experience
            </button>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {experiences.length === 0 ? (
              <p className="text-on-surface-variant font-body-md py-4 text-center">
                No work history entries. Click Add Experience to populate.
              </p>
            ) : (
              experiences.map((exp) => (
                <div key={exp.id} className="flex justify-between items-start py-4">
                  <div className="max-w-[80%]">
                    <span className="font-label-mono text-[10px] text-on-surface-variant/80 block mb-1">
                      {exp.duration}
                    </span>
                    <h4 className="font-headline-md text-[16px] text-primary font-medium">
                      {exp.role}
                    </h4>
                    <p className="font-label-mono text-label-mono text-secondary">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExp(exp)}
                      className="p-2 text-on-surface-variant hover:text-secondary transition-colors"
                      aria-label="Edit experience"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors"
                      aria-label="Delete experience"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </MagicCard>

        {/* Education List Container */}
        <MagicCard
          mode="gradient"
          gradientColor="rgba(42, 77, 215, 0.03)"
          gradientSize={200}
          className="border border-outline-variant/20 p-6 rounded-2xl shadow-sm space-y-4 cursor-default animate-fade-in"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-[18px] text-primary font-semibold">
              Education History
            </h2>
            <button
              onClick={handleAddNewEdu}
              className="px-4 py-2 bg-primary text-on-primary rounded-md text-xs font-semibold hover:bg-on-surface-variant transition-colors"
            >
              Add Education
            </button>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {educations.length === 0 ? (
              <p className="text-on-surface-variant font-body-md py-4 text-center">
                No academic entries. Click Add Education to populate.
              </p>
            ) : (
              educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start py-4">
                  <div className="max-w-[80%]">
                    <span className="font-label-mono text-[10px] text-on-surface-variant/80 block mb-1">
                      {edu.duration}
                    </span>
                    <h4 className="font-headline-md text-[16px] text-primary font-medium">
                      {edu.degree}
                    </h4>
                    <p className="font-label-mono text-label-mono text-secondary">
                      {edu.school}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditEdu(edu)}
                      className="p-2 text-on-surface-variant hover:text-secondary transition-colors"
                      aria-label="Edit education"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEdu(edu.id)}
                      className="p-2 text-on-surface-variant hover:text-error transition-colors"
                      aria-label="Delete education"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </MagicCard>
      </div>

      {/* Right Column: Editor Panel */}
      <div className="md:col-span-5">
        {/* Experience Editor Form */}
        {editingExp && (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.03)"
            gradientSize={150}
            className="border border-outline-variant/20 rounded-2xl shadow-sm"
          >
            <form
              onSubmit={handleExpSubmit}
              className="p-6 space-y-4"
            >

            <h3 className="font-headline-md text-[16px] text-primary font-semibold border-b border-outline-variant/10 pb-3">
              {editingExp.id ? "Edit Experience" : "Add Experience"}
            </h3>

            <div>
              <Label htmlFor="role" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Job Title / Role
              </Label>
              <Input
                id="role"
                name="role"
                defaultValue={editingExp.role || ""}
                required
                placeholder="e.g. Lead Frontend Engineer"
              />
            </div>

            <div>
              <Label htmlFor="company" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                defaultValue={editingExp.company || ""}
                required
                placeholder="e.g. TechScale Innovations"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Duration Range
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={editingExp.duration || ""}
                  required
                  placeholder="e.g. 2022 — PRES"
                />
              </div>

              <div>
                <Label htmlFor="display_order" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Display Order
                </Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingExp.display_order ?? 0}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Description Paragraph
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={editingExp.description || ""}
                required
                placeholder="Pioneering the migration to..."
              />
            </div>

            {msgExp && (
              <p className="font-body-md text-xs text-secondary bg-surface p-2 border border-outline-variant/10 rounded">
                {msgExp}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isSavingExp}
                size="sm"
              >
                {isSavingExp ? "Saving..." : "Save Entry"}
              </Button>
              <Button
                type="button"
                onClick={() => setEditingExp(null)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
         </MagicCard>
        )}

        {/* Education Editor Form */}
        {editingEdu && (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.03)"
            gradientSize={150}
            className="border border-outline-variant/20 rounded-2xl shadow-sm"
          >
            <form
              onSubmit={handleEduSubmit}
              className="p-6 space-y-4"
            >

            <h3 className="font-headline-md text-[16px] text-primary font-semibold border-b border-outline-variant/10 pb-3">
              {editingEdu.id ? "Edit Education" : "Add Education"}
            </h3>

            <div>
              <Label htmlFor="degree" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Degree / Qualification
              </Label>
              <Input
                id="degree"
                name="degree"
                defaultValue={editingEdu.degree || ""}
                required
                placeholder="e.g. B.Sc. in Computer Science"
              />
            </div>

            <div>
              <Label htmlFor="school" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                School / University
              </Label>
              <Input
                id="school"
                name="school"
                defaultValue={editingEdu.school || ""}
                required
                placeholder="e.g. University of Technology"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Duration Range
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={editingEdu.duration || ""}
                  required
                  placeholder="e.g. 2016 — 2020"
                />
              </div>

              <div>
                <Label htmlFor="display_order" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                  Display Order
                </Label>
                <Input
                  id="display_order"
                  name="display_order"
                  type="number"
                  defaultValue={editingEdu.display_order ?? 0}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                Description Summary (Optional)
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={editingEdu.description || ""}
                placeholder="Specialized in..."
              />
            </div>

            {msgEdu && (
              <p className="font-body-md text-xs text-secondary bg-surface p-2 border border-outline-variant/10 rounded">
                {msgEdu}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isSavingEdu}
                size="sm"
              >
                {isSavingEdu ? "Saving..." : "Save Entry"}
              </Button>
              <Button
                type="button"
                onClick={() => setEditingEdu(null)}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </form>
         </MagicCard>
        )}

        {!editingExp && !editingEdu && (
          <MagicCard
            mode="gradient"
            gradientColor="rgba(42, 77, 215, 0.02)"
            gradientSize={150}
            className="bg-surface-container-low border border-dashed border-outline-variant/30 p-8 rounded-2xl text-center cursor-default"
          >
            <span className="material-symbols-outlined text-on-surface-variant/40 text-[48px] mb-2 block">
              calendar_today
            </span>
            <p className="font-body-md text-sm text-on-surface-variant">
              Select an entry to edit, or click one of the add buttons to update your professional timeline.
            </p>
          </MagicCard>
        )}
      </div>
    </div>
  );
}
