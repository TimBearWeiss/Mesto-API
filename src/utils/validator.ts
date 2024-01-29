const isLinkValid = (value: any) => {
  const LINK_REGEX =
    /https?:\/\/(www)?[-0-9a-z.]+(\/[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+)?#?$/i;
  return LINK_REGEX.test(value);
};
