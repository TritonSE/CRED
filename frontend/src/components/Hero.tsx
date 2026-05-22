import HeroSection from "./HeroSection";

export default function Hero() {
  return (
    <HeroSection
      variant="tall"
      imageSrc="/home/home-page-banner.jpg"
      imageAlt="Hands coming together in community support"
      unoptimized
      title="Supporting Community, Stability, and Brighter Futures"
      subtitle="CRED is a reintegration and economic development organization focused on bridging the gap between economic independence, incarceration and stability through practical support, workforce development, and mentorship."
      subtitleEmphasis="bold"
      priority
    />
  );
}
