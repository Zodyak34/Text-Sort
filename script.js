document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("file_input");
    const sortBtn = document.getElementById("submit");
    const downloadBtn = document.getElementById("download");
    const result = document.getElementById("result");

    let file;
    let sortedText = "";
    // Store the file for later use
    uploadBtn.addEventListener("change", () => {
        file = uploadBtn.files[0];
    });
    //Access the contents of file and sort them alphabetically from a-z
    sortBtn.addEventListener("click", () => {
        if (!file) {
            alert("Please Choose a File First");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            const lines = text.split(/\r?\n/).sort((a, b) => a.localeCompare(b));

            sortedText = lines.join("\n");
            result.value = sortedText;
        };

        reader.readAsText(file);
    });
    //Convert the result into a Blob that can be downloaded
    downloadBtn.addEventListener("click", () => {
        if (!sortedText) {
            alert("Please Sort Text First");
            return;
        }
        //rename the uploaded file to -sorted.txt
        const originalName = uploadBtn.files[0].name || "file.txt";

        const baseName = originalName.replace(/(\.[^.]*)?$/, "");
        const downloadName = `${baseName}-sorted.txt`;

        const blob = new Blob([sortedText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        //create a download link and click it, remove the link and element after
        const a = document.createElement("a");
        a.href = url;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);

    });

});


