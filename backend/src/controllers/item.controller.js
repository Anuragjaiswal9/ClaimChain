import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadItemsImageOnCloudinary } from "../utils/itemscloudinary.js";
import { Item } from "../models/item.model.js";

const uploadImages = async (imageLocalPaths) => {
  let images = [];
  try {
    for (const singleImageLocalPath of imageLocalPaths) {
      const uploadedImage = await uploadItemsImageOnCloudinary(singleImageLocalPath.path);
      images.push(uploadedImage.url);
    }
    return images;
  } catch (error) {
    throw new Error("failed to upload images");
  }
};

const uploadItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { description, location, time } = req.body;
  const imageLocalPaths =
    req?.files?.images?.length > 0 ? req.files.images : null;

  if ( !description || !location || !time) {
    throw new ApiError(400, "All feilds are required");
  }
  console.log(imageLocalPaths)
  let images = [];
  if (imageLocalPaths) {
    try {
      images = await uploadImages(imageLocalPaths);
    } catch (error) {
      throw new ApiError(500, "Failed to upload images");
    }
  }

  const item = await Item.create({
    owner: userId,
    description,
    location,
    time,
    images,
  });

  if (!item) {
    throw new ApiError(400, "item creation failed");
  }

  res
    .status(201)
    .json(new ApiResponse(201, item, "item created successfully"));
});

const editItemDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const description = req?.body?.description;
  const location = req?.body?.location;
  const time = req?.body?.time;

  const item = await Item.findOne({ owner: userId });

  if (!item) {
    throw new ApiError(404, "No such item exists");
  }

  let imagesLocalPaths =
    req?.files?.images?.length > 0 ? req?.files?.images : null;
  if (!description && !location && !time && !imagesLocalPaths) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Nothing to change"));
  }

  let images = [];
  if (imagesLocalPaths) {
    try {
      images = await uploadImages(imagesLocalPaths);
    } catch (error) {
      throw new ApiError(500, "Failed to update images");
    }
  }

  const updatedDetails = {};
  if (description) updatedDetails.description = description;
  if (location) updatedDetails.location = location;
  if (time) updatedDetails.time = time;
  if (images) updatedDetails.images = images;

  const updatedItemDetails = await Product.findByIdAndUpdate(
    item._id,
    {
      $set: updatedDetails,
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedItemDetails,
        "Item details updated successfully"
      )
    );
});

const deleteItem = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    
    if(!userId){
        throw new ApiError(404, "No such item exists")
    }
    
    const item = await Item.findOne({owner: userId})
    
    if(!item){
        throw new ApiError(404, "No such item exists")
    }

    const deletedItem = await Item.findByIdAndDelete(item._id)

    if(!deletedItem){
        throw new ApiError(500, "something went wrong while deleting the item");
    }

    res.status(410).json(new ApiResponse(410, {}, "Item deleted successfully"))
}) 

export { uploadItem, editItemDetails, deleteItem };
