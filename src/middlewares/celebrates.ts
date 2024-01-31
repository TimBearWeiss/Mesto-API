import { validateObjectId } from "utils/validator";
const { celebrate, Joi } = require("celebrate");
const isAvatarLinkValid = require("../utils/validator");
const isPictureLinkValid = require("../utils/validator");

export const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const createUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(isAvatarLinkValid),
  }),
});

export const getCurrentUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(validateObjectId),
  }),
});

export const updateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

export const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(isAvatarLinkValid),
  }),
});

////

export const createCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(isPictureLinkValid),
  }),
});

export const validIdCard = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(validateObjectId),
  }),
});
