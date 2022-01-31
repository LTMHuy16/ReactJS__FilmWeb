const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3',
  apiKey: 'b773ab99bbf6c11397140ad0f4988cf9',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig

/*
  Link: https://www.themoviedb.org/settings/api
  https://developers.themoviedb.org/3/getting-started/images
*/