import { initForm } from "./form.js";
export function initOrder() {
  const dialog = document.querySelector(".order-dialog"),
    reset = initForm(dialog);
  let opener;
  dialog
    .querySelector(".modal__close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    const b = dialog.getBoundingClientRect();
    if (
      e.target === dialog &&
      (e.clientX < b.left ||
        e.clientX > b.right ||
        e.clientY < b.top ||
        e.clientY > b.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    reset();
    opener?.focus();
  });
  return (product, button) => {
    opener = button;
    reset();
    for (const [destination, source] of [
      [".modal__name-title", ".product__title"],
      [".modal__name-price", ".product__price-value"],
      [".modal__text", ".product__size.is-active"],
    ])
      dialog.querySelector(destination).textContent =
        product.querySelector(source).textContent;
    const image = product.querySelector("img");
    dialog.querySelector("img").src = image.src;
    dialog.querySelector("img").alt = image.alt;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  };
}
