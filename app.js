//https://goqr.me/api/

const wrapper = document.querySelector(".wrapper")
qrInput = wrapper.querySelector(".form input")
generateBtn = wrapper.querySelector(".form button")
resetBtn = document.querySelector(".btn-reset")
qrImg = wrapper.querySelector(".qr-code img")

let qrValue;
generateBtn.addEventListener("click", () => {
    qrValue = qrInput.value;
    if (!qrValue) return;
    console.log(qrValue);
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`

    //
    generateBtn.innerText = "we are genereting QR Code..."

    //once Qr code img loaded
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code..."
        console.log("reset", qrValue);
        qrValue = ""
    })

})

resetBtn.addEventListener("click", () => {
    generateBtn.innerText = "Generate QR code!!"
    wrapper.classList.remove("active");

})