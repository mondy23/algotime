"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollEffects() {
  useLayoutEffect(() => {
    // Initialize smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    // ScrollReveal with reverse
    gsap.utils.toArray<HTMLElement>(".reveal").forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    // Parallax
    const parallaxSection = document.querySelector<HTMLElement>(".parallax-section");
    if (parallaxSection) {
      const parallaxBg = parallaxSection.querySelector<HTMLElement>(".parallax-bg");
      if (parallaxBg) {
        gsap.to(parallaxBg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    // Timeline Animation
    const timelineSection = document.querySelector<HTMLElement>(".timeline-section");
    if (timelineSection) {
      const timelineText = timelineSection.querySelector<HTMLElement>(".timeline-text");
      if (timelineText) {
        gsap.timeline({
          scrollTrigger: {
            trigger: timelineSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        })
        .fromTo(timelineText, { x: -200, opacity: 0 }, { x: 0, opacity: 1 })
        .to(timelineText, { x: 200, opacity: 0 });
      }
    }

    // Pinned Fade Effect
    gsap.utils.toArray<HTMLElement>(".pinned-fade").forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0 }, 
        { opacity: 1, 
          scrollTrigger: { 
            trigger: el, 
            start: "top center", 
            end: "bottom center", 
            scrub: true, 
            pin: true 
          } 
        });
    });

    // 3D Scroll Effect
    const rotate3D = document.querySelector<HTMLElement>(".rotate-3d");
    if (rotate3D) {
      gsap.fromTo(
        rotate3D,
        { rotateY: 20, rotateX: 10, scale: 0.9 },
        {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          scrollTrigger: {
            trigger: rotate3D,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // Scale on Scroll
    gsap.utils.toArray<HTMLElement>(".scale-on-scroll").forEach(el => {
      gsap.fromTo(
        el,
        { scale: 0.8 },
        {
          scale: 1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 20%", scrub: true },
        }
      );
    });

    // Rotate on Scroll
    gsap.utils.toArray<HTMLElement>(".rotate-on-scroll").forEach(el => {
      gsap.fromTo(
        el,
        { rotate: -15 },
        {
          rotate: 0,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // Staggered Reveal with reverse
    const staggerSection = document.querySelector<HTMLElement>(".stagger-section");
    if (staggerSection) {
      const items = staggerSection.querySelectorAll<HTMLElement>(".stagger-item");
      gsap.from(items, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: staggerSection,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });
    }

    // Skew on Scroll
    gsap.utils.toArray<HTMLElement>(".skew-on-scroll").forEach(el => {
      gsap.to(el, {
        skewY: 5,
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Background Color Change
    gsap.utils.toArray<HTMLElement>(".bg-change").forEach(el => {
      gsap.to(el, {
        backgroundColor: "#000",
        scrollTrigger: { trigger: el, start: "top 50%", end: "bottom 50%", scrub: true },
      });
    });

    // Slide In From Sides
    gsap.utils.toArray<HTMLElement>(".slide-in-left").forEach(el => {
      gsap.from(el, {
        x: -200,
        opacity: 0,
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    });
    gsap.utils.toArray<HTMLElement>(".slide-in-right").forEach(el => {
      gsap.from(el, {
        x: 200,
        opacity: 0,
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" },
      });
    });

    // Fade Out on Scroll
    gsap.utils.toArray<HTMLElement>(".fade-out").forEach(el => {
      gsap.to(el, {
        opacity: 0,
        scrollTrigger: { trigger: el, start: "top center", end: "bottom top", scrub: true },
      });
    });

    // Section Snap (7 sections)
    // const totalSections = document.querySelectorAll("section").length;
    // ScrollTrigger.create({
    //   snap: {
    //     snapTo: (progress) => {
    //       const index = Math.round(progress * (totalSections - 1));
    //       return index / (totalSections - 1);
    //     },
    //     duration: 0.5,
    //     ease: "power1.inOut",
    //   },
    // });

    // Cleanup on unmount
    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">

        <section className="h-screen flex items-center justify-center bg-gray-300">
          <h1 className="text-5xl">Smooth Scroll</h1>
        </section>

        <section className="h-screen flex flex-col items-center justify-center bg-red-300">
          <h1 className="text-5xl mb-6 reveal">ScrollReveal Effect</h1>
          <p className="text-xl reveal">Fade-in and move up on scroll</p>
        </section>

        <section className="parallax-section h-screen relative overflow-hidden">
          <div className="parallax-bg absolute top-0 left-0 w-full h-full bg-blue-500"></div>
          <h1 className="relative z-10 text-5xl text-white flex items-center justify-center h-screen">
            Parallax Effect
          </h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-green-300">
          <h1 className="text-5xl">Section Snap Scroll</h1>
        </section>

        <section className="timeline-section h-screen flex items-center justify-center bg-yellow-300">
          <h1 className="timeline-text text-5xl">Timeline Scroll Animation</h1>
        </section>

        <section className="pinned-fade h-screen flex items-center justify-center bg-purple-300">
          <h1 className="text-5xl">Pinned Fade Effect</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-indigo-300 rotate-3d" style={{ perspective: "1000px" }}>
          <h1 className="text-5xl">3D Scroll Effect</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-pink-400 scale-on-scroll">
          <h1 className="text-5xl">Scale On Scroll</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-teal-400 rotate-on-scroll">
          <h1 className="text-5xl">Rotate On Scroll</h1>
        </section>

        <section className="h-screen flex flex-col items-center justify-center bg-orange-400 stagger-section">
          <h1 className="stagger-item text-4xl mb-2">Stagger Item 1</h1>
          <h1 className="stagger-item text-4xl mb-2">Stagger Item 2</h1>
          <h1 className="stagger-item text-4xl mb-2">Stagger Item 3</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-lime-400 skew-on-scroll">
          <h1 className="text-5xl">Skew On Scroll</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-rose-400 bg-change">
          <h1 className="text-5xl">Background Color Change</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-cyan-400 slide-in-left">
          <h1 className="text-5xl">Slide In From Left</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-fuchsia-400 slide-in-right">
          <h1 className="text-5xl">Slide In From Right</h1>
        </section>

        <section className="h-screen flex items-center justify-center bg-amber-400 fade-out">
          <h1 className="text-5xl">Fade Out On Scroll</h1>
        </section>

      </div>
    </div>
  );
}
