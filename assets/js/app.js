const countryrow = document.getElementById('countryrow');
const loader = document.getElementById('loader');

function snackbar(title, text, icon) {
    swal.fire({
        title,
        text,
        icon,
        timer: 3000
    });
}
let base = 'https://restcountries.com/v3.1/all';
let countriesurl = `${base}/?fields=name,cca2,flags,region`;

const make = async (apiURL, method, body) => {

    // spinner.classList.remove("d-none");

    body = body ? JSON.stringify(body) : null;

    let configObj = {

        method: method,
        body: body,
        headers: {

            "content-type": "application/json"
        }
    }

    try {

        let res = await fetch(apiURL, configObj);

        let data = await res.json();

        if (!res.ok) {

            let err = data.error || data.message || res.statusText

            throw new Error(err);
        }

        return data;
    }
    finally {

        //spinner.classList.add("d-none");

    }
}


async function fetchcountries() {
    try {
        let data = await make(countriesurl, 'GET');
        console.log(data);

        data.map(c => {
            //console.log(c);
            const col1 = document.createElement('div');
            col1.className = `col-12 col-sm-6 col-md-4 col-lg-3 mb-3`;
            col1.innerHTML = `<div class="card h-100" role="button" 
            aria-label="country-card :Antigua and Barbuda" 
            data-code="${c.cca2}">
                    <img src="${c.flags.png}" 
                    class="card-img-top" 
                    alt="${c.flags.alt}" 
                    title="flag of ${c.flags.alt}"
                    loading="lazy">
                <div class="card-body">
                    <h5 class="card-title">
                    ${c.name.common || c.name.official}</h5>
                    <p class="card-text text-muted mb-0">${c.cca2}</p>
                
            </div>
            </div>`
           col1.addEventListener('click',()=>{
            window.location.href=`country.html?code=${c.cca2}`;
           })
           countryrow.append(col1);

        });
    } catch (err) {
        console.log(err);
        snackbar('Error', 'Failed to fetch countries', 'error');
        // alert(err.message || 'Something went wrong');
    }

}
fetchcountries();



