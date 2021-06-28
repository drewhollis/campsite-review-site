const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("user.ref")
      .populate("campsites.ref")
      .then((favorites) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorites);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          req.body.forEach((favorite) => {
            if (!favorite.campsites.includes(favorite._id)) {
              favorite.campsites.push(favorite._id);
            }
          });
          favorite
            .save()
            .then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        } else {
          Favorite.create({ user: req.user._id }).then((favorite) => {
            if (!favoriteRouter.campsites.includes(fav._id)) {
              favorite.campsites.push(favorite._id);
            }
          });
          favorite.save();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete(favorite.user)
      .then((response) => {
        res.statusCode = 200;
        if (favorite) {
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.end("You do not have any favorites to delete");
        }
      })
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user.favorites })
      .then((favorite) => {
        if (!favorite) {
          favorite.campsites.push(favorite.url);
          Favorite.create({ favorite: req.favorite._id });
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.end("That campsite is already in the list of favorites");
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne(req.user._id)
      .then((response) => {
        res.statusCode = 200;
        if (favorite) {
          favorite.campsites.filter(campsiteId);
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.end("You do not have any favorites to delete");
        }
        favorite.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
