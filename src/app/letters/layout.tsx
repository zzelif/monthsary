import Audio from "@/components/audio-playback";
import Header from "@/components/layout/header";

export default async function LetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Header />
      </div>
      {children}
      <div className="fixed bottom-4 right-4 z-50">
        <Audio />
      </div>
    </div>
  );
}
