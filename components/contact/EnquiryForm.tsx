"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { mailHref, whatsappHref, hasEmail, hasWhatsapp } from "@/lib/contact";

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
    // As per static deployment specifications: Do not fabricate a backend success state.
    // Present the structured enquiry payload and provide direct mailto / WhatsApp generation.
    setSubmittedData(data);
  };

  const handleReset = () => {
    setSubmittedData(null);
    reset();
  };

  return (
    <div className="border border-warm/15 bg-charcoal-2 p-6 sm:p-10">
      <div className="flex items-center justify-between border-b border-warm/10 pb-5 mb-8">
        <div>
          <h2 className="display-h3 text-warm">Project Enquiry Form</h2>
          <p className="text-xs text-concrete mt-1">Submit your civil construction requirements</p>
        </div>
        <PlaceholderTag>UI Prototype</PlaceholderTag>
      </div>

      <div className="mb-8 p-4 border-l-4 border-l-cherry border-y border-r border-warm/15 bg-charcoal text-xs text-warm/80 leading-relaxed">
        <strong className="text-cherry-accent uppercase tracking-wider block mb-1">Static Deployment Notice</strong>
        This static frontend does not transmit personal data to an unverified database. Filling this form
        generates an instant, formatted email or WhatsApp message directly to our team.
      </div>

      {submittedData ? (
        <div className="space-y-6 bg-charcoal p-6 border border-warm/20">
          <div className="border-l-2 border-gold pl-4">
            <h3 className="text-sm font-semibold text-warm uppercase tracking-wider">
              Enquiry Prepared for Transmission
            </h3>
            <p className="text-xs text-concrete mt-1">
              Click below to send via your preferred contact channel:
            </p>
          </div>

          <div className="text-xs text-warm/80 space-y-1.5 font-mono bg-charcoal-3 p-4 border border-warm/10">
            <p><strong>Client:</strong> {submittedData.name} ({submittedData.phone})</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Category:</strong> {submittedData.projectType}</p>
            <p><strong>Location:</strong> {submittedData.location}</p>
            {submittedData.budget && <p><strong>Budget:</strong> {submittedData.budget}</p>}
            <p className="pt-2 border-t border-warm/10"><strong>Brief:</strong> {submittedData.message}</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
            {hasEmail && (
              <a
                href={mailHref(
                  `Project Enquiry: ${submittedData.projectType} in ${submittedData.location}`,
                  `Name: ${submittedData.name}\nPhone: ${submittedData.phone}\nEmail: ${submittedData.email}\nProject Type: ${submittedData.projectType}\nLocation: ${submittedData.location}\nBudget: ${submittedData.budget || "Not specified"}\n\nMessage:\n${submittedData.message}`
                ) ?? "#"}
                className="w-full sm:w-auto px-6 py-3 bg-[#111311] text-[#f5f2eb] border border-[#111311] font-semibold text-xs uppercase tracking-wider hover:bg-gold hover:text-white dark:bg-gold dark:text-[#111311] dark:border-gold dark:hover:bg-[#f5f2eb] dark:hover:text-[#111311] transition-colors text-center"
              >
                Send via Email
              </a>
            )}

            {hasWhatsapp && (
              <a
                href={whatsappHref(
                  `*Pioneer Builders Project Enquiry*\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nType: ${submittedData.projectType}\nLocation: ${submittedData.location}\nMessage: ${submittedData.message}`
                ) ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-forest text-warm border border-forest font-semibold text-xs uppercase tracking-wider hover:bg-forest/90 transition-colors flex items-center justify-center gap-2"
              >
                <span className="size-2 rounded-full bg-[#52c295]" aria-hidden />
                Send via WhatsApp
              </a>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-3 text-xs text-concrete uppercase tracking-wider hover:text-warm transition-colors cursor-pointer text-center border border-warm/15"
            >
              Modify Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Row 1: Name and Phone */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Your Full Name <span className="text-gold">*</span>
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

          {/* Row 2: Email and Project Type */}
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
                <option value="">Select Category</option>
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

          {/* Row 3: Location and Budget */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="location" className="block text-xs font-semibold uppercase tracking-wider text-warm mb-2">
                Project Location <span className="text-gold">*</span>
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
            className="w-full sm:w-auto px-8 py-4 bg-[#111311] text-[#f5f2eb] border border-[#111311] font-semibold text-xs uppercase tracking-widest hover:bg-gold hover:text-white dark:bg-gold dark:text-[#111311] dark:border-gold dark:hover:bg-[#f5f2eb] dark:hover:text-[#111311] transition-colors cursor-pointer text-center"
          >
            Review &amp; Prepare Enquiry
          </button>
        </form>
      )}
    </div>
  );
}
