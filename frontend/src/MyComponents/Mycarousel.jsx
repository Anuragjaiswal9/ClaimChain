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
    <Carousel plugins={[plugin.current]} className="w-full  max-w-5xl  md:h-screen overflow-hidden">
      <CarouselContent className="sm:h-screen  ">
        {/* Carousel Slide 1 */}
        <CarouselItem className="h-full flex flex-col">
          <div className="h-[70%] max-sm:h-[40%]">
            <img src="illuus2.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-[30%] max-sm:h-40 bg-gray-900 flex flex-col items-start justify-center p-4 max-sm:p-6 text-white">
            <h2 className="text-xl max-sm:text-2xl font-semibold">Unlock Your Lost & Found Journey!</h2>
            <p className="mt-2 max-sm:mt-4 text-sm max-sm:text-base">
              Log in with your college email to begin recovering lost items or reporting found treasures on ClaimChain!
            </p>
          </div>
        </CarouselItem>

        {/* Carousel Slide 2 */}
        <CarouselItem className="h-full flex flex-col">
          <div className="h-[70%] max-sm:h-[40%]">
            <img src="illus1.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-[30%] max-sm:h-40 bg-blue-900 flex flex-col items-start justify-center p-4 max-sm:p-6 text-white">
            <h2 className="text-xl max-sm:text-2xl font-semibold">Discover Your Recovery Toolkit!</h2>
            <p className="mt-2 max-sm:mt-4 text-sm max-sm:text-base">
              Explore tools that simplify reporting and reclaiming your belongings on ClaimChain!
            </p>
          </div>
        </CarouselItem>

        {/* Carousel Slide 3 */}
        <CarouselItem className="h-full flex flex-col">
          <div className="h-[70%] max-sm:h-[40%]">
            <img src="illus3.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="h-[30%] max-sm:h-40 bg-green-900 flex flex-col items-start justify-center p-4 max-sm:p-6 text-white">
            <h2 className="text-xl max-sm:text-2xl font-semibold">Reunite and Celebrate!</h2>
            <p className="mt-2 max-sm:mt-4 text-sm max-sm:text-base">
              Meet at a safe location to hand over the item, celebrating the connection and trust built through ClaimChain!
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>

      {/* Carousel navigation buttons */}
      <CarouselPrevious className="absolute left-4 max-sm:top-[330px] sm:top-[545px] transform -translate-y-1/2">
        <button className="bg-gray-700 text-white rounded px-3 py-1 max-sm:px-4 max-sm:py-2">Previous</button>
      </CarouselPrevious>
      <CarouselNext className="absolute right-4 max-sm:top-[330px] sm:top-[545px] transform -translate-y-1/2">
        <button className="bg-gray-700 text-white rounded px-3 py-1 max-sm:px-4 max-sm:py-2">Next</button>
      </CarouselNext>
    </Carousel>
  );
}

export default Mycarousel;
