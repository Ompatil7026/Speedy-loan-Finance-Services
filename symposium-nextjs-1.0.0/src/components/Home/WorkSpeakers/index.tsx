"use client";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WorkSpeakers = ({ showTitle = true }) => {
  const pathname = usePathname();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [speakers, setSpeakers] = useState<any[]>([]);

  // Load speakers from Supabase
  const loadSpeakers = async () => {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error loading speakers:", error);
    } else {
      setSpeakers(data);
    }
  };

  // Fetch + realtime updates
  useEffect(() => {
    loadSpeakers();

    const channel = supabase
      .channel("realtime speakers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "speakers" },
        () => {
          loadSpeakers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <section className={`content-visibility-auto dark:bg-darkmode ${pathname === "/" ? "" : ""}`}>
        {showTitle && (
          <h2 className="text-center pb-12">
            Banks Included in Our Services.
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-stretch gap-6 mx-4 md:mx-7">

          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
              data-aos-duration="1000"
              className={`col-span-1 group overflow-hidden ${
                index % 2 === 1 ? "lg:mt-28 mt-0" : ""
              }`}
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={speaker.src}
                  alt={speaker.alt}
                  width={400}
                  height={400}
                  quality={100}
                  sizes="100vw"
                  className="object-cover w-full h-full transition-all duration-200 group-hover:scale-110 cursor-pointer"
                  onClick={() => setSelectedImage(speaker.preview)}
                />
              </div>

              <div className="pt-6">
                <h6 className="text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white">
                  {speaker.name}
                </h6>

                <span className="text-lg font-normal text-SlateBlueText dark:text-opacity-80">
                  {speaker.designation}
                </span>
              </div>
            </div>
          ))}

        </div>

        {/* IMAGE POPUP MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >

              {/* Close Button */}
              <button
                className="absolute top-3 right-3 bg-white border rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold hover:bg-gray-200"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>

              {/* Image */}
              <Image
                src={selectedImage}
                alt="Bank Details"
                width={1200}
                height={800}
                className="max-h-[70vh] w-auto object-contain rounded-md"
              />

            </div>
          </div>
        )}

      </section>

      
    </>
  );
};

export default WorkSpeakers;