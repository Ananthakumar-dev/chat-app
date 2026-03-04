import Header from "@/components/app/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-svh w-full bg-[#fcf5eb]">
      {/* header */}
      <Header />

      {/* hero */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.webp"
            alt="WhatsApp hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
