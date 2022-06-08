// click directly on img:
/* 
  create container div
  create close btn, img
    how to get the src:
      get the src of clicked img (e.target.src)
      add '.current' indicator class
      pass that src to img to append
  check if any left/right img, create accordingly
  append close, leftArrow, rightArrow, img to container div
*/

// click on next Arrow
/*
  check if any left/right img
  check if left/right arrow currently, add/remove accordingly (toggle visibility)
  don't need to recreate close btn, img
    how to get the src:
      find the current img
      get the next img
      update the '.current' indicator class 
*/

// escape
// clear the container div, remove .current indicator class

const imgs = document.querySelectorAll('.image-grid img');

function viewImgFullSize(e) {
  // create container div
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'image-full p-2 p-lg-5';

  // create close icon
  const closeIcon = document.createElement('i');
  closeIcon.className = 'bi bi-x text-white';

  // create arrow left icon
  const arrowLeftIcon = document.createElement('i');
  arrowLeftIcon.className = 'bi bi-chevron-left text-white';

  // create arrow right icon
  const arrowRightIcon = document.createElement('i');
  arrowRightIcon.className = 'bi bi-chevron-right text-white';

  // create img
  const currentGridImg = e.target;
  currentGridImg.classList.add('current');
  const imgSrc = currentGridImg.src;

  const img = document.createElement('img');
  img.className = 'img-fluid';
  img.src = imgSrc;

  // append to container div
  imgWrapper.append(closeIcon);
  imgWrapper.append(arrowLeftIcon);
  imgWrapper.append(img);
  imgWrapper.append(arrowRightIcon);
  document.body.appendChild(imgWrapper);
}

function viewOtherImg(direction) {
  const imgFullSize = document.querySelector('.image-full > img');
  const currentGridImg = document.querySelector('img.current');
  currentGridImg.classList.remove('current');

  const domElementSibling =
    direction === 'right' ? 'nextElementSibling' : 'previousElementSibling';
  const otherImg =
    currentGridImg.parentElement.parentElement[domElementSibling]
      .firstElementChild.firstElementChild;

  otherImg.classList.add('current');
  imgFullSize.src = otherImg.src;
}

function escapeViewImgFullSize() {
  const currentGridImg = document.querySelector('img.current');
  currentGridImg.classList.remove('current');
  document.querySelector('.image-full').remove();
}

function handleLeftIcon() {
  const currentGridImg = document.querySelector('img.current');
  const arrowLeftIcon = document.querySelector('.bi-chevron-left');

  !hasLeftImg(currentGridImg)
    ? arrowLeftIcon.classList.add('hide')
    : arrowLeftIcon.classList.contains('hide') &&
      arrowLeftIcon.classList.remove('hide');
}

function hasLeftImg(currentGridImg) {
  return currentGridImg.parentElement.parentElement.previousElementSibling
    ?.firstElementChild;
}

function handleRightIcon() {
  const currentGridImg = document.querySelector('img.current');

  const arrowRightIcon = document.querySelector('.bi-chevron-right');

  !hasRightImg(currentGridImg)
    ? arrowRightIcon.classList.add('hide')
    : arrowRightIcon.classList.contains('hide') &&
      arrowRightIcon.classList.remove('hide');
}

function hasRightImg(currentGridImg) {
  return currentGridImg.parentElement.parentElement.nextElementSibling
    ?.firstElementChild;
}

// Listen for click on img
imgs.forEach((img) =>
  img.addEventListener('click', (e) => {
    viewImgFullSize(e);
    handleLeftIcon();
    handleRightIcon();
  })
);

// Listen for click close button
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-x')) {
    escapeViewImgFullSize();
  }
});

// Listen for pressing Esc
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    escapeViewImgFullSize();
  }
});

// Listen for click arrow icon
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('bi-chevron-right')) {
    if (!hasRightImg(document.querySelector('img.current'))) {
      return;
    }
    viewOtherImg('right');
    handleLeftIcon();
    handleRightIcon();
  } else if (e.target.classList.contains('bi-chevron-left')) {
    if (!hasLeftImg(document.querySelector('img.current'))) {
      return;
    }
    viewOtherImg('left');
    handleLeftIcon();
    handleRightIcon();
  }
});

// Listen for press arrow key
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    if (!hasRightImg(document.querySelector('img.current'))) {
      return;
    }
    viewOtherImg('right');
    handleLeftIcon();
    handleRightIcon();
  } else if (e.key === 'ArrowLeft') {
    if (!hasLeftImg(document.querySelector('img.current'))) {
      return;
    }
    viewOtherImg('left');
    handleLeftIcon();
    handleRightIcon();
  }
});
