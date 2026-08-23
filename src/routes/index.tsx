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
      <section className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Art Mail Club
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Faith · Art · Purpose — cartas, ilustrações e adesivos entregues na sua caixa de correio.
          </p>
        </div>
      </section>
    </main>
  );
}
