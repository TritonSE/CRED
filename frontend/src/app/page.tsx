import Collaborator from "../components/Collaborator";
import Foundations from "../components/Foundations";
import Hero from "../components/Hero";
import JourneyBanner from "../components/JourneyBanner";
import Mission from "../components/Mission";
// import ReferralSection from "../components/ReferralSection";
import Support from "../components/Support";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Foundations />
      <Support />
      {/*<ReferralSection />*/}
      <Collaborator />
      <JourneyBanner />
    </>
  );
}
