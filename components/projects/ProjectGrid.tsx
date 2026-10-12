"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, type Project } from "@/content/projects";
import { services, type ServiceSlug } from "@/content/services";

export function ProjectGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-warm/15 pb-6 mb-12">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
            selectedCategory === "all"
              ? "border-[#111311] bg-[#111311] text-[#fbfbf9] dark:border-gold dark:bg-gold dark:text-[#111311]"
              : "border-warm/25 text-warm/80 hover:border-warm/60 hover:text-warm"
          }`}
        >
          All Categories ({projects.length})
        </button>

        {services.map((cat) => {
          const count = projects.filter((p) => p.category === cat.slug).length;
          const isHealthcare = cat.slug === "hospitals" || cat.slug === "public";
          const isIndustrial = cat.slug === "industrial";
          const isMulti = cat.slug === "group-housing" || cat.slug === "apartments";
          const dot = isHealthcare ? "bg-forest" : isIndustrial ? "bg-concrete" : isMulti ? "bg-cherry" : "bg-gold";

          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                selectedCategory === cat.slug
                  ? "border-[#111311] bg-[#111311] text-[#fbfbf9] dark:border-gold dark:bg-gold dark:text-[#111311]"
                  : "border-warm/25 text-warm/80 hover:border-warm/60 hover:text-warm"
              }`}
            >
              <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
              {cat.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-warm/10 bg-charcoal-2 p-8">
          <p className="text-warm/70">No project records found in this category.</p>
        </div>
      )}
    </div>
  );
}
