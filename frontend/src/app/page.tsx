import Collaborator from "@/components/Collaborator";
import Foundations from "@/components/Foundations";
import HeroSection from "@/components/HeroSection";
import JourneyBanner from "@/components/JourneyBanner";
import Mission from "@/components/Mission";
import Support from "@/components/Support";

export default function Home() {
  return (
    <>
      <HeroSection
        variant="tall"
        imageSrc="/home/hero/HomepageHero.jpg"
        imageAlt="Hands coming together in community support"
        unoptimized
        title="Supporting Community, Stability, and Brighter Futures"
        subtitle="CRED is a reintegration and economic development organization focused on bridging the gap between economic independence, incarceration and stability through practical support, workforce development, and mentorship."
        subtitleEmphasis="bold"
        priority
      />
      <Mission />
      <Foundations />
      <Support />
      <Collaborator />
      <JourneyBanner />
    </>
  );
}
