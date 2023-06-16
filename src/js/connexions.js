export const URL_FCAD_BANNER = (count = 3) => {
  return `https://www.fcad.uner.edu.ar/wp-json/wp/v2/posts?per_page=${count}`;
};

export const URL_FCAD_PORTAL = (expludeIds = [], count = 3) => {
  return `https://www.fcad.uner.edu.ar/wp-json/wp/v2/posts?per_page=${count}&exclude=${expludeIds}`;
};

export const URL_FCAD_IMAGES = (includeIds = []) => {
  return `https://www.fcad.uner.edu.ar/wp-json/wp/v2/media?include=${includeIds}`;
};

export const URL_FCAD_SINGLE = (postId) => {
  return `https://www.fcad.uner.edu.ar/wp-json/wp/v2/posts/${postId}`;
};
