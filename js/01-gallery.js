// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
//  Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям.
// Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач
//  буде перенаправлений на іншу сторінку.
// Заборони цю поведінку за замовчуванням.
// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури
// було тільки доти, доки відкрите модальне вікно.
//  Бібліотекаи basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const imageMarkup = createGalleryCollection(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", imageMarkup);

function createGalleryCollection(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join(" ");
}
console.log(galleryItems);

galleryContainer.addEventListener("click", onImgClick);

let modalImg;

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  modalImg = basicLightbox.create(
    `
    <img src="${e.target.dataset.source}" width="800" height="600">
 `,
    {
      onShow: (modalImg) => {
        window.addEventListener("keydown", onCloseKeyEsc);
      },
      onClose: (modalImg) => {
        window.removeEventListener("keydown", onCloseKeyEsc);
      },
    }
  );

  modalImg.show();
}

function onCloseKeyEsc(e) {
  if (e.code === "Escape") {
    modalImg.close();
  }
}
