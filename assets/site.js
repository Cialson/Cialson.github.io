// Comportements partagés par index.html (anglais) et fr/index.html (français).

// Bascule du thème clair / sombre, choix mémorisé.
document.getElementById("theme-toggle").addEventListener("click", function () {
  var root = document.documentElement;
  var current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  var next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Visionneuse : un clic sur une image l'ouvre en grand ; bouton ✕, Échap ou clic n'importe où pour fermer.
// Sans support de <dialog>, le lien ouvre simplement l'image.
var lightbox = document.getElementById("lightbox");
if (lightbox && lightbox.showModal) {
  var big = lightbox.querySelector("img");
  document.querySelectorAll(".media a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var img = link.querySelector("img");
      big.src = link.href;
      big.alt = img ? img.alt : "";
      lightbox.showModal();
    });
  });
  lightbox.addEventListener("click", function () { lightbox.close(); });
  lightbox.addEventListener("close", function () { big.removeAttribute("src"); });
}

// Animations réduites demandées : pas de lecture automatique, contrôles affichés.
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[autoplay]").forEach(function (v) {
    v.removeAttribute("autoplay");
    v.pause();
    v.controls = true;
  });
}
