"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SectionEyebrow, SectionHeading } from "@/components/ui/SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">{children}</div>
    </section>
  );
}

function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
}

function InViewWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

function InViewCard({ children, index, className = "" }: { children: React.ReactNode; index: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={stagger(index)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function IconBolt() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function AboutPageContent() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Navbar />

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/20 blur-[140px] rounded-full" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-800/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-[11px] font-bold uppercase tracking-[0.3em]">
              About Voltis Emoto
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-none"
          >
            <span className="block text-white">Built by riders.</span>
            <span className="block bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent mt-2">
              For riders.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Voltis Emoto is an Australian-owned business built on a single idea — the best electric motorcycles in the world should be here, backed properly, and available to the riders who actually want them.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* Section 2: Brand Story */}
      <Section>
        <InViewWrapper delay={0}>
          <SectionEyebrow>Our Story</SectionEyebrow>
        </InViewWrapper>

        <div className="mt-10 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <InViewWrapper delay={0.1}>
            <blockquote className="text-2xl md:text-3xl font-black tracking-tight leading-snug bg-gradient-to-br from-purple-400 to-violet-300 bg-clip-text text-transparent">
              &ldquo;We weren&rsquo;t satisfied with what was available. So we went and found something better.&rdquo;
            </blockquote>
          </InViewWrapper>

          <div className="flex flex-col gap-6">
            <InViewWrapper delay={0.15}>
              <p className="text-gray-400 leading-relaxed">
                Voltis Emoto started the way most real businesses do — out of a problem worth solving. We&rsquo;d spent years riding electric, importing bikes, testing them, modifying them, and learning firsthand what separated a genuinely great machine from a flashy disappointment. The Australian market had options. None of them were good enough.
              </p>
            </InViewWrapper>
            <InViewWrapper delay={0.22}>
              <p className="text-gray-400 leading-relaxed">
                Every bike in our current range has been ridden and assessed by our team before it reaches a customer. We don&rsquo;t list a model we haven&rsquo;t personally tested and believed in. That&rsquo;s not a marketing line — it&rsquo;s just how we&rsquo;d want to be treated as riders ourselves.
              </p>
            </InViewWrapper>
            <InViewWrapper delay={0.29}>
              <p className="text-gray-400 leading-relaxed">
                We&rsquo;re based in Australia, we support our customers from Australia, and we&rsquo;re building something this community deserves: a proper electric moto brand with real knowledge, real backing, and a genuine investment in where this technology is heading.
              </p>
            </InViewWrapper>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 3: Trust Stat Cards */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stat: "< 24 hrs",
              label: "Support Response",
              body: "We aim to reply to every inquiry within 24 hours on business days.",
            },
            {
              stat: "2 Year",
              label: "Powertrain Warranty",
              body: "Every bike comes with 2-year powertrain and 1-year component coverage.",
            },
            {
              stat: "100%",
              label: "Australian Owned",
              body: "Voltis Emoto is proudly independent and 100% Australian owned and operated.",
            },
            {
              stat: "Rider Tested",
              label: "Every Model",
              body: "Our team rides and assesses each bike before it enters the range.",
            },
          ].map((card, i) => (
            <InViewCard key={card.label} index={i}>
              <div className="group relative bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent leading-none">
                  {card.stat}
                </span>
                <span className="text-white font-bold text-sm tracking-wide">{card.label}</span>
                <p className="text-gray-500 text-sm leading-relaxed">{card.body}</p>
              </div>
            </InViewCard>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Section 4: Mission & Values */}
      <Section>
        <div className="text-center mb-12">
          <InViewWrapper delay={0}>
            <SectionEyebrow>What We Stand For</SectionEyebrow>
          </InViewWrapper>
          <InViewWrapper delay={0.1}>
            <SectionHeading>Our Values</SectionHeading>
          </InViewWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <IconBolt />,
              title: "Performance First",
              body: "We only carry bikes we'd actually want to ride. Every model earns its place in the range — selected on how it performs, how it holds up, and how it feels on real terrain.",
            },
            {
              icon: <IconShield />,
              title: "Honest Support",
              body: "No runaround. No overseas queues. When you contact us, you're talking to someone who knows these bikes and genuinely wants to help — not a script.",
            },
            {
              icon: <IconCheck />,
              title: "Quality Over Volume",
              body: "We'd rather carry four exceptional bikes than forty mediocre ones. Our range is deliberately small and deliberately good.",
            },
            {
              icon: <IconClock />,
              title: "Long-Term Thinking",
              body: "Buying electric is a long-term decision. We support you beyond the sale — warranty, service guidance, honest advice on ownership. We want you riding in five years.",
            },
          ].map((val, i) => (
            <InViewCard key={val.title} index={i}>
              <div className="group bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 h-full hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)] transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  {val.icon}
                </div>
                <h3 className="text-white font-bold text-base">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.body}</p>
              </div>
            </InViewCard>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Section 5: Why Choose LBX */}
      <Section>
        <div className="mb-12">
          <InViewWrapper delay={0}>
            <SectionEyebrow>Why Riders Choose Voltis</SectionEyebrow>
          </InViewWrapper>
          <InViewWrapper delay={0.1}>
            <SectionHeading>The Difference</SectionHeading>
          </InViewWrapper>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <IconMapPin />,
              title: "Australian-Based Support",
              body: "Our team is in Australia. When you contact us, you're reaching someone local who knows the bikes. No offshore call centres, no generic ticket systems.",
            },
            {
              icon: <IconCheck />,
              title: "Bikes We Believe In",
              body: "Every bike in our range has been personally assessed. We don't stock a model we haven't stood behind ourselves.",
            },
            {
              icon: <IconStar />,
              title: "Transparent Pricing",
              body: "What you see is what you pay. No hidden fees, no unexpected charges. We price fairly and explain exactly what's included.",
            },
            {
              icon: <IconBolt />,
              title: "Rider-First Advice",
              body: "We give honest advice, even if it means telling you a bike isn't the right fit. Getting the right match matters more to us than making a sale.",
            },
            {
              icon: <IconShield />,
              title: "Long-Term Warranty",
              body: "2-year powertrain warranty on every bike. Full component coverage included. We back what we sell.",
            },
            {
              icon: <IconClock />,
              title: "Built for the Community",
              body: "Voltis Emoto isn't just a store. We're riders building something we think the Australian electric moto community deserves.",
            },
          ].map((pillar, i) => (
            <InViewCard key={pillar.title} index={i}>
              <div className="group bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-4 h-full hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    {pillar.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm">{pillar.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            </InViewCard>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Section 6: Support Commitment */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <InViewWrapper delay={0}>
              <SectionEyebrow>Support</SectionEyebrow>
            </InViewWrapper>
            <InViewWrapper delay={0.1}>
              <SectionHeading>We&rsquo;re Here When You Need Us</SectionHeading>
            </InViewWrapper>
            <InViewWrapper delay={0.2}>
              <p className="mt-5 text-gray-400 leading-relaxed">
                Buying online means trusting who you&rsquo;re buying from. We take that seriously. Every customer gets direct access to our team — before the sale, during delivery, and long after you&rsquo;re out on the trails.
              </p>
            </InViewWrapper>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: <IconEnvelope />,
                title: "voltisemoto@gmail.com",
                body: "Direct email access to our team. We respond within 24 hours on business days.",
              },
              {
                icon: <IconShield />,
                title: "2-Year Warranty Included",
                body: "Every bike includes powertrain warranty and 1-year component coverage as standard.",
              },
              {
                icon: <IconMapPin />,
                title: "Based in Australia",
                body: "Our team is local. No international time zones, no language barriers.",
              },
            ].map((row, i) => (
              <InViewCard key={row.title} index={i}>
                <div className="group flex items-start gap-4 bg-white/[0.04] border border-white/[0.07] backdrop-blur-xl rounded-2xl p-5 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{row.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{row.body}</p>
                  </div>
                </div>
              </InViewCard>
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* Section 7: Rider Community Vision */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[14vw] font-black text-white/[0.02] tracking-widest">VOLTIS</span>
        </div>

        <div className="relative z-10 max-w-3xl">
          <InViewWrapper delay={0}>
            <SectionEyebrow>The Bigger Picture</SectionEyebrow>
          </InViewWrapper>
          <InViewWrapper delay={0.1}>
            <SectionHeading>Riding Into Something Bigger</SectionHeading>
          </InViewWrapper>
          <InViewWrapper delay={0.2}>
            <p className="mt-6 text-gray-400 leading-relaxed">
              The shift to electric isn&rsquo;t a trend — it&rsquo;s the direction the whole industry is heading, and it&rsquo;s accelerating. Instant torque, near-silent performance, zero drivetrain maintenance. Once you&rsquo;ve ridden a properly built electric moto, going back feels like a step backwards.
            </p>
          </InViewWrapper>
          <InViewWrapper delay={0.3}>
            <p className="mt-4 text-gray-400 leading-relaxed">
              We&rsquo;re building Voltis Emoto for the riders who already know this. Who&rsquo;ve done the research, felt that rush, and are ready to commit. And for the riders who are still figuring it out — we&rsquo;re here for that conversation too. The Australian electric moto community is growing fast. We&rsquo;re proud to be part of it from the ground up.
            </p>
          </InViewWrapper>
        </div>
      </Section>

      <Divider />

      {/* Section 8: CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/25 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <InViewWrapper delay={0}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Ready to Ride?</h2>
          </InViewWrapper>
          <InViewWrapper delay={0.12}>
            <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
              Browse our current range or get in touch — we&rsquo;re happy to help you find the right bike.
            </p>
          </InViewWrapper>
          <InViewWrapper delay={0.22}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all duration-200 font-bold tracking-wide shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] text-white text-[13px] uppercase tracking-[0.15em] px-8 py-4 rounded-full"
              >
                Browse Bikes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 active:scale-95 transition-all duration-200 font-bold tracking-wide text-white text-[13px] uppercase tracking-[0.15em] px-8 py-4 rounded-full"
              >
                Contact Us
              </Link>
            </div>
          </InViewWrapper>
        </div>
      </section>

      <Footer />
    </div>
  );
}
