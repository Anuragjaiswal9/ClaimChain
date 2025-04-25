"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, UploadIcon, MapPinIcon, XIcon } from "lucide-react"
import axios from "axios"

export default function ReportItem() {
  const [isLostItem, setIsLostItem] = useState(true)
  const [photoPreviews, setPhotoPreviews] = useState([])
  const [photoFiles, setPhotoFiles] = useState([])
  const fileInputRef = useRef(null)
  const navigate = useNavigate();
  const [images, SetImages] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm()

  const handlePhotoChange = (event) => {
    const files = event.target.files
    if (files) {
      const newPreviews = []
      const newFiles = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result)
          newFiles.push(file)
          if (newPreviews.length === files.length) {
            setPhotoPreviews((prev) => [...prev, ...newPreviews].slice(0, 3))
            setPhotoFiles((prev) => [...prev, ...newFiles].slice(0, 3))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleRemovePhoto = (index) => {
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index))
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files) {
      const newPreviews = []
      const newFiles = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newPreviews.push(reader.result)
          newFiles.push(file)
          if (newPreviews.length === files.length) {
            setPhotoPreviews((prev) => [...prev, ...newPreviews].slice(0, 3))
            setPhotoFiles((prev) => [...prev, ...newFiles].slice(0, 3))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const sendPhotosToBackend = async (data) => {
    const formData = new FormData()

    // Append photos to FormData
    photoFiles.forEach((file) => {
      formData.append('images', file) // 'images' should match the field expected by your backend
    })

    // Append other form data
    formData.append('description', data.description)
    formData.append('location', isLostItem ? data.lastSeenLocation : data.receiveLocation)
    formData.append('time', data.datetime)
    formData.append('isLostItem', isLostItem)

    try {
      // Send data to backend via POST request
      const response = await axios.post("http://localhost:8000/api/v1/items/item/upload", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      console.log(response.data)

      // Navigate to the home page after successful submission
      navigate('/Home')

    } catch (error) {
      console.error('Error uploading data:', error)
    }
  }

  const onSubmit = async (data) => {
    if (photoFiles.length < 3) {
      alert("Please upload at least 3 photos.")
      return
    }

    // Send the complete form data, including photos, to the backend
    await sendPhotosToBackend(data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="bg-blue-700 text-white rounded-t-lg">
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
                className="data-[state=checked]:bg-blue-700 border border-gray-300"
              />
              <Label htmlFor="item-type" className="text-lg font-medium text-slate-700">Found</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos" className="text-lg font-medium text-slate-700">Photos of Item (at least 3)</Label>
              <div
                className="relative w-full h-64 border-2 border-slate-300 border-dashed rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-300 overflow-hidden"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <label
                  htmlFor="photos"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                >
                  {photoPreviews.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 p-2 w-full h-full">
                      {photoPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img src={preview} alt={`Uploaded item ${index + 1}`} className="w-full h-full object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            aria-label={`Remove photo ${index + 1}`}
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
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
                    id="photos"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                  />
                </label>
              </div>
              {photoPreviews.length < 3 && <span className="text-red-500">Please upload at least 3 photos</span>}
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

            <div className="space-y-2">
              <Label htmlFor={isLostItem ? "lastSeenLocation" : "receiveLocation"} className="text-lg font-medium text-slate-700">
                {isLostItem ? "Last Seen Location" : "Item Receive Location"}
              </Label>
              <div className="relative">
                <Input
                  id={isLostItem ? "lastSeenLocation" : "receiveLocation"}
                  placeholder={`Enter ${isLostItem ? "last seen location" : "receive location"}`}
                  className="text-lg"
                  {...register(isLostItem ? "lastSeenLocation" : "receiveLocation", { required: true })}
                />
                <MapPinIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
              {(errors.lastSeenLocation || errors.receiveLocation) && <span className="text-red-500">Location is required</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="datetime" className="text-lg font-medium text-slate-700">Date & Time</Label>
              <div className="relative">
                <Input
                  id="datetime"
                  type="datetime-local"
                  className="text-lg"
                  {...register("datetime", { required: true })}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
              {errors.datetime && <span className="text-red-500">Date & Time is required</span>}
            </div>

            <Button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
