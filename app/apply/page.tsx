import PageHero from "@/components/PageHero";
import Link from "next/link";

const requirements = [
  "Academic transcripts",
  "Passport copy",
  "Resume or CV",
  "Statement of purpose draft",
];

export default function ApplyPage() {
  return (
    <main className="min-h-screen text-white">
      <PageHero
        eyebrow="Apply Now"
        title="Launch your application with a guided plan."
        subtitle="Submit your profile once and our advisors will build a timeline, shortlist, and document checklist tailored to you."
        primaryCta={{ label: "Start Application", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
      />

      <section className="pb-14">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "1. Profile review",
              detail: "We assess academics, experience, and target intake.",
            },
            {
              title: "2. Shortlist build",
              detail: "Programs are ranked by fit, budget, and outcomes.",
            },
            {
              title: "3. Application sprint",
              detail: "Documents, SOP edits, and submission tracking.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm text-white/70">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Checklist preview</h2>
            <p className="mt-2 text-white/70">
              We keep the paperwork light and structured. Uploads happen after
              your first call.
            </p>
            <div className="mt-6 space-y-3">
              {requirements.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Timeline estimate</h3>
              <p className="mt-3 text-white/70">
                Average intake planning takes 6-8 weeks from first call to
                submission.
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { label: "Discovery", value: "Week 1" },
                { label: "Shortlist", value: "Week 2" },
                { label: "Applications", value: "Weeks 3-6" },
                { label: "Visa prep", value: "Weeks 6-8" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 flex items-center justify-between text-sm text-white/80"
                >
                  <span>{item.label}</span>
                  <span className="text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Ready to apply?</h3>
              <p className="mt-2 text-white/70">
                Book a call and we will take it from here.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
