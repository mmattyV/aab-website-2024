import Image from 'next/image';

export default function Page() {
  return (
    <main className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src="/home-hero.jpeg"
          layout="fill"
          objectFit="cover"
          alt="Screenshots of the dashboard project showing desktop version"
          className="w-full h-full filter grayscale"
        />
      </div>
    </main>
  );
}