import Collaborator from "@/components/Collaborator";
import Foundations from "@/components/Foundations";
import Hero from "@/components/Hero";
import JourneyBanner from "@/components/JourneyBanner";
import Mission from "@/components/Mission";
import Support from "@/components/Support";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Foundations />
      <Support />
      <Collaborator />
      <JourneyBanner />
    </>
  );
}
