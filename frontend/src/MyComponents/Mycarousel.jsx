import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Mycarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel plugins={[plugin.current]} className="w-full h-screen max-w-3xl ">
      <CarouselContent className=" h-screen">
        <CarouselItem className="h-full ">
          <div className="h-full p-1">
            <Card className="h-full">
              <CardContent className="relative flex flex-col items-center justify-center h-full">
                <img src="illuus2.png" alt="" className='w-full h-full object-cover' />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t pl-8 pb-8">
                  <h2 className="text-lg font-semibold">Unlock Your Lost & Found Journey!</h2>
                  <p className="mt-1 text-sm">Log in with your college email to begin recovering lost items or reporting found treasures on ClaimChain!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="h-full">
          <div className="h-full p-1">
            <Card className="h-full">
              <CardContent className="relative flex flex-col items-center justify-center h-full">
                <img src="illus1.png" alt="" className='w-full h-full object-cover' />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t    pl-8 pb-8">
                  <h2 className="text-lg font-semibold">Discover Your Recovery Toolkit!</h2>
                  <p className="mt-1 text-sm">Explore tools that simplify reporting and reclaiming your belongings on ClaimChain!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem className="h-full">
          <div className="h-full p-1">
            <Card className="h-full">
              <CardContent className="relative flex flex-col items-center justify-center h-full">
                <img src="illus3.png" alt="" className='w-full h-full object-cover' />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t pl-8 pb-8">
                  <h2 className="text-lg font-semibold">Reunite and Celebrate!</h2>
                  <p className="mt-1 text-sm">Meet at a safe location to hand over the item, celebrating the connection and trust built through ClaimChain!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>

      {/* Optional: Carousel navigation buttons */}
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button className="bg-gray-700 text-white rounded px-4 py-2">Previous</button>
      </CarouselPrevious>
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button className="bg-gray-700 text-white rounded px-4 py-2">Next</button>
      </CarouselNext>
    </Carousel>
  );
}

export default Mycarousel;
