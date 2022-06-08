// @todo: check if any prev/next image
// space-between those

const images = document.querySelectorAll('.image-grid img');

const checkIfAnyPrevImage = (currentGridImage) => {
  const prevGridImage =
    currentGridImage.parentElement.parentElement.previousElementSibling
      ?.firstElementChild;
  return prevGridImage;
};

const createArrowLeftIcon = (div) => {
  const arrowLeftIcon = document.createElement('i');
  arrowLeftIcon.className = 'bi bi-chevron-left text-white';
  div.appendChild(arrowLeftIcon);
};

const checkIfAnyNextImage = (currentGridImage) => {
  const nextGridImage =
    currentGridImage.parentElement.parentElement.nextElementSibling
      ?.firstElementChild;
  return nextGridImage;
};

const createArrowRightIcon = (div) => {
  const arrowRightIcon = document.createElement('i');
  arrowRightIcon.className = 'bi bi-chevron-right text-white';
  div.appendChild(arrowRightIcon);
};

// View image in full size
const viewImageFullSize = (e) => {
  // add current image indicator
  const currentGridImage = e.target;
  currentGridImage.classList.add('current');

  const imgSrc = currentGridImage.src;

  const div = document.createElement('div');
  div.className = 'image-full p-2 p-lg-5';

  const closeIcon = document.createElement('i');
  closeIcon.className = 'bi bi-x text-white';

  div.appendChild(closeIcon);

  // const prevGridImage =
  //   currentGridImage.parentElement.parentElement.previousElementSibling
  //     ?.firstElementChild;
  const prevGridImage = checkIfAnyPrevImage(currentGridImage);
  if (prevGridImage) {
    createArrowLeftIcon(div);
  }

  const img = document.createElement('img');
  img.className = 'img-fluid';
  img.src = imgSrc;
  div.appendChild(img);

  // const nextGridImage =
  //   currentGridImage.parentElement.parentElement.nextElementSibling
  //     ?.firstElementChild;
  const nextGridImage = checkIfAnyNextImage(currentGridImage);
  if (nextGridImage) {
    // const arrowRightIcon = document.createElement('i');
    // arrowRightIcon.className = 'bi bi-chevron-right text-white';
    // div.appendChild(arrowRightIcon);
    createArrowRightIcon(div);
  }

  document.body.appendChild(div);
};

// Escape view in full size
const escapeViewImageFullSize = () => {
  // remove current image indicator
  const currentImage = document.querySelector('img.current');
  currentImage.classList.remove('current');

  document.querySelector('.image-full').remove();
};

// View next image
const viewNextImage = () => {
  const currentImage = document.querySelector('.image-full > img');

  const currentGridImage = document.querySelector('img.current');
  currentGridImage.classList.remove('current');

  const nextGridImage =
    currentGridImage.parentElement.parentElement.nextElementSibling
      .firstElementChild.firstElementChild;
  nextGridImage.classList.add('current');

  currentImage.src = nextGridImage.src;
};

// View previous image
const viewPrevImage = () => {
  const currentImage = document.querySelector('.image-full > img');

  const currentGridImage = document.querySelector('img.current');
  currentGridImage.classList.remove('current');

  const prevGridImage =
    currentGridImage.parentElement.parentElement.previousElementSibling
      .firstElementChild.firstElementChild;
  prevGridImage.classList.add('current');

  currentImage.src = prevGridImage.src;
};

// Listen for click image
images.forEach((img) => img.addEventListener('click', viewImageFullSize));

// Listen for click close button
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-x')) {
    escapeViewImageFullSize();
  }
});

// Listen for press escape
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    escapeViewImageFullSize();
  }
});

// Listen for click arrow icon
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-chevron-right')) {
    viewNextImage();
  } else if (e.target.classList.contains('bi-chevron-left')) {
    viewPrevImage();
  }
});

// Listen for press arrow key
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    viewNextImage();
  } else if (e.key === 'ArrowLeft') {
    viewPrevImage();
  }
});
