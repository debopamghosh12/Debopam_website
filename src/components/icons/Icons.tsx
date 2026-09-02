import { siGithub } from "simple-icons";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={siGithub.path} />
    </svg>
  );
}

// LinkedIn was removed from simple-icons (trademark takedown), so this is a
// hand-drawn minimal rendition of the familiar "in" badge glyph, not a
// verbatim copy of the official mark.
export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="2.5" y="9" width="3.5" height="12" />
      <circle cx="4.25" cy="4.25" r="2.25" />
      <path d="M10 9h3.5v1.9c.9-1.4 2.3-2.2 4.2-2.2 3.4 0 5.8 2.2 5.8 6.3V21h-3.5v-5.4c0-2-.8-3.2-2.5-3.2-1.6 0-2.7 1.1-2.7 3.2V21H10V9z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
