//src\app\letters\[slug]\page.tsx

import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import LetterFlipCard from "@/components/card/lettercard";

interface Letter {
  slug: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image?: string;
}

export default async function LetterPage({
  params,
}: {
  params: { slug: string };
}) {
  const file = await fs.readFile(
    path.join(process.cwd(), "public", "letters.json"),
    "utf-8"
  );

  const letters: Letter[] = JSON.parse(file);
  const letter = letters.find((l) => l.slug === params.slug);

  if (!letter) {
    return notFound();
  }

  return (
    <div className="max-w-full mx-auto px-4 py-12 space-y-8 text-center bg-pink-50">
      <div>
        <Link href="/letters" className="text-rose-500 underline">
          ← Back to letters
        </Link>
      </div>

      <LetterFlipCard
        title={letter.title}
        paragraph1={letter.paragraph1}
        paragraph2={letter.paragraph2}
        paragraph3={letter.paragraph3}
        image={letter.image ?? "/default.jpg"}
      />
    </div>
  );
}
