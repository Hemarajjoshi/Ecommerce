

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gray-100">
      <Container>
        <div className="text-center">
          <h2 className="text-lg uppercase tracking-[0.5em] text-gray-600 mb-4">
            New Collection
          </h2>
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-widest text-gray-900 mb-4">
            Summer
          </h1>
          <p className="text-gray-600 tracking-[0.5em]">2024</p>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;