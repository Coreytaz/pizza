export function initCatalog(openOrder) {
  const catalog = document.querySelector(".catalog"),
    filters = document.querySelectorAll("[data-catalog]");
  filters.forEach((filter) => {
    const button = filter.querySelector("button");
    button.setAttribute(
      "aria-pressed",
      String(filter.classList.contains("active")),
    );
    button.addEventListener("click", () => {
      filters.forEach((item) => {
        item.classList.toggle("active", item === filter);
        item
          .querySelector("button")
          .setAttribute("aria-pressed", String(item === filter));
      });
      catalog.querySelectorAll("[data-category]").forEach((item) => {
        item.hidden =
          filter.dataset.catalog !== "all" &&
          item.dataset.category !== filter.dataset.catalog;
      });
    });
  });
  catalog
    .querySelectorAll(".product__size")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("is-active")),
      ),
    );
  catalog.addEventListener("click", (e) => {
    const size = e.target.closest(".product__size");
    if (size) {
      const product = size.closest(".product");
      product.querySelectorAll(".product__size").forEach((button) => {
        button.classList.toggle("is-active", button === size);
        button.setAttribute("aria-pressed", String(button === size));
      });
      product.querySelector(".product__price-value").textContent =
        size.dataset.sizePrice;
    }
    const order = e.target.closest(".product__btn");
    if (order) openOrder(order.closest(".product"), order);
  });
}
