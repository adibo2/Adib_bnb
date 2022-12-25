import mongoose from "mongoose";

const HotelsSchema = new mongoose.Schema(
    {
      bedrooms: { type: Number, required: true },
      beds: { type: Number, required: true },
      host_name:{ type: String, required: true },
      host_location:{ type: String, required: false },
  
      // category: { type: String, required: true },
      name:{ type: String, required: true },
      description: { type: String, required: true },
      picture_url: { type: String, required: true },
      amenities: { type: String, required: true },
      latitude:{ type: String, required: true },
      longitude:{ type: String, required: true },
      host_thumbnail_url:{ type: String, required: true},
  
      price: { type: Number, required: true },
      property_type: { type: String, required: true },
      review_scores_rating:{ type: Number, required: true },
      // rating: { type: Number, required: true, default: 0 },
      // numReviews: { type: Number, required: true, default: 0 },
      // countInStock: { type: Number, required: true, default: 0 },
      // description: { type: String, required: true },
      // isFeatured: { type: Boolean, default: false },
      // banner: String,
    },
    {
      timestamps: true,
    },
  
  );
  const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelsSchema);
export default Hotel;