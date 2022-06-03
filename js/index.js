
//Those are some functions for validation 
const emthyError = error => {
    document.getElementById('emthy-error').innerText = error;
}

const error = errorMsg => {
    document.getElementById('error').innerText = errorMsg;
   
}
const spinner = spinnerstyle => {
    document.getElementById('spinner').style.display = spinnerstyle;
}


const container = document.getElementById('container')
const containerDetails = document.getElementById('container-details');


//Data loading function.
const loadPhone = async () => {
    spinner('block')
    const input = document.getElementById('input');
    const inputValue = (input.value).toLowerCase();
    

    if(parseInt(inputValue) >= 0 || inputValue == '' || parseInt(inputValue) <= 0){
        error('Please enter a phone name')
        input.value = ''
        container.innerHTML = ''
        spinner('')
        document.getElementById('see-more').style.display = "none";
    }
    else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    const response = await fetch(url);
    const data = await response.json();
   

    let sliced = data.data.slice(0, 20)
    displayData(sliced);
  
    }

   
  
}




// Data displaying function
const displayData = phones => {
   
    if(!phones.length){
        emthyError('please enter a valid name')
        spinner('')
        
      }
      else{
         emthyError('');
        
      }

    container.innerHTML = '';
    error('')
    phones?.forEach(phone => {

      
        
        // console.log(phone);

        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('col-md-6');
        div.classList.add('my-4');
                
      
        div.innerHTML = `
        <div class="card border-0 custom-style" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body text-center">
            <h4 class="text-center">${phone.phone_name}</h4>
            <p class="card-text fw-bold text-success bg-opacity-25">${phone.brand}</p>
            <button class="btn-success p-2 border-0 rounded" onclick="getDetails('${phone.slug}')">See Details</button>
            </div>
        </div>
        `;
       
        
        container.appendChild(div);
        error('');
        spinner('none')
        
    })
    document.getElementById('see-more').style.display = "block";
   
}

 

//Details data loading functions
const getDetails = id => {
  
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDitails(data.data))
}


//Displaying details data.
const displayDitails = feature => {
    // console.log(feature);
    containerDetails.innerHTML = '';

    const div = document.createElement('div');
    container.innerHTML = '';

  
   //funtion for get sensorrs array elements.
   function sensorsItem(){
        const sensors =  feature.mainFeatures.sensors.map(item => item)
        return sensors;
   }
   
  
    console.log(feature);
    div.innerHTML = `
    <div class="card mb-3 m-auto shadow" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 my-auto">
      <img src="${feature.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title">${feature.name}</h6>
        <p class="card-text "><span class="fw-bold">Display size:</span> ${feature.mainFeatures.displaySize}</p>
        
        <p class="card-text"><span class="fw-bold">chipset:</span> ${feature.mainFeatures.chipSet? feature.mainFeatures.chipSet: "It's doesn't have chipset"}</span></p>

        <p class="card-text"><span class="fw-bold">Memory: </span>${feature.mainFeatures.memory? feature.mainFeatures.memory: "It's doesn't have memory"}</p>

        <p class="card-text"><small class="text-muted"><span class="fw-bold">Realese: </span>${feature.releaseDate? feature.releaseDate:"No release date found"}</small></p>

        <p><span class="fw-bold">Sensors: </span>${sensorsItem()}</p>
         
      
        <ul>
        <ol><img src="images/bluetooth.svg" width=20px">: ${feature.others.Bluetooth}</ol>
        <ol><img src="images/map-pin.svg" width=20px">: ${feature.others.GPS}</ol>
        <ol><img src="images/nfc.svg" width=20px">: ${feature.others.NFC}</ol>
        <ol><img src="images/radio.svg" width=20px">: ${feature.others.Radio}</ol>
        <ol><img src="images/USB.svg" width=20px">: ${feature.others.USB}</ol>
        <ol><img src="images/wifi.svg" width=20px">:${feature.others.WLAN}</ol>
        </ul>

      </div>
    </div>
  </div>
</div>
`;
containerDetails.appendChild(div)
}



//Function for display more data
const showAll = () => {
 
  spinner('block')
  const input = document.getElementById('input');
  const inputValue = input.value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => displayData(data.data))
  input.value = '';
 
}

