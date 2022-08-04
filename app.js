//https://goqr.me/api/

const wrapper = document.querySelector(".wrapper");
qrInput = wrapper.querySelector(".form-input");
generateBtn = wrapper.querySelector(".btn-generate");
resetBtn = wrapper.querySelector(".btn-reset");
downloadBtn = wrapper.querySelector(".btn-download");
qrImg = wrapper.querySelector(".qr-code img");
form = wrapper.querySelector(".form");
formSpan = wrapper.querySelector(".from-span");



const isValidUrl = (url) => {
    const re =
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return re.test(String(url).toLowerCase());
};

let qrValue;

generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    qrValue = qrInput.value;

    console.log(isValidUrl(qrValue));
    console.log("gnerate btn", qrValue);

    if (!isValidUrl(qrValue)) {
        formSpan.innerText = "invalid url, check example in the placeholder";
    }

    if (!qrValue || !isValidUrl(qrValue)) return;
    //   console.log(qrValue);

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;

    //once Qr code img loaded
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generated";
    });
});

resetBtn.addEventListener("click", () => {
    console.log(qrValue);
    qrInput.value = "";
    wrapper.classList.remove("active");
    formSpan.innerText = "";
    generateBtn.innerText = "Generate QR Code";
});



function fetchFile(url) {
    //fetching file & returning as blob object
    fetch(url)
        .then((res) => res.blob())
        .then((file) => {
            let tempUrl = URL.createObjectURL(file);
            console.log("file", file);
            console.log("tempUrl", tempUrl);
            let linkTag = document.createElement("a");
            linkTag.href = tempUrl;
            linkTag.download = "qr code file";
            document.body.appendChild(linkTag);
            linkTag.click();
            linkTag.remove();
        });
}


// download file
downloadBtn.addEventListener("click", () => {
    qrValue = qrInput.value;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    fetchFile(qrImg.src);
    //   generateFile(qrImg);
});