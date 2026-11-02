document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".lazy-image");
    const manualLoadBtn = document.getElementById("manual-load-btn");

    const loadImage = (image) => {
        const dataSrc = image.getAttribute("data-src");
        if (!dataSrc) return;

        image.src = dataSrc;

        image.onload = () => {
            image.classList.add("loaded");
        };

        image.removeAttribute("data-src");
    };

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px 50px 0px",
            threshold: 0.01
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observerInstance.unobserve(img);
                }
            });
        }, observerOptions);

        images.forEach((img) => {
            observer.observe(img);
        });

    } else {
        images.forEach((img) => {
            loadImage(img);
        });
    }

    if (manualLoadBtn) {
        manualLoadBtn.addEventListener("click", () => {
            images.forEach((img) => {
                if (img.getAttribute("data-src")) {
                    loadImage(img);
                }
            });
        });
    }
});