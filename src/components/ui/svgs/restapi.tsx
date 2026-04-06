import type { SVGProps } from "react";

// REST API represented by a simple clean cloud/API icon
const RESTAPI = (props: SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>REST API</title>
    <path d="M3 12h18M3 6h18M3 18h18" />
    <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export { RESTAPI };
