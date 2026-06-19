import Collaborator from "@/components/Collaborator";
import Foundations from "@/components/Foundations";
import HashScrollHandler from "@/components/HashScrollHandler";
import HeroSection from "@/components/HeroSection";
import JourneyBanner from "@/components/JourneyBanner";
import Mission from "@/components/Mission";
import Support from "@/components/Support";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection
        variant="tall"
        imageSrc="/home/hero/HomepageHero.jpg"
        imageAlt="Hands coming together in community support"
        title="Supporting Community, Stability, and Brighter Futures"
        subtitle="CRED is a reintegration and economic development organization focused on bridging the gap between economic independence, incarceration and stability through practical support, workforce development, and mentorship."
        overlayGradient="linear-gradient(180deg, #004377, rgba(30, 115, 190, 0.8))"
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
