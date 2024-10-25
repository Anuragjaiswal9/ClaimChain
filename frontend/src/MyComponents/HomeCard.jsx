import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check, MapPin, Calendar, Clock } from "lucide-react"

export default function Component({ 
  //get data from backend and store it into a data variable
  //const data <---- response.data
  //save this data into localstorege using setItem("itemData", data)
  productName = "Product Name",
  description = "This is a brief description of the product. It showcases the key features and benefits that make this item special.",
  images = [
    "/illus1.png?height=250&width=500&text=Product+Image+1",
    "/illus3.png?height=250&width=500&text=Product+Image+2",
    "/illuus2.png?height=250&width=500&text=Product+Image+3",
  ],
  location = "New York, NY",
  date = "2023-10-15",
  time = "14:30"
}) {
  const [isClaimed, setIsClaimed] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleClaim = () => {
    setTimeout(() => {
      setIsClaimed(true)
    }, 1000)
  }

  const changeImage = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  }

  const nextImage = () => {
    changeImage((currentImageIndex + 1) % images.length)
  }

  const prevImage = () => {
    changeImage((currentImageIndex - 1 + images.length) % images.length)
  }

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg">
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
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={nextImage}
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
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">{productName}</h2>
        <p className="text-default-600 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-danger" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-warning" />
            <span>{date}</span>
          </div>
          <div className="flex items-center col-span-2">
            <Clock className="h-4 w-4 mr-2 text-success" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 bg-muted/50">
        {!isClaimed ? (
          <Button onClick={handleClaim} className="w-full bg-foreground hover:bg-foreground">Claim Now</Button>
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
  )
}
/*itemData: {
1
2
3
4
}*/

/*itemData.map((data) => {
    data.title
    data.description.........
    const images[] = data.images;
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg">
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
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={nextImage}
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
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">{data.productName}</h2>
        <p className="text-default-600 mb-4">{data.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-danger" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-warning" />
            <span>{data.date}</span>
          </div>
          <div className="flex items-center col-span-2">
            <Clock className="h-4 w-4 mr-2 text-success" />
            <span>{data.time}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 bg-muted/50">
        {!isClaimed ? (
          <Button onClick={handleClaim} className="w-full bg-foreground hover:bg-foreground">Claim Now</Button>
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
  })*/