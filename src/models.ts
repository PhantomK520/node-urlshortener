import  mongoose, { Schema } from "mongoose";
import moment from "moment";
import { URLStore } from "./interface";

const urlStoreSchema = new Schema({
  originalURL: { type: String },
  shortenURL: { type: String },
  shortenCode: { type: String, index: true },
  createdAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a").toString(),
  },
  revokedAt: { type: String, required: false },
});

export const URLStoreModel = mongoose.model<URLStore>(
  "urlstores",
  urlStoreSchema
);
