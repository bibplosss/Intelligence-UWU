const GA_MEASUREMENT_ID = "G-CQZQXBJW80";
function initializeScrollReveal() {
  const sections = document.querySelectorAll('main section');
  if (!sections.length) return;

  sections.forEach((section) => section.classList.add('scroll-reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observerRef.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      sections.forEach((section) => {
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          section.classList.add('visible');
        }
      });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);
  }
}

document.addEventListener('DOMContentLoaded', initializeScrollReveal);

function initializeCookieBanner() {

    const banner = document.getElementById("cookie-banner");

    const acceptBtn =
        document.getElementById("accept-cookies");

    const rejectBtn =
        document.getElementById("reject-cookies");

    if (!banner) return;

    const consent =
        localStorage.getItem("cookieConsent");

    if (consent === "accepted") {

        loadGoogleAnalytics();

        banner.style.display = "none";

        return;
    }

    if (consent === "rejected") {

        banner.style.display = "none";

        return;
    }

    acceptBtn.addEventListener("click", () => {

        localStorage.setItem(
            "cookieConsent",
            "accepted"
        );

        loadGoogleAnalytics();

        banner.style.display = "none";

    });

    rejectBtn.addEventListener("click", () => {

        localStorage.setItem(
            "cookieConsent",
            "rejected"
        );

        banner.style.display = "none";

    });

} 
function initializePage() {

    initializeScrollReveal();

    initializeCookieBanner();

}

document.addEventListener(
    "DOMContentLoaded",
    initializePage
);

function loadGoogleAnalytics() {

    if (window.gaLoaded) return;

    window.gaLoaded = true;

    const script = document.createElement("script");

    script.async = true;

    script.src =
        `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    window.gtag = gtag;

    gtag("js", new Date());

    gtag("config", GA_MEASUREMENT_ID);

}
const resetButton =
document.getElementById("reset-cookies");

if(resetButton){

    resetButton.addEventListener("click",()=>{

        localStorage.removeItem(
            "cookieConsent"
        );

        location.reload();

    });

}
