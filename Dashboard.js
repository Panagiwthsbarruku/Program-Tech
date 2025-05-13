const toggleBtn = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
toggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
});
const name = localStorage.getItem("operatorName");
if (name) {
  document.body.insertAdjacentHTML('afterbegin', `<p>Συνδεδεμένος ως: <strong>${name}</strong></p>`);
} else {
  document.body.insertAdjacentHTML('afterbegin', `<p style="color:red;">Δεν έγινε σωστή σύνδεση</p>`);
}
