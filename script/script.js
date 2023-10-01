const pMarksJSON = localStorage.getItem("pMarks"); // Get primary bookmarks from local storage in JSON format
let pMarks = pMarksJSON ? JSON.parse(pMarksJSON) : []; // If not empty parse it

const sMarksJSON = localStorage.getItem("sMarks"); // Get secondary bookmarks from local storage in JSON format
let sMarks = sMarksJSON ? JSON.parse(sMarksJSON) : []; // If not empty parse it

// Function to update primary bookmarks
function updatePrimary() {
    if (pMarks.length == 0) {
        primaryMarks.innerHTML = "No stored links!";
    } else {
        primaryMarks.innerHTML = "";
        for (let i = 0; i < pMarks.length; i++) {
            primaryMarks.innerHTML += `<a href="${pMarks[i].pURL}" target="_blank" class="marks">${pMarks[i].pTitle}</a> <button class="btn" onclick="deletePrimary(${i});">Delete</button> <br>`;
        }
    }
}

// Function to update secondary bookmarks
function updateSecondary() {
    if (sMarks.length == 0) {
        secondaryMarks.innerHTML = "No stored links!";
    } else {
        secondaryMarks.innerHTML = "";
        for (let i = 0; i < sMarks.length; i++) {
            secondaryMarks.innerHTML += `<a href="${sMarks[i].sURL}" target="_blank" class="marks">${sMarks[i].sTitle}</a> <button class="btn" onclick="deleteSecondary(${i});">Delete</button> <br>`;
        }
    }
}

updatePrimary(); // Everytime autoupdate primary bookmarks
updateSecondary(); // Everytime autoupdate secondary bookmarks

// Add new primary bookmark
pBtn.addEventListener("click", () => {
    const title = prompt("Enter title : ");
    if (!title) {
        alert("Cannot store empty title!");
        return;
    }
    const url = prompt("Enter URL : ");
    if (!url) {
        alert("Cannot store empty URL!");
        return;
    }
    let newLink = {
        pTitle: title,
        pURL: url
    };
    pMarks.push(newLink); // Push new link to the array
    localStorage.setItem("pMarks", JSON.stringify(pMarks)); // Convert array into JSON for local storage
    updatePrimary(); // Update primary bookmarks after new link added
});

// Add new secondary bookmark
sBtn.addEventListener("click", () => {
    const title = prompt("Enter title : ");
    if (!title) {
        alert("Cannot store empty title!");
        return;
    }
    const url = prompt("Enter URL : ");
    if (!url) {
        alert("Cannot store empty URL!");
        return;
    }
    let newLink = {
        sTitle: title,
        sURL: url
    };
    sMarks.push(newLink); // Push new link to the array
    localStorage.setItem("sMarks", JSON.stringify(sMarks)); // Convert array into JSON for local storage
    updateSecondary(); // Update secondary bookmarks after new link added
});

cpBtn.addEventListener("click", () => {
    if (localStorage.getItem("pMarks") == undefined) {
        alert("Primary bookmarks list is already empty!");
        return;
    }
    if (confirm("Do you really want to clear all primary bookmarks?")) {
        pMarks = []; // Reset the array
        localStorage.removeItem("pMarks"); // Remove all pMarks
        updatePrimary(); // Update primary bookmarks
    }
});

csBtn.addEventListener("click", () => {
    if (localStorage.getItem("sMarks") == undefined) {
        alert("Secondary bookmarks list is already empty!");
        return;
    }
    if (confirm("Do you really want to clear all secondary bookmarks?")) {
        sMarks = []; // Reset the array
        localStorage.removeItem("sMarks"); // Remove all sMarks
        updateSecondary(); // Update secondary bookmarks
    }
});

// Function to delete particular link from primary bookmarks
function deletePrimary(index) {
    pMarks.splice(index, 1); // Deleting patricular link from the array
    localStorage.setItem("pMarks", JSON.stringify(pMarks)); // Updatinf the modified array in local storage
    updatePrimary(); // Update primary bookmarks
}

// Function to delete particular link from secondary bookmarks
function deleteSecondary(index) {
    sMarks.splice(index, 1); // Deleting particular link from the array
    localStorage.setItem("sMarks", JSON.stringify(sMarks)); // Updating the modified array in local storage
    updateSecondary(); // Update secondary bookmarks
}