import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/home.html" });
  },
  head: () => ({
    meta: [
      { title: "UniCourses | HTI" },
      { name: "description", content: "UniCourses — Academic resources and study plans for HTI students." },
      { property: "og:title", content: "UniCourses | HTI" },
      { property: "og:description", content: "Academic resources and study plans for HTI students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
