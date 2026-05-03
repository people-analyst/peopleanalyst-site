import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Masthead } from "@/components/masthead";
import { Footer } from "@/components/footer";
import { MarkdownProse } from "@/components/markdown-prose";

export const metadata = {
  title: "Consulting · peopleanalyst",
  description:
    "Mike West's people-analytics consulting practice. Decision support under uncertainty, function build, platform selection, custom analytics architecture, compensation modeling, workforce planning, survey strategy, diagnostic research, AI-native augmentation, methodology coaching.",
};

export default function ConsultingPage() {
  const body = readFileSync(
    join(process.cwd(), "content", "consulting", "services.md"),
    "utf8",
  );

  return (
    <>
      <Masthead />

      <main className="mx-auto max-w-[900px] px-6">
        <article className="py-12">
          <MarkdownProse>{body}</MarkdownProse>
        </article>

        <Footer />
      </main>
    </>
  );
}
