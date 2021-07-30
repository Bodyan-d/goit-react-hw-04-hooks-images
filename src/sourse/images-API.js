let page = 1;
const USER_KEY = '21922241-ac53faccd58a6508b64890669';

export default function fetchImages(imageName) {
  return fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=${USER_KEY}&image_type=photo&orientation=horizontal&per_page=12
`).then(res => {
    if (res.ok) {
      incrementPage();
      return res.json();
    }

    return Promise.reject(new Error(`Нету картинок по запросу: ${imageName}`));
  });
}

function incrementPage() {
  page += 1;
}

export function resetPage() {
  page = 1;
}
