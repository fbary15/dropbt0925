import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/rich";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost-light";
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children" | "className">;

/** Pill button with a circular arrow that turns on hover. */
export function Button({ href, children, variant = "solid", className, external, ...rest }: ButtonProps) {
  const styles = {
    solid: "bg-wine text-paper hover:bg-ink",
    outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
    light: "bg-paper text-ink hover:bg-wine hover:text-paper",
    "ghost-light": "border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink",
  }[variant];
  const dot = {
    solid: "bg-paper/15",
    outline: "bg-ink/5 group-hover:bg-paper/15",
    light: "bg-ink/5 group-hover:bg-paper/15",
    "ghost-light": "bg-paper/10 group-hover:bg-ink/5",
  }[variant];

  const inner = (
    <>
      <span className="relative">{children}</span>
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500", dot)}>
        <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[0.95rem] font-medium transition-colors duration-500",
    styles,
    className,
  );

  return external ? (
    <a href={href} className={classes} {...rest}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}

/** Text link with a sliding underline and arrow. */
export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2 text-[0.95rem] font-medium", className)}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}

/** Mono section label, e.g. "(01) — What we do". */
export function SectionLabel({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-ink-3", className)}>
      {index && <span className="text-wine">({index})</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

/** Small ink drop glyph used as a separator and brand motif. */
export function DropGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 56" aria-hidden className={cn("inline-block w-auto", className ?? "h-[0.5em]")}>
      <path d="M20 0C20 0 0 25 0 36a20 20 0 0 0 40 0C40 25 20 0 20 0Z" fill="currentColor" />
    </svg>
  );
}

/** Infinite CSS marquee. Content is rendered twice; the track moves by half its width. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("marquee flex overflow-hidden", reverse && "marquee-reverse", className)}>
      <div className="marquee-track flex w-max shrink-0" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Circular text badge that slowly rotates. */
export function RotatingBadge({
  text,
  className,
  children,
  id = "badge-circle",
}: {
  text: string;
  className?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-mono text-[13px] uppercase tracking-[0.16em]">
          <textPath href={`#${id}`} textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
