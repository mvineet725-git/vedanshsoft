export type IconName =
  | "building"
  | "users"
  | "wallet"
  | "chart"
  | "bell"
  | "shield"
  | "mobile"
  | "clipboard"
  | "calendar"
  | "graduation"
  | "book"
  | "message"
  | "check"
  | "arrow-right"
  | "phone"
  | "mail"
  | "whatsapp"
  | "clock"
  | "search"
  | "layers"
  | "map-pin"
  | "x-circle";

const paths: Record<IconName, string> = {
  building: "M4 21V7l8-4 8 4v14M4 21h16M9 21v-5h6v5M9 11h.01M9 15h.01M15 11h.01M15 15h.01",
  users: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  wallet: "M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm16 5h-3a2 2 0 1 0 0 4h3",
  chart: "M3 3v18h18M7 16l4-5 3 3 5-7",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  mobile: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1ZM11 18h2",
  clipboard: "M9 2h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2V3a1 1 0 0 1 1-1ZM9 11h6M9 15h6M9 7h6",
  calendar: "M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  graduation: "M22 10 12 5 2 10l10 5 10-5ZM6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-3",
  message: "M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 21l2-5.5A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z",
  check: "M20 6 9 17l-5-5",
  "arrow-right": "M5 12h14M13 5l7 7-7 7",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 6 12 13 2 6",
  whatsapp: "M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 20l1-5.3A8.5 8.5 0 1 1 21 11.5Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  layers: "m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
  "map-pin": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  "x-circle": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6",
};

export default function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
