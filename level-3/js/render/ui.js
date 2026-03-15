const toast = document.querySelector("#toast");

export function showMessage(type, text) {
  if (toast.classList.contains("show")) return;

  switch (type) {
    case "error":
      toast.classList.add("show");
      toast.textContent = `[Error] ${text}`;
      setTimeout(function () {
        toast.classList.remove("show");
      }, 3000);
      break;
    case "success":
      toast.classList.add("show");
      toast.textContent = `[Success] ${text}`;
      setTimeout(function () {
        toast.classList.remove("show");
      }, 3000);
      break;
  }
}
