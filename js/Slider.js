function sliderMaker(slider, images){
  // Get the slider container and slider track elements
  const sliderContainer = slider;
  const sliderTrack = slider.querySelector(".slider-track");
  const sliderBtnPrev = slider.querySelector(".slider-btn-prev");
  const sliderBtnNext = slider.querySelector(".slider-btn-next");
  //console.log("slider",slider);
  // Loop through the image URLs in the object and create img elements
  for (let image in images) {
    const img = document.createElement("img");
    img.setAttribute("src", images[image]);
    sliderTrack.appendChild(img);
  }

  // Set the width of the slider track based on the number of images
  const numImages = Object.keys(images).length;
  sliderTrack.style.width = `${numImages * 100}%`;

  // Initialize the slider with the first image
  let currentIndex = 0;
  const sliderImgs = sliderTrack.querySelectorAll("img");
  sliderImgs[currentIndex].classList.add("active");

  let maxIndex = sliderImgs.length - 1;
  function slideTo(index) {
    currentIndex = index;
    sliderTrack.style.transform = `translateX(-${(currentIndex * 100)/numImages}%)`;
  }

  sliderBtnPrev.addEventListener("click", () => {
    if (currentIndex > 0) {
      slideTo(currentIndex - 1);
    } else {
      slideTo(maxIndex);
    }
  });

  sliderBtnNext.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      slideTo(currentIndex + 1);
    } else {
      slideTo(0);
    }
  });

  slideTo(currentIndex);

  let elementsOnhover = [sliderContainer, sliderBtnPrev, sliderBtnNext];
  elementsOnhover.forEach(
    elm=>{elm.addEventListener("mouseenter", () => {   
      document.querySelectorAll(".slider-btn").forEach(btn=>{btn.style.border='solid';})
      sliderBtnPrev.style.backgroundColor="white";
      sliderBtnNext.style.backgroundColor="white";
    });
    elm.addEventListener("mouseleave", () => {   
      document.querySelectorAll(".slider-btn").forEach(btn=>{btn.style.border='solid';})
      sliderBtnPrev.style.backgroundColor="";
      sliderBtnNext.style.backgroundColor="";
    });
  });

  imgs= sliderContainer.querySelectorAll("div.slider-track>img");
  let rm=0;
  setTimeout(()=>{
    imgs.forEach(img=>{
      const aspectRatio = img.naturalWidth/img.naturalHeight;
      const newHeight = 300/aspectRatio;
      rm = (newHeight>rm) ? newHeight:rm;
      sliderContainer.style.width="300px";
      sliderContainer.style.height=`${rm}px`;
      if(aspectRatio<1){
        img.style.height=`${rm}px`;
      }
      img.style.width="300px";
      
    });      
  },900);
}
