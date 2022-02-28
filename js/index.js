
const error = errorMsg => {
    document.getElementById('error').innerText = errorMsg;
}
const container = document.getElementById('container')
const containerDetails = document.getElementById('container-details');


const loadPhone = async () => {
    const input = document.getElementById('input');
    const inputValue = input.value;

    if(parseInt(inputValue) >= 0 || inputValue == '' || parseInt(inputValue) <= 0){
        error('Please enter a phone name')
        input.value = ''
    }
    else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.data)
    input.value = '';
    }
}

// Data displaying function
const displayData = phones => {

    container.innerHTML = '';
    phones.forEach(phone => {
        
        console.log(phone);

        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-md-6');
        div.classList.add('my-4');
                
        // div.classList.add('my-2')
        div.innerHTML = `
        <div class="card border-0 " style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
            <h3 class="text-center">${phone.phone_name}</h3>
            <p class="card-text fw-bold text-success bg-opacity-25">${phone.brand}</p>
            <button class="btn-success p-2 border-0 rounded" onclick="getDetails('${phone.slug}')">See Details</button>
            </div>
        </div>
        `
        container.appendChild(div);
    })
}


const getDetails = id => {
  
  const url = `https://openapi.programming-hero.com/api/phone/${id}`

  fetch(url)
  .then(res => res.json())
  .then(data => displayDitails(data.data))
}

const displayDitails = feature => {
    console.log(feature);
    const div = document.createElement('div');
    container.innerHTML = '';
    div.innerHTML = `
    <div class="card mb-3 m-auto shadow" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${feature.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${feature.name}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Realese: ${feature.releaseDate? feature.releaseDate:"No release date found"}</small></p>
      </div>
    </div>
  </div>
</div>
`;
containerDetails.appendChild(div)
}