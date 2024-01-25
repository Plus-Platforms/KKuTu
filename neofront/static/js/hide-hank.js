const URL = "/hank/";
let model, maxPredictions;

async function initCensorship() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    detectJtImages();
}

async function detectJtImages() {
    // Select all elements with the class "jt-image"
    const jtImages = document.querySelectorAll('.jt-image');

    // Loop through each jt-image element
    jtImages.forEach(async (imageElement) => {
        // Create an image element to load the image
        const image = new Image();
        image.src = imageElement.src;

        // Wait for the image to load
        await image.decode();

        // Run the image through the model for prediction
        const prediction = await model.predict(image);

        // Check if it's '행크' or '서곰' with high probability
        const isHighProbability = checkHighProbability(prediction, ['행크', '서곰']);

        // Apply blur if it's '행크' or '서곰'
        if (isHighProbability) {
            imageElement.classList.add("blurred");
            console.log("행크 및 서곰일 가능성 높은 이미지가 발견되었습니다.");
        }
        else{
            console.log("정상적인 이미지입니다.");
        }
    });
}

function checkHighProbability(prediction, classesToCheck) {
    // Add your logic here to check if the specified classes have high probability
    // Modify the logic according to your model and requirements
    const threshold = 0.8;
    for (let i = 0; i < prediction.length; i++) {
        if (classesToCheck.includes(prediction[i].className) && prediction[i].probability > threshold) {
            return true;
        }
    }
    return false;
}

initCensorship();