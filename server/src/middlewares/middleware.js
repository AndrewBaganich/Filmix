import {
  MAX_SIZE_POSTER,
  MAX_SIZE_MOVIE,
  ALLOWED_MOVIE_TYPES,
  ALLOWED_POSTER_TYPES,
  ALLOWED_AVATAR_TYPES,
  MAX_SIZE_AVATAR,
} from "../config/uploadConfig.js";

export function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
}

export function logger(req, res, next) {
  console.log(`Was req to ${req.path}. Request time: ${req.requestTime}`);
  next();
}

function validateFile(file, allowedTypes, maxSize, fieldName, friendlyMaxSize) {
  const errors = [];

  if (!file) {
    errors.push(`${fieldName} is required`);
    return errors;
  }

  if (!allowedTypes.includes(file.mimetype)) {
    errors.push(`${fieldName} has invalid format`);
  }

  if (file.size > maxSize) {
    errors.push(`${fieldName} is too large (max ${friendlyMaxSize})`);
  }

  return errors;
}

function validateBody(body) {
  const errors = [];
  const movieName = body.name ?? body.title;

  if (!movieName || !String(movieName).trim()) {
    errors.push("Name is required");
  }

  if (!body.year || Number.isNaN(Number(body.year))) {
    errors.push("Year must be a number");
  }

  if (!body.type) {
    errors.push("Type is required");
  }

  return errors;
}

export function validateMovieCreate(req, res, next) {
  let errors = [];

  const poster = req.files?.posterFile?.[0];
  const movie = req.files?.movieFile?.[0];

  errors = errors.concat(validateBody(req.body));
  errors = errors.concat(
    validateFile(poster, ALLOWED_POSTER_TYPES, MAX_SIZE_POSTER, "Poster", "15 MB"),
    validateFile(movie, ALLOWED_MOVIE_TYPES, MAX_SIZE_MOVIE, "Movie", "3 GB")
  );

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  next();
}

export function validateAvatarActor(req, res, next) {
  let errors = [];
  const avatar = req.file;

  if (!req.body.name) {
    errors.push("Name is required");
  }

  errors = errors.concat(
    validateFile(avatar, ALLOWED_AVATAR_TYPES, MAX_SIZE_AVATAR, "Avatar", "15 MB")
  );

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  next();
}

export function validateMovieUpdate(req, res, next) {
  let errors = [];

  const poster = req.files?.posterFile?.[0];
  const movie = req.files?.movieFile?.[0];
  const movieName = req.body.name ?? req.body.title;

  if (movieName !== undefined && !String(movieName).trim()) {
    errors.push("Name is required");
  }

  if (req.body.year !== undefined && Number.isNaN(Number(req.body.year))) {
    errors.push("Year must be a number");
  }

  if (poster) {
    errors = errors.concat(
      validateFile(poster, ALLOWED_POSTER_TYPES, MAX_SIZE_POSTER, "Poster", "15 MB")
    );
  }

  if (movie) {
    errors = errors.concat(
      validateFile(movie, ALLOWED_MOVIE_TYPES, MAX_SIZE_MOVIE, "Movie", "3 GB")
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  next();
}
