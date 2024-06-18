const calculateDistance = (targetDate) => {
  const now = new Date().getTime();
  return targetDate - now;
};

const startCountdown = () => {
  const targetDate = new Date("July 1, 2024 23:59:59").getTime();

  const distance = calculateDistance(targetDate);
  if (distance < 0) {
    return document.getElementById("promo").remove();
  }

  const $days = document.getElementById("days");
  const $hours = document.getElementById("hours");
  const $minutes = document.getElementById("minutes");
  const $seconds = document.getElementById("seconds");

  let interval = setInterval(() => {
    const distance = calculateDistance(targetDate);
    if (distance < 0) {
      clearInterval(interval);
      return document.getElementById("promo").remove();
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $days.textContent = pad(days);
    $hours.textContent = pad(hours);
    $minutes.textContent = pad(minutes);
    $seconds.textContent = pad(seconds);
  }, 1000);
};

const pad = (num) => {
  return num < 10 ? "0" + num : num;
};

const $promo = document.getElementById("promo");

document.addEventListener("DOMContentLoaded", () => {
  if ($promo) {
    startCountdown();
  }
});

const $miSolicitudFiltrosForm = document.getElementById("miSolicitudFiltros");

const validateDNI = () => {
  const formData = new FormData($miSolicitudFiltrosForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  if (data.DNI.length > 8 || data.DNI.length < 7) {
    alert("El DNI ingresado no es válido.");
  }
};

if($miSolicitudFiltrosForm){
  $miSolicitudFiltrosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateDNI();
  });
}