import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, MapPin, Calendar, Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function HomeCard({
  productName,
  description,
  images,
  location,
  date,
  time,
  owner,
}) {
  const [isClaimed, setIsClaimed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleClaim = (receiverId) => {
    const senderId = localStorage.getItem('senderId')
    navigate('/chat',{state:{receiverId,senderId}})

  };
  
  const changeImage = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextImage = () => {
    changeImage((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    changeImage((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg flex flex-col">
      <div className="relative aspect-video">
        {images.map((src, index) => (
          <img
            key={src}
            alt={`Product image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            src={src}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-2 line-clamp-1">{productName}</h2>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-green-500" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 bg-muted/50">
        {!isClaimed ? (
          <Button onClick={()=>handleClaim(owner)} className="w-full bg-foreground hover:bg-default-800">Claim Now</Button>

        ) : (
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Claimed</span>
            <span className="text-sm font-medium flex items-center text-green-600">
              <Check className="mr-1 h-4 w-4" />
              Confirmed
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

