document.addEventListener("DOMContentLoaded", function () {
    const text = "PlayHouse";
    let index = 0;
    let forward = true;
    const spanElement = document.querySelector(".text-primary");

    if (!spanElement) {
        console.error("Không tìm thấy phần tử .text-primary!");
        return;
    }

    function typeEffect() {
        if (forward) {
            if (index < text.length) {
                index++;
                spanElement.textContent = text.slice(0, index);
                setTimeout(typeEffect, 60);
            } else {
                forward = false;
                setTimeout(typeEffect, 500);
            }
        } else {
            if (index > 0) {
                index--;
                spanElement.textContent = text.slice(0, index);
                setTimeout(typeEffect, 90);
            } else {
                forward = true;
                setTimeout(typeEffect, 500);
            }
        }
    }

    typeEffect();
});
