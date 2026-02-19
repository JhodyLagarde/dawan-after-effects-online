const scrollBox = document.getElementById("pricingScroll");
const btnLeft = document.getElementById("scrollLeft");
const btnRight = document.getElementById("scrollRight");

function isMobile() {
  return window.matchMedia("(max-width: 750px)").matches;
}

function updateArrows() {
  if (isMobile()) {
    btnLeft.classList.add("disabled");
    btnRight.classList.add("disabled");
    return;
  }

  const maxScroll = scrollBox.scrollWidth - scrollBox.clientWidth;

  btnLeft.classList.toggle("disabled", scrollBox.scrollLeft <= 0);
  btnRight.classList.toggle("disabled", scrollBox.scrollLeft >= maxScroll - 1);
}

const CARD_WIDTH = 376;
const GAP = 32;
const SCROLL_AMOUNT = CARD_WIDTH + GAP;

btnLeft.onclick = () => {
  if (isMobile()) return;
  scrollBox.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  setTimeout(updateArrows, 300);
};

btnRight.onclick = () => {
  if (isMobile()) return;
  scrollBox.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  setTimeout(updateArrows, 300);
};

let snapTimeout;

scrollBox.addEventListener("scroll", () => {
  if (isMobile()) return;

  clearTimeout(snapTimeout);

  snapTimeout = setTimeout(() => {
    const scrollLeft = scrollBox.scrollLeft;

    const index = Math.round(scrollLeft / SCROLL_AMOUNT);

    const target = index * SCROLL_AMOUNT;

    scrollBox.scrollTo({ left: target, behavior: "smooth" });

    updateArrows();
  }, 120);
});

const mobileQuery = window.matchMedia("(max-width: 750px)");
mobileQuery.addEventListener("change", updateArrows);

updateArrows();
window.addEventListener("resize", updateArrows);

const toggler = document.querySelector(".navbar-toggler");
const icon = toggler.querySelector(".material-icons-round");
const offcanvas = document.getElementById("menuTop");

offcanvas.addEventListener("show.bs.offcanvas", () => {
  icon.textContent = "close";
});

offcanvas.addEventListener("hide.bs.offcanvas", () => {
  icon.textContent = "menu";
});
