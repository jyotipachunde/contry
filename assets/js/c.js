 const singlec=document.getElementById("single-country");

 const ss= JSON.parse(localStorage.getItem("Data") || "{}")
 console.log("ss:",ss);


const param=new URLSearchParams(window.location.search);
console.log("URL params:",param);
const code=param.get("code");
console.log("country code:",code);
const countryurl=`https://restcountries.com/v3.1/alpha/${code}`;
const make = async (apiURL) => {
    loader.classList.remove("d-none");
    try {
        
        let res = await fetch(apiURL);
        let data = await res.json();
        if (!res.ok) {
            let err = data.error || data.message || res.statusText
            throw new Error(err);
        }
        return data;
    }
    finally {
        loader.classList.add("d-none");
        //spinner.classList.add("d-none");
    }
}
async function fetchcountry() {
    try {
        let data = await make(countryurl);
        console.log(data);
        let c=data[0];
        singlec.innerHTML=`
        <div class="col-md-5 d-flex align-items-center justify-content-center">
            <img src="${c.flags.png}" class="img-fluid rounded" alt="${c.flags.alt}" title="Flag of ${c.name.common || c.name.official}">
        </div>

        <div class="col-md-7">
            <h3 class="mb-3">${c.name.common || c.name.official}</h3>

            <ul class="list-group">
                <li class="list-group-item"><strong>Official Name:</strong> ${c.name.official}</li>
                <li class="list-group-item"><strong>capital:</strong> ${c.capital}</li>
                <li class="list-group-item"><strong>Region:</strong> ${c.region}</li>
                <li class="list-group-item"><strong>Subregion:</strong> ${c.subregion}</li>
                <li class="list-group-item"><strong>Population:</strong> ${c.population}</li>
                <li class="list-group-item"><strong>Area:</strong> ${c.area} km²</li>
                <li class="list-group-item"><strong>currencies:</strong> 
                ${Object.values(c.currencies).map(cur=>
                    {
                        return cur.name +cur.symbol}).join(', ')}</li>
                <li class="list-group-item"><strong>languages:</strong> ${Object.values(c.languages||{}).join(', ')}</li>

                <li class="list-group-item"><strong>Country Code:</strong> ${c.cca2}</li>
                 <li class="list-group-item">
                    <strong>Google Maps:</strong>
                    <a href="${c.maps.googleMaps}" target="_blank">Open</a>
                </li>
                <li class="list-group-item">
                    <strong>Borders:</strong>
                     ${
                        c.borders ? c.borders.map(code => `<a href="country.html?code=${code}">   ${ss[code]}  </a>`).join(","): 
                        "No Borders"
                    }
                </li>

            </ul>
        </div>`;
        let p=new URLSearchParams(window.location.href=`country.html?code=${code=document.querySelectorAll('h5.card-title')[0].innertext}`)
console.log("params:",p);
  
    } catch (err) {
        console.log("Error:", err.message);
    }
}
fetchcountry();

 //codeMap = JSON.parse(localStorage.getItem("Data") || "{}");

    //console.log(codeMap);
    
   // `${codeMap[c]}`

