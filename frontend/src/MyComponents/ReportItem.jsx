"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { CalendarIcon, UploadIcon, MapPinIcon } from "lucide-react"

export default function LostFoundItemReport() {
  const [isLostItem, setIsLostItem] = useState(true)
  const [photoPreview, setPhotoPreview] = useState(null)
  const fileInputRef = useRef(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setValue("photo", file) // Set the file in react-hook-form
    }
  }

  const handleEditPhoto = () => {
    fileInputRef.current.click() // Trigger file input to allow selecting another photo
  }

  // Drag-and-drop event handlers
  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setValue("photo", file) // Set the file in react-hook-form
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault() // Prevent default to allow drop
  }

  const onSubmit = (data) => {
    const reportData = {
      type: isLostItem ? "lost" : "found", // Distinguish between lost and found
      username: data.username,
      description: data.description,
      photo: data.photo,
      location: isLostItem ? data.lastSeenLocation : data.receiveLocation, // Distinct location fields
      datetime: data.datetime,
    }
    console.log(reportData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className=" bg-blue-700  text-white rounded-t-lg">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            {isLostItem ? "Report a Lost Item" : "Report a Found Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <Label htmlFor="item-type" className="text-lg font-medium text-slate-700">Lost</Label>
              <Switch
                id="item-type"
                checked={!isLostItem}
                onCheckedChange={() => setIsLostItem(!isLostItem)}
                className="data-[state=checked]:bg-blue-700  border border-gray-300"
              />
              <Label htmlFor="item-type" className="text-lg font-medium text-slate-700">Found</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-lg font-medium text-slate-700">Photo of Item</Label>
              <div
                className="relative w-full h-64 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 overflow-hidden"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Uploaded item" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-10 h-10 mb-4 text-slate-500" />
                      <p className="mb-2 text-sm text-slate-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                  )}
                  <Input
                    id="photo"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={fileInputRef} // Direct reference for file input trigger
                  />
                </label>
                {errors.photo && <span className="text-red-500 absolute bottom-2 left-2">Photo is required</span>}
              </div>
              {photoPreview && (
                <Button
                  type="button"
                  onClick={handleEditPhoto}
                  className="mt-4 text-lg py-2 bg-slate-600 hover:bg-slate-500 transition-all duration-300"
                >
                  Edit Photo
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg font-medium text-slate-700">User Name</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                className="text-lg"
                {...register("username", { required: true })}
              />
              {errors.username && <span className="text-red-500">Name is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg font-medium text-slate-700">Description of the Item</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the item"
                className="text-lg min-h-[100px]"
                {...register("description", { required: true })}
              />
              {errors.description && <span className="text-red-500">Description is required</span>}
            </div>

            {/* Distinct location inputs for lost and found */}
            <div className="space-y-2">
              <Label htmlFor={isLostItem ? "lastSeenLocation" : "receiveLocation"} className="text-lg font-medium text-slate-700">
                {isLostItem ? "Last Seen Location" : "Item Receive Location"}
              </Label>
              <div className="relative">
                <Input
                  id={isLostItem ? "lastSeenLocation" : "receiveLocation"}
                  placeholder={isLostItem ? "Where did you last see the item?" : "Where did you find/receive the item?"}
                  className="text-lg pl-10"
                  {...register(isLostItem ? "lastSeenLocation" : "receiveLocation", { required: true })}
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              {isLostItem ? errors.lastSeenLocation && <span className="text-red-500">Last seen location is required</span> :
                errors.receiveLocation && <span className="text-red-500">Receive location is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime" className="text-lg font-medium text-slate-700">Date and Time</Label>
              <div className="relative">
                <Input
                  id="datetime"
                  type="datetime-local"
                  className="text-lg pl-10"
                  {...register("datetime", { required: true })}
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              {errors.datetime && <span className="text-red-500">Date and time are required</span>}
            </div>

            <CardFooter className="bg-slate-50 rounded-b-lg">
              <Button type="submit" className="w-full text-lg py-6 bg-blue-700 hover:bg-blue-800 transition-all duration-300">
                Submit Report
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
