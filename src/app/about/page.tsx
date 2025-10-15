import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const teamImages = [
    PlaceHolderImages.find(p => p.id === 'product-cap-1'),
    PlaceHolderImages.find(p => p.id === 'product-hoodie-1'),
    PlaceHolderImages.find(p => p.id === 'product-tee-1'),
  ]

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">About E-motion Commerce</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We are dedicated to providing high-quality, dynamic apparel and gear for your active lifestyle. Our passion is movement, and our products are designed to support yours.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://picsum.photos/seed/about-mission/1200/800"
              alt="Team working together"
              fill
              className="object-cover"
              data-ai-hint="team collaboration"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-headline">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              To empower every individual to push their limits and embrace an active life by creating innovative, high-performance athletic wear that blends style, comfort, and durability. We believe that what you wear should be the last thing on your mind when you're focused on your goals.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Founded in 2023 by a group of fitness enthusiasts and designers, E-motion Commerce was born from a simple idea: athletic wear should perform as hard as you do, without compromising on style. Frustrated with the lack of options that were both functional and fashionable, we set out to create our own. From a small garage startup, we've grown into a community of movers, shakers, and innovators.
            </p>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
            <Image
              src="https://picsum.photos/seed/about-story/1200/800"
              alt="Person sketching designs"
              fill
              className="object-cover"
              data-ai-hint="design sketch"
            />
          </div>
        </div>

        <div className="mt-20">
            <h2 className="text-3xl font-bold font-headline text-center">Meet the Team</h2>
            <p className="mt-4 text-lg text-muted-foreground text-center max-w-2xl mx-auto">The passionate individuals behind our brand.</p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {['Alex Johnson', 'Maria Garcia', 'Sam Lee'].map((name, index) => (
                    <div key={name} className="text-center">
                        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md">
                            {teamImages[index] && <Image src={teamImages[index]!.imageUrl} alt={name} fill className="object-cover" data-ai-hint="portrait person" />}
                        </div>
                        <h3 className="mt-4 text-xl font-bold">{name}</h3>
                        <p className="text-primary font-medium">{index === 0 ? 'Founder & CEO' : index === 1 ? 'Head of Design' : 'Lead Developer'}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
