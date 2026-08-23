import { createFileRoute } from "@tanstack/react-router";

import { EnvelopeScrollSequence } from "@/components/EnvelopeScrollSequence";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Art Mail Club — Abra a carta rolando a página" },
      {
        name: "description",
        content:
          "Uma experiência de scroll frame a frame: abra o envelope do Art Mail Club e descubra fé, arte e propósito enviados pelo correio.",
      },
      { property: "og:title", content: "Art Mail Club — Abra a carta rolando a página" },
      {
        property: "og:description",
        content:
          "Role a página para abrir o envelope do Art Mail Club, frame a frame, no seu ritmo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background">
      <EnvelopeScrollSequence />
    </main>
  );
}
