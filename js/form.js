export function initForm(dialog) {
  const form = dialog.querySelector("form"),
    result = dialog.querySelector(".order-result"),
    phone = form.elements.phone;
  const fields = ["name", "phone", "email", "payment"].map(
    (name) => form.elements[name],
  );
  const validate = (field) => {
    let message = "";
    if (!field.value.trim()) message = "Пожалуйста, заполните поле";
    else if (field.name === "email" && field.validity.typeMismatch)
      message = "Введите корректный e-mail";
    else if (
      field.name === "phone" &&
      !/^7\d{10}$/.test(field.value.replace(/\D/g, ""))
    )
      message = "Введите полный российский номер телефона";
    field.setAttribute("aria-invalid", String(Boolean(message)));
    dialog.querySelector("#" + field.name + "-error").textContent = message;
    return !message;
  };
  phone.addEventListener("input", () => {
    let digits = phone.value.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (digits.length === 10 && digits.startsWith("9")) digits = "7" + digits;
    phone.value = digits ? "+" + digits.slice(0, 11) : "";
  });
  fields.forEach((field) =>
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate(field);
    }),
  );
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    form.hidden = true;
    result.hidden = false;
    result.tabIndex = -1;
    result.focus();
  });
  return () => {
    form.reset();
    form.hidden = false;
    result.hidden = true;
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      dialog.querySelector("#" + field.name + "-error").textContent = "";
    });
  };
}
