function startRotation(elem, interval) {
    function showImage() {
        images.forEach((image) => (image.style.display = "none"));
        images[idx].style.display = "block";
    }
    function rotate() {
        idx = idx === images.length - 1 ? 0 : idx + 1;
        showImage(idx);
    }
    const images = elem.querySelectorAll("img");
    let idx = 0;
    showImage();
    setInterval(rotate, interval);
}

function initCarousels(interval) {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carousel) => {
        carousel.style.height = "400px";
        startRotation(carousel, interval);
    });
}

initCarousels(1500);
