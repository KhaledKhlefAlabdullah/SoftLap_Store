export default function viewMenu(menuState) {
    const nav_links = document.querySelector("#nave-bar-taps");
    if (!menuState) {
      nav_links.classList.add("hide");
    } else {
      nav_links.classList.remove("hide");
    }
  }