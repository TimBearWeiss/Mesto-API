const mongoose = require("mongoose");

export const isAvatarLinkValid = (value: string) => {
  const LINK_REGEX =
    /https?:\/\/(www)?[-0-9a-z.]+(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+)?#?$/i;
  return LINK_REGEX.test(value);
};

export const isPictureLinkValid = (value: string) => {
  const LINK_REGEX = /^https?:\/\/.*\.(png|jpe?g|gif|bmp)$/i;
  return LINK_REGEX.test(value);
};

export const validateObjectId = (value: string) => {
  const isValid = mongoose.isValidObjectId(value);

  if (isValid) {
    return value;
  } else {
    return "ID is not valid";
  }
};
