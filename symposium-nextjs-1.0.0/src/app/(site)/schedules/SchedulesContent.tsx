"use client";

import dynamic from "next/dynamic";

/* ─── Dynamic Imports with inline skeletons (Client Component) ── */

const BoxSlider = dynamic(() => import("@/components/SharedComponent/BoxSlider"), {
  loading: () => (
    <div className="flex gap-3 overflow-hidden py-4">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex-shrink-0 w-24 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
        />
      ))}
    </div>
  ),
  ssr: false,
});

const Schedules = dynamic(() => import("@/components/Home/Schedules"), {
  loading: () => (
    <div className="w-full border border-solid border-gray-200 dark:border-gray-700 md:px-14 px-6 mt-6 rounded-2xl">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between w-full md:py-10 py-5 border-b border-gray-200 dark:border-gray-700 last:border-b-0 gap-6 animate-pulse"
        >
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-lg w-48" />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-36" />
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-32" />
        </div>
      ))}
    </div>
  ),
  ssr: false,
});

const Testimonials = dynamic(() => import("@/components/Home/Testimonials"), {
  loading: () => (
    <div className="py-10 space-y-4 animate-pulse px-6">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
    </div>
  ),
  ssr: false,
});

const TicketSection = dynamic(() => import("@/components/Home/TicketSection"), {
  loading: () => <div className="h-48" />,
  ssr: false,
});

export default function SchedulesContent() {
  return (
    <>
      <section className="dark:bg-darkmode">
        <div className="container upcoming">
          <BoxSlider />
          <Schedules />
        </div>
      </section>
      <Testimonials />
      <TicketSection />
    </>
  );
}
