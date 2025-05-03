const eyeIcons = document.querySelectorAll(".see-password");

function toggleEyeIcon() {
  const icon = this.querySelector("i");
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
  const input = this.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
}

eyeIcons.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", toggleEyeIcon);
});
