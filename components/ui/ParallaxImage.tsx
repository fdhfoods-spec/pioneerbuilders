import Image from "next/image";
import { cn } from "@/lib/cn";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  speed?: number;
  /** Wipe the image in when it enters the viewport. */
  reveal?: boolean;
  /** Width/height only reserve intrinsic ratio; `fill` handles actual sizing. */
}

/**
 * Server component: static markup. The data-attributes are picked up by
 * lib/motion/parallax.ts (tablet and up, motion allowed). The frame's aspect
 * ratio is set by the parent via className, so there is no layout shift.
 */
export function ParallaxImage({ src, alt, className, sizes = "100vw", priority, speed = 0.05, reveal = true }: ParallaxImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-charcoal-3", className)} data-reveal={reveal ? "image" : undefined}>
      <div data-parallax data-speed={speed} className="absolute inset-x-0 -inset-y-[8%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
