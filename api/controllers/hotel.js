

import express from 'express';
import Hotel from "../models/Hotel.js"

import path from "path"


import { errorHandler } from "../utils/error.js";

// create Hotel//
export const createhotel = async (req, res, next) => {
  try {
    const hotelListning = await Hotel.create(req.body);
    return res.status(201).json(hotelListning);
  } catch (error) {
    next(error);
  }
};
//delete Hotel//
export const deletehotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(errorHandler(404, "Hotel not found"));
  }

  //  if (req.user.id !== hotel.userRef) {
  //    return next(errorHandler(401, "you can delete your own Hotel"));
  //  }

  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted");
  } catch (error) {
    next(error);
  }
};
//update Hotel//
export const updatehotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(errorHandler(404, "Hotel not found"));
  }

  // if (req.user.id !== hotel.userRef) {
  //   return next(errorHandler(401, "you can update your own Hotel"));
  // }

  try {
    const updatedhotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedhotel);
  } catch (error) {
    next(error);
  }
};

//get Hotel//
export const gethotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return next(errorHandler(404, "Hotel not found"));
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//get all Hotels
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      isApproved: true,
      cheapestPrice: { $gt: min | 1, $lt: max || 100000 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

//search hotel

export const gethotelsSearch = async (req, res, next) => {
  try {

      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

  

     
      let availableWork = req.query.availableWork;
      if (availableWork === undefined || availableWork === "all") {
        availableWork = { $in: ["available", "not available"] };
      }


      let type = req.query.type;
      if (type === undefined || type === 'all'){
          type = {$in: ['3 Stars hotel', '4 Stars hotel', '5 Stars hotel']};
      }

      const searchTerm = req.query.searchTerm || '';

      const province = req.query.province || '';
      
      const city = req.query.city || '';

      const sort = req.query.sort || 'createdAt';

      const order = req.query.order || 'desc';


      const pkgs = await Hotel.find({
        name: {$regex: searchTerm, $options: 'i'},
        province: {$regex: province, $options: 'i'},
        city: {$regex: city, $options: 'i'},
       availableWork,
        type,
      
      })
      .sort({[sort]: order})
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(pkgs);
  } catch (error) {
    next(error);
  }
};
