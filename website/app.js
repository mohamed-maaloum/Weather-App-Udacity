/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '45a34060da4ff1ef0f7e2cddc7f62d36';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let day = d.getDate();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  if(document.getElementById("zip").value == ""){
    alert("PLEASE INSERT ZIP CODE")
  }
  else{
    const cityZip =  document.getElementById('zip').value;
    const feelingsInput = document.getElementById("feelings").value;
    
    
    getAnimal(baseURL,cityZip, apiKey).then(function(data){
        console.log(data);
        postData('/addData',{city:data.name,temp:data.main.temp,date:newDate,feelings:feelingsInput});
        updateUI();
    })
      
  }

}


/*A GET function  
  basically a function getting data from weather API  
  dealing with the API through a complex url (route) made mainly from the URL and API key
  to be able to use this data later 

*/

const getAnimal = async (baseURL, city, key)=>{

    const res = await fetch(baseURL+city+"&appid="+key+"&units=metric")
      
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }
  

/*A POST function  
  basically a function making a POST request through the POST route (addData)
  to post the data we get from the weather API to the server
  to be able to use this data later  

*/
  
const postData = async ( url = '', data = {})=>{
    //console.log(`POST data : ${data}`);
    console.log("1")
  const response = await fetch(url, {
      
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
 // Body data type must match "Content-Type" header        
  body: JSON.stringify(data), 
});
  try {

   const newData = await response.json();

    console.log(newData);
    return newData;
  }catch(error) {
  console.log("error", error);
  }
}



/* function updating the fields with data 
  generally it is a function making a GET request through the GET route (updateUI)
  to recieve the data stored in the server 

*/
const updateUI = async () => {
  const request = await fetch('/updateUI');
  try{
    const allData = await request.json();
    document.getElementById('weather').innerHTML =  ` ${allData.city}    Weather`;
    document.getElementById('date').innerHTML ="todays date : "+ allData.newDate;
    document.getElementById('temp').innerHTML ="temperature : "+ allData.temp+" °C";
    document.getElementById('content').innerHTML ="your feeling : "+ allData.feelings;
    
  }catch(error){
    console.log("error", error);
  }
}
