
const api = `./result.json`;
const dataOutput = [];

fetch(api)
.then((res) => res.json())
.then((data) => {
    data.forEach(name => {
        dataOutput.push(name)
    })
});

const searchInput = document.querySelector('.input');
const searchOptions = document.querySelector('.options');
const clickButton = document.querySelector('.button');

function getOptions(word, dataOutput) {
    return dataOutput.filter(s => {
        const regex = new RegExp(word, 'gi');
        return s.name.match(regex);
    })
} 

function displayOptions() {
    console.log("options");
    const options = getOptions(searchInput.value, dataOutput);
    const html = options
        .map(dataOutput => {
            return `
            <div class="resultSearch">
                <div class="resultSearchLeft">
                    <div class="resultSearchLeftPic">
                        <img class="resultSearchLeftPicImg" src=${dataOutput.img}>
                    </div>
                    <div class="resultSearchLeftText">
                        <li><span>${dataOutput.name}</span></li>
                        <h2>${dataOutput.manufacturer} | Crew: ${dataOutput.crew}</h2> 
                    </div>
                </div>   
                <div class="resultSearchRightLogo">
                    <img class="resultSearchRightLogoImg" src=${dataOutput.logo}>
                </div>
            </div> 
            `;
        })
        .join('');
    searchOptions.innerHTML = searchInput.value ? html : null;
}

function displayButton() {
    console.log("button");
    const options = getOptions(searchInput.value, dataOutput);
    const html = options
        .map(dataOutput => {
            return `
            <div class="resultSearch">
                <div class="resultSearchLeft">
                    <div class="resultSearchLeftPic">
                        <img class="resultSearchLeftPicImg" src=${dataOutput.img}>
                    </div>
                    <div class="resultSearchLeftText">
                        <li class="liButEnt"><span>${dataOutput.name}</span></li>
                        <h2 class=""h2ButEnt>${dataOutput.manufacturer} | Crew: ${dataOutput.crew}</h2> 
                    </div>
                </div>   
                <div class="resultSearchRightLogo">
                    <img class="resultSearchRightLogoImg" src=${dataOutput.logo}>
                </div>
            </div> 
            `;
        })
        .join('');
    searchOptions.innerHTML = searchInput.value ? html : null;
}

//searchInput.addEventListener('change', displayOptions);
//searchInput.addEventListener('change', displayOptions);
clickButton.addEventListener('click', displayButton);

searchInput.addEventListener('keydown', function (e) {
   let key = e.which || e.keyCode;
   if (key === 13) { 
        displayButton();
        searchInput.blur();
    }
    else {
        displayOptions();
    }
});

 
