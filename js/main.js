const url="http://188.226.157.20/fb_crawler/get_json.php?all";
document.getElementById('map').style.display='none';
document.getElementById('place-information').style.display='none';

let uluru = {lat: 0, lng: 0}; 
function initMap() { 
    let map = new google.maps.Map(document.getElementById('map'), { 
      zoom: 12, 
      center: uluru 
    }); 
    let marker = new google.maps.Marker({ 
      position: uluru, 
      map: map 
    }); 
  }

  function clearInformation(){
    document.getElementById('no-place').textContent="";
    document.getElementById('place-name').textContent='';
    document.getElementById('place-country').textContent='';
    document.getElementById('place-city').textContent='';
    document.getElementById('place-street').textContent='';
    document.getElementById('place-category').textContent='';
  }

function giveInfoPlace(){
  document.getElementById('loader').style.border='none';  
  document.getElementById('map').style.display='block'; 
  document.getElementById('place-information').style.display='block'; 
  document.getElementById('place-search').style.display='block';
}

  function insertData(data){
    if(data){
      document.getElementById('place-name').textContent=`Name:${data.name}`;
      document.getElementById('place-country').textContent=`Country: ${data.location.country}`;
      document.getElementById('place-city').textContent=`City:${data.location.city}`;
      document.getElementById('place-street').textContent=`Address:${data.location.street}`;
      document.getElementById('place-category').textContent=`Category:${data.category}`;
      document.getElementById('place-facebook').setAttribute("href", data.link);
      uluru.lat=data.location.latitude;
      uluru.lng=data.location.longitude;
      initMap();
      giveInfoPlace(); 
    }
    else{
      document.getElementById('loader').style.border='none'; 
      document.getElementById('no-place').textContent="Place wasn't found";
      document.getElementById('place-information').style.display='none';
      document.getElementById('place-search').style.display='block';
    }
  }

  async function fetchLocationByCoordinates(){
    clearInformation();
    try{
      document.getElementById('place-information').style.display='none';
      const response = await fetch(url);
      const data=await response.json();
      let latitude = document.getElementById("coordinates-latitude").value;
      let longitude= document.getElementById("coordinates-longitude").value;
      let getData;
      data.forEach(item=>{
        if((item.location.latitude==latitude)&&(item.location.longitude==longitude)){
          getData=item;
        }
      }
    )
      console.log(getData);
      insertData(getData);
    }
    catch(e){
      alert(e);
    }       
}
async function fetchLocationById(){
  clearInformation();
  try{
    document.getElementById('place-information').style.display='none';
    const response = await fetch(url);
    const data=await response.json();
    let id = document.getElementById("input-id").value;
    let getData;
    data.forEach(item=>{
        if(item.id==id){
          getData=item;
        }
      }
    )
    insertData(getData);
  }
  catch(e){
    alert(e);
  }   
}

document.getElementById('get-id').addEventListener('click', ()=>{
    document.getElementById('place-search').style.display='none';  
    document.getElementById('map').style.display='none';
    document.getElementById('loader').style.border='16px solid #f3f3f3';
    document.getElementById('loader').style.borderTop='16px solid #4267B2';
    fetchLocationById();
});

document.getElementById('get-coordinates').addEventListener('click', ()=>{
  document.getElementById('place-search').style.display='none';  
  document.getElementById('map').style.display='none';
  document.getElementById('loader').style.border='16px solid #f3f3f3';
  document.getElementById('loader').style.borderTop='16px solid #4267B2';
  fetchLocationByCoordinates();
});