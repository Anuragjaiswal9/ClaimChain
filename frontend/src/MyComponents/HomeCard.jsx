import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

export default function Component() {
    const [isClaimed, setIsClaimed] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const images = [

        "/illus1.png?height=250&width=500&text=Product+Image+1",
        "/illus3.png?height=250&width=500&text=Product+Image+2",
        "/illuus2.png?height=250&width=500&text=Product+Image+3",
    ]

    const handleClaim = () => {
        setTimeout(() => {
            setIsClaimed(true)
        }, 1000)
    }

    const changeImage = (newIndex) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentImageIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 500); // Match this with the CSS transition duration
    }
    

    const nextImage = () => {
        changeImage((currentImageIndex + 1) % images.length)
    }

    const prevImage = () => {
        changeImage((currentImageIndex - 1 + images.length) % images.length)
    }

    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden">
            <div className="relative aspect-video">
                {images.map((src, index) => (
                    <img
                        key={src}
                        alt={`Product image ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
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
                            className={`h-2 w-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <CardContent className="p-4">
                <h2 className="text-2xl font-bold mb-2">Product Name</h2>
                <p className="text-muted-foreground">
                    This is a brief description of the product. It showcases the key features and benefits that make this item special.
                </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
                {!isClaimed ? (
                    <Button onClick={handleClaim}>Claim</Button>
                ) : (
                    <span className="text-sm font-medium text-muted-foreground">Claimed</span>
                )}
                <span className="text-sm font-medium flex items-center">
                    {isClaimed ? (
                        <>
                            <Check className="mr-1 h-4 w-4 text-green-600" />
                            <span className="text-green-600">Claimed</span>
                        </>
                    ) : (
                        "Unclaimed"
                    )}
                </span>
            </CardFooter>
        </Card>
    )
}