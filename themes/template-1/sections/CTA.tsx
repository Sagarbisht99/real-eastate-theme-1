"use client";

import { useState } from "react";
import MediaImage from "@/components/MediaImage";
import type { FormField, ResolvedSiteData } from "@/lib/types";

function Field({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `home-${field.label.toLowerCase().replace(/\s+/g, "-")}`;

  if (field.type === "textarea") {
    return (
      <div className="border-b border-white/20 py-4">
        <label htmlFor={id} className="block text-sm font-medium text-white">
          {field.label}
        </label>
        <textarea
          id={id}
          name={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="mt-2 min-h-[72px] w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/35"
        />
      </div>
    );
  }

  return (
    <div className="border-b border-white/20 py-4">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {field.label}
      </label>
      <input
        id={id}
        name={id}
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="mt-2 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
      />
    </div>
  );
}

/** CTA — from FormDetail JSON */
export default function CTA({ data }: { data: ResolvedSiteData }) {
  const { formDetail } = data;
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!formDetail.title) return null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="book-a-visit" className="scroll-mt-24 px-4 py-7 md:px-8 md:py-8 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#141414] md:rounded-[2rem]">
        {formDetail.backgroundImage && (
          <div className="absolute inset-0 opacity-25">
            <MediaImage
              themeId={data.themeId}
              src={formDetail.backgroundImage}
              alt={formDetail.backgroundImageTitle || formDetail.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/92 to-[#141414]/70" />

        <div className="relative grid gap-8 px-6 py-8 md:grid-cols-2 md:gap-10 md:px-10 md:py-10 lg:px-14">
          <div>
            {formDetail.pretitle && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c44536]">
                {formDetail.pretitle}
              </p>
            )}
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-white md:text-[2.5rem]">
              {formDetail.title}
            </h2>
            {formDetail.desc && (
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 md:text-base">
                {formDetail.desc}
              </p>
            )}
          </div>

          <div>
            {submitted ? (
              <p className="text-sm text-white/75">
                Thank you — we received your request. An advisor will reach out shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                {formDetail.formFields.map((field) => (
                  <Field
                    key={field.label}
                    field={field}
                    value={values[field.label] ?? ""}
                    onChange={(v) => setValues((prev) => ({ ...prev, [field.label]: v }))}
                  />
                ))}
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#141414] transition hover:bg-white/90"
                  >
                    {formDetail.formSubmitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
