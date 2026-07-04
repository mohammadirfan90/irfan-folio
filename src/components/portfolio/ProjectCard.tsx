import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug: string;
  summary: string;
  category: string;
  imageUrl: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  slug,
  summary,
  category,
  imageUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <Card className="group bg-surface-container-low border border-outline-variant/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full hover-lift">
      {/* Image Showcase */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/95 rounded-full font-label-mono text-label-mono text-primary border border-white/20 uppercase font-semibold shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
            {summary}
          </p>
        </div>
      </CardContent>

      {/* Buttons Action Bar */}
      <CardFooter className="flex items-center gap-3 p-6 pt-4 border-t border-outline-variant/10 bg-transparent rounded-b-2xl">
        <Link href={`/projects/${slug}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full justify-center text-sm font-semibold cursor-pointer h-10"
          >
            Details
          </Button>
        </Link>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              className="w-full justify-center text-sm font-semibold cursor-pointer bg-primary text-on-primary hover:bg-on-surface-variant border-transparent h-10 gap-1.5"
            >
              Live Link
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
