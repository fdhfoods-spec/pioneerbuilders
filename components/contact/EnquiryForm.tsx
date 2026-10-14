"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Mail, RotateCcw } from "lucide-react";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { mailHref, hasEmail } from "@/lib/contact";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(8, "Please provide a valid contact number"),
  email: z.string().email("Please provide a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  location: z.string().min(2, "Please specify project location"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function EnquiryForm() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    setSubmittedData(data);
  };

  const handleReset = () => {
    setSubmittedData(null);
    reset();
  };

  return (
    <div className="border border-warm/15 bg-charcoal-2 p-6 sm:p-10 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-warm/10 pb-5 mb-8">
        <div>
          <h2 className="display-h3 text-warm">Project Enquiry Form</h2>
          <p className="text-xs text-concrete mt-1">Submit your civil construction requirements</p>
        </div>
        <span className="inline-flex items-center gap-1.5 border border-[#44d62c]/40 bg-[#44d62c]/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#44d62c]">
          <span className="size-1.5 rounded-full bg-[#44d62c]" />
          Engineering Review
        </span>
      </div>

      {!submittedData && (
        <div className="mb-8 p-4 border-l-4 border-l-gold border-y border-r border-warm/15 bg-charcoal text-xs text-warm/80 leading-relaxed font-sans">
          <strong className="text-gold uppercase tracking-wider block mb-1">
            Civil Construction Consultation
          </strong>
          Share your site location, structure category, and requirements. Our engineering team reviews each specification to prepare tailored civil planning and structural consultation.
        </div>
      )}

      {submittedData ? (
        <div className="animate-success-pop space-y-6">
          {/* Animated Header Badge */}
          <div className="bg-charcoal p-8 sm:p-10 border border-warm/20 text-center flex flex-col items-center">
            {/* Animated SVG Checkmark Icon */}
            <div className="relative mb-5 flex size-20 items-center justify-center">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-20"
                aria-hidden="true"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#44d62c"
                  strokeWidth="3"
                  className="animate-circle-draw"
                  strokeLinecap="round"
                />
                <path
                  d="M20 33L28 41L44 23"
                  stroke="#44d62c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-checkmark"
                />
              </svg>
            </div>

            <span className="eyebrow text-[#44d62c] mb-2 font-bold tracking-widest">
              Submission Received
            </span>
            <h3 className="display-h3 text-warm font-bold text-2xl sm:text-3xl">
              Thank You, {submittedData.name}!
            </h3>
            <p className="mt-3 max-w-lg text-sm text-warm/75 font-sans leading-relaxed">
              Your civil construction project brief has been recorded. Our engineering team will review your specifications and contact you shortly.
            </p>

            {/* Summary Docket */}
            <div className="w-full max-w-xl mt-8 text-left text-xs text-warm/85 font-mono bg-charcoal-2 p-5 border border-warm/15 space-y-2">
              <div className="flex items-center justify-between border-b border-warm/10 pb-2 mb-3">
                <span className="text-gold font-bold uppercase tracking-wider">Project Docket</span>
                <span className="text-concrete">Ref: PB-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <p><strong>Category:</strong> {submittedData.projectType}</p>
              <p><strong>Location:</strong> {submittedData.location}</p>
              {submittedData.budget && <p><strong>Budget:</strong> {submittedData.budget}</p>}
              <p className="pt-2 border-t border-warm/10 text-warm/70 leading-relaxed font-sans text-xs">
                <strong>Project Brief:</strong> {submittedData.message}
              </p>
            </div>

            {/* Action Channels */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
              {hasEmail && (
                <a
                  href={mailHref(
                    `Project Enquiry: ${submittedData.projectType} in ${submittedData.location}`,
                    `Client Name: ${submittedData.name}\nPhone: ${submittedData.phone}\nEmail: ${submittedData.email}\nProject Type: ${submittedData.projectType}\nLocation: ${submittedData.location}\nBudget: ${submittedData.budget || "Not specified"}\n\nProject Brief:\n${submittedData.message}`
                  ) ?? "#"}
                  className="w-full sm:w-auto px-6 py-3 bg-[#44d62c] text-[#111311] font-bold text-xs uppercase tracking-wider hover:bg-[#38be23] transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="size-4 shrink-0" />
                  Send Copy via Email
                </a>
              )}

              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 border border-warm/25 text-warm font-semibold text-xs uppercase tracking-wider hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
              >
                <InstagramIcon className="size-4 shrink-0" />
                Instagram
              </a>

              <a
                href={company.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 border border-warm/25 text-warm font-semibold text-xs uppercase tracking-wider hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
              >
                <YouTubeIcon className="size-4 shrink-0" />
                YouTube
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3 border border-warm/15 text-concrete text-xs uppercase tracking-wider hover:text-warm hover:border-warm/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Submit Another
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Name & Phone */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Full Name <span className="text-gold">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none"
                placeholder="e.g. Anand Sharma"
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Contact Phone <span className="text-gold">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none"
                placeholder="+91 98XXXXXXXX"
              />
              {errors.phone && (
                <p id="phone-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email & Project Category */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Email Address <span className="text-gold">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none"
                placeholder="name@domain.com"
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Project Category <span className="text-gold">*</span>
              </label>
              <select
                id="projectType"
                {...register("projectType")}
                aria-invalid={errors.projectType ? "true" : "false"}
                aria-describedby={errors.projectType ? "type-error" : undefined}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm focus:border-gold focus:outline-none"
              >
                <option value="">Select a category...</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="General Civil Construction">General Civil Construction</option>
              </select>
              {errors.projectType && (
                <p id="type-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.projectType.message}</p>
              )}
            </div>
          </div>

          {/* Row 3: Location & Budget */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Site Location <span className="text-gold">*</span>
              </label>
              <input
                id="location"
                type="text"
                {...register("location")}
                aria-invalid={errors.location ? "true" : "false"}
                aria-describedby={errors.location ? "loc-error" : undefined}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none"
                placeholder="e.g. Electronic City, Bangalore"
              />
              {errors.location && (
                <p id="loc-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Estimated Budget Range (Optional)
              </label>
              <input
                id="budget"
                type="text"
                {...register("budget")}
                className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none"
                placeholder="e.g. ₹50 Lakhs - ₹2 Crores"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
              Project Description &amp; Requirements <span className="text-gold">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              {...register("message")}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "msg-error" : undefined}
              className="w-full bg-charcoal border border-warm/20 px-4 py-3 text-sm text-warm placeholder-warm/40 focus:border-gold focus:outline-none resize-none"
              placeholder="Tell us about the site area, intended structure type, and timeline..."
            />
            {errors.message && (
              <p id="msg-error" className="text-xs text-cherry-accent font-medium mt-1.5">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-[#44d62c] text-[#111311] border border-[#44d62c] font-bold text-xs uppercase tracking-widest hover:bg-[#38be23] hover:border-[#38be23] transition-colors cursor-pointer text-center shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Submit Project Enquiry
            <ArrowRight className="size-4" />
          </button>
        </form>
      )}
    </div>
  );
}
