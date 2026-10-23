export function initMenu() {
  const button = document.querySelector(".header__burger"),
    menu = document.querySelector(".header__menu");
  const close = (open = false) => {
    button.classList.toggle("active", open);
    menu.classList.toggle("active", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    document.body.classList.toggle("menu-open", open);
  };
  button.addEventListener("click", () =>
    close(button.getAttribute("aria-expanded") !== "true"),
  );
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
      close();
      button.focus();
    }
  });
  matchMedia("(min-width: 851px)").addEventListener("change", (e) => {
    if (e.matches) close();
  });
}
