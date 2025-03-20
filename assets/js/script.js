const flightlogo = [
    { id: 1, logo: "../assets/images/indigo.png", name: "Indigo", airline: "Indigo Airlines" },
    { id: 2, logo: "../assets/images/air india.png", name: "Air India", airline: "Air India Airlines" },
    { id: 3, logo: "../assets/images/emirates.png", name: "Emirates", airline: "Emirates Airlines" }
]

const hamburger = document.querySelector(".hamburger");
const navButtons = document.querySelector(".nav-buttons");

hamburger.addEventListener("click", () => {
    navButtons.classList.toggle("active");
});


//password visibility
function signup() {
    const show = document.getElementById('show');
    const show1 = document.getElementById('show1');
    const password = document.getElementById('password')
    const repassword = document.getElementById('repassword')
    show.onclick = function () {
        if (password.type == "password") {
            password.type = "text";
            show.src = "../assets/images/Show.png";
        }
        else {
            password.type = "password"
            show.src = "../assets/images/Hidden.png"
        }
    }

    //Signup retype
    show1.onclick = function () {
        if (repassword.type == "password") {
            repassword.type = "text";
            show1.src = "../assets/images/Show.png";
        }
        else {
            repassword.type = "password"
            show1.src = "../assets/images/Hidden.png"
        }
    }
}

function signin() {
    const show = document.getElementById('show');
    const password = document.getElementById('password')
    show.onclick = function () {
        if (password.type == "password") {
            password.type = "text";
            show.src = "../assets/images/Show.png";
        }
        else {
            password.type = "password"
            show.src = "../assets/images/Hidden.png"
        }
    }

}


//Select Trip
let selectTrip = document.querySelectorAll("input[name='trip']")
let selectLabel = document.querySelector('#selectlabel');
let oneWay = document.querySelector('#fromTO');
let twoWay = document.querySelector('#twoway');
let multiWay = document.querySelector('#multiway');
let ticket = document.querySelector('.ticket-method')



// Select Trip showing 
let Tripselected = () => {
    let selected = document.querySelector("input[name='trip']:checked").value;
    if (selected == "oneway") {
        ticket.style.height = "auto"
        oneWay.style.display = "block";
        twoWay.style.display = "none";
        multiWay.style.display = "none";
    }
    else if (selected == "twoway") {
        ticket.style.height = "auto"
        oneWay.style.display = "none";
        twoWay.style.display = "block";
        multiWay.style.display = "none";
    }
    else if (selected == "multiway") {
        ticket.style.height = "auto"
        oneWay.style.display = "none";
        twoWay.style.display = "none";
        multiWay.style.display = "block";
    }
    else {
        ticket.style.height = "250px"
        oneWay.style.display = "block";
        twoWay.style.display = "none";
        multiWay.style.display = "none";
    }
}

selectTrip.forEach(val => {
    val.addEventListener("change", Tripselected);
})

//Multiway add
function Multiway() {
    const flightadd = document.querySelector('.addform');
    const flightContainer = document.getElementById('flight-container');

    flightadd.addEventListener("click", (val) => {
        val.preventDefault()
        const containrow = document.createElement('div');
        containrow.classList.add('flight-row');
        containrow.innerHTML = `<input type="text" placeholder="From" id="tripFrom">
                  <button class="exchangebtn"><img src="./assets/images/exchange.png" alt="exchange" width="30px"></button>
                  <input type="text" placeholder="To" id="tripTo">
                  <input type="date" placeholder="Depart">
                  <button class="remove-button">✕</button>`
        flightContainer.append(containrow)

    })

    //Multiway remove
    flightContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
            event.target.parentElement.remove();
        }
    });
}

let city = [];
let flightobj = [];
// Get city names from Api
function JsonData() {
    const url = "./assets/js/airports.json"
    fetch(url)
        .then(response => response.json())
        .then(data => data.map((val) => {
            city.push(val.city_name)
            flightobj.push(val);
        }))
        .catch(error => console.error(error))
}


//Sorting the city names in forms
let sortCity = city.sort();


//get form
const fromForm = document.getElementById('tripFrom');


//sorting
function sortlist(){
fromForm.addEventListener('keyup', (events) => {
    removeCity();
    for (let cities of sortCity) {
        if (cities.toLowerCase().startsWith(fromForm.value.toLowerCase()) && fromForm.value != "") {
            let listcities = document.createElement("li")
            listcities.classList.add("list-cities");
            listcities.style.cursor = "pointer";
            listcities.setAttribute("onclick", "displayCities('" + cities + "')");
            let cityname = "<b>" + cities.substr(0, fromForm.value.length) + "</b>";
            cityname += cities.substr(fromForm.value.length)

            listcities.innerHTML = cityname;
            document.querySelector(".listcity").appendChild(listcities)

        }
    }
})
}
function displayCities(value) {
    fromForm.value = value;
    removeCity()
}
function removeCity() {
    let cityitem = document.querySelectorAll('.list-cities');
    cityitem.forEach((items) => {
        items.remove();
    })
}


//get To
const tripToform = document.getElementById('tripTo');
//sorting
function tosortlist(){
tripToform.addEventListener('keyup', (events) => {
    removeToCity();
    for (let Tocities of sortCity) {
        if (Tocities.toLowerCase().startsWith(tripToform.value.toLowerCase()) && tripToform.value != "") {
            let listTocities = document.createElement("li")
            listTocities.classList.add("listTocities");
            listTocities.style.cursor = "pointer";
            listTocities.setAttribute("onclick", "displayToCities('" + Tocities + "')");
            let cityToname = "<b>" + Tocities.substr(0, tripToform.value.length) + "</b>";
            cityToname += Tocities.substr(tripToform.value.length)
            listTocities.innerHTML = cityToname;
            document.querySelector(".listTocity").appendChild(listTocities)

        }
    }
})


}

function displayToCities(value) {
    tripToform.value = value;
    removeToCity()
}
function removeToCity() {
    let cityToitem = document.querySelectorAll('.listTocities');
    cityToitem.forEach((items) => {
        items.remove();
    })
}


//get form
function getfrom() {
    const getfromvalue = document.getElementById("getfrom");
    const depart = document.getElementById('departDate').value;
    getfromvalue.addEventListener("submit", (e) => {
        e.preventDefault();
        if (fromForm.value == "" && tripToform.value == "" && depart == "") {
            alert("Select Cities & Trip Date")
        }
        else if (fromForm.value == tripToform.value) {
            alert("Select Different Cities")
        }
        else if (fromForm.value == "" || tripToform.value == "") {
            alert("Fill the form")
        }
        else {

            let fromvalue = fromForm.value;
            const userfrom = flightobj.find(obje => obje.city_name === fromvalue);
            console.log(userfrom);
            localStorage.setItem('userfrom', JSON.stringify(userfrom))

            const userto = flightobj.find(obje => obje.city_name === tripToform.value);
            console.log(userto);
            localStorage.setItem('userto', JSON.stringify(userto))

            const depart = document.getElementById('departDate').value;
            console.log(depart);
            localStorage.setItem('bookDate', JSON.stringify(depart));

            const classtype = document.querySelector('#selectClass').value;
            localStorage.setItem('classtype', JSON.stringify(classtype))


            window.location.href = "./pages/booking.html";

        }

    })
}




function getbookfrom() {
    const getfromvalue = document.getElementById("getfrom");

    getfromvalue.addEventListener("submit", (e) => {
        e.preventDefault();
        if (fromForm.value == "" && tripToform.value == "") {
            alert("Select Cities")
        }
        else if (fromForm.value == tripToform.value) {
            alert("Select Different Cities")
        }
        else if (fromForm.value == "" || tripToform.value == "") {
            alert("Fill the form")
        }
        else {

            let fromvalue = fromForm.value;
            const userfrom = flightobj.find(obje => obje.city_name === fromvalue);
            console.log(userfrom);
            localStorage.setItem('userfrom', JSON.stringify(userfrom))

            const userto = flightobj.find(obje => obje.city_name === tripToform.value);
            console.log(userto);
            localStorage.setItem('userto', JSON.stringify(userto));

            const depart = document.getElementById('departDate').value;
            console.log(depart);
            localStorage.setItem('depart', JSON.stringify(depart));

            const classtype = document.querySelector('#selectClass').value;
            localStorage.setItem('classtype', JSON.stringify(classtype))


            local();
            location.reload()

        }

    })
}

//scroll calender booking page

const calendar = document.getElementById('calendar');
let currentDate = new Date();
let selectedDayIndex = 0;

function generateCalendar(startDate) {
    calendar.innerHTML = '';
    calendar.innerHTML += '<button class="scroll-button left" onclick="scrollCalendar(-1)">&lt;</button>';

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const dayOfMonth = date.getDate();

        const dayElement = document.createElement('button');
        dayElement.className = 'calendar-day';
        dayElement.style.border = '1px solid black'
        dayElement.innerHTML = `${dayName}, ${monthName} ${dayOfMonth}<br><b>Rs : ${Math.floor(Math.random() * 20000) - 500}</b>`; // Example price

        if (i === selectedDayIndex) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', () => {
            selectDay(i);
        });

        calendar.appendChild(dayElement);
    }
    calendar.innerHTML += '<button class="scroll-button right" onclick="scrollCalendar(1)">&gt;</button>';
}

function scrollCalendar(direction) {
    currentDate.setDate(currentDate.getDate() + (7 * direction))
    generateCalendar(currentDate);
}

//To show Date Format

function getDayName(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    return `${dayOfWeek} ${dayOfMonth},${month} ${year}`;
}

//To show time
function randomtime() {
    const hours = Math.floor(Math.random() * 12).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

//close popup 




var distanceflight = localStorage.getItem('distance');
var distancetonum = Number(distanceflight);
console.log(distancetonum);

function calculatePrice(classprice) {
    if (classprice == "Economy") {
        console.log(distancetonum * 12);

        return distancetonum * 12;
    }
    else if (classprice == "Premium Economy") {
        console.log(distancetonum * 16);
        return distancetonum * 16;
    }
    else if (classprice == "Business Class") {
        console.log(distancetonum * 18);
        return distancetonum * 18;
    }
    else if (classprice == "First Class") {
        console.log(distancetonum * 20);
        return distancetonum * 20
    }
}



//For FlightDetails 

function local() {



    //Flight Logo
    flightlogo.map((val) => {

        var source = localStorage.getItem('userfrom');
        source = JSON.parse(source);
        console.log(source);

        var destination = localStorage.getItem('userto');
        destination = JSON.parse(destination);
        console.log(destination);

        var fromdated = localStorage.getItem('bookDate');
        console.log(fromdated);
        let travelDate = getDayName(fromdated);



        const distance = geolib.getDistance(
            { latitude: source.latitude, longitude: source.longitude },
            { latitude: destination.latitude, longitude: destination.longitude }
        );

        var flightdistance = distance / 1000;
        console.log(flightdistance);
        localStorage.setItem('distance', flightdistance);

        //class type
        var classprice = localStorage.getItem('classtype');
        classprice = JSON.parse(classprice);
        console.log(classprice);


        // const flightprice = flightdistance * 12;
        // console.log(flightprice);

        // FLight distance time
        var avgSpeed = 850;
        const flightTimeHours = flightdistance / avgSpeed;
        const hour = Math.floor(flightTimeHours);
        const minutes = Math.round(flightTimeHours * 90);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        let formattedHours = hours.toString();
        let formattedMinutes = remainingMinutes.toString().padStart(2, '0');

        const flightShow = document.querySelector('.div4');

        const flightContainer = document.createElement('div');
        flightContainer.className = 'flight-container';

        // Airline Info

        const airlineInfo = document.createElement('div');
        airlineInfo.className = 'airline-info';

        const airlineLogo = document.createElement('img');
        airlineLogo.src = val.logo;
        airlineLogo.alt = 'Airline Logo';

        const airlineName = document.createElement('p');
        airlineName.textContent = val.name;

        airlineInfo.appendChild(airlineLogo);
        airlineInfo.appendChild(airlineName);
        flightContainer.appendChild(airlineInfo);

        // Route Info
        const routeInfo = document.createElement('div');
        routeInfo.className = 'route-info';

        const line = document.createElement('div');
        line.className = 'line';

        const dotLeft = document.createElement('div');
        dotLeft.className = 'dot left';

        const dotRight = document.createElement('div');
        dotRight.className = 'dot right';

        const cities = document.createElement('div');
        cities.className = 'cities';

        const sourceCity = document.createElement('span');
        sourceCity.textContent = source.city_name;

        const destinationCity = document.createElement('span');
        destinationCity.textContent = destination.city_name;

        cities.appendChild(sourceCity);
        cities.appendChild(destinationCity);

        const duration = document.createElement('div');
        duration.className = 'duration';
        duration.textContent = hours ? `${formattedHours}hr : ${formattedMinutes} min` : `${formattedMinutes} min`;

        const direct = document.createElement('div');
        direct.className = 'direct';
        direct.textContent = 'Direct';

        const viewDetails = document.createElement('button');
        viewDetails.className = 'view-details';
        viewDetails.textContent = 'View Flight details';

        routeInfo.appendChild(viewDetails);
        routeInfo.appendChild(direct);
        routeInfo.appendChild(line);
        routeInfo.appendChild(dotLeft);
        routeInfo.appendChild(dotRight);
        routeInfo.appendChild(cities);
        routeInfo.appendChild(duration);
        flightContainer.appendChild(routeInfo);

        // Price Info
        const priceInfo = document.createElement('div');
        priceInfo.className = 'price-info';

        const bestPrice = document.createElement('div');
        bestPrice.className = 'best-price';
        bestPrice.textContent = 'Best Price in 7 days';

        const cheapest = document.createElement('div');
        cheapest.className = 'cheapest';
        cheapest.textContent = 'Cheapest';

        const price = document.createElement('div');
        price.className = 'price';
        price.innerHTML = `₹ ${val.id == 1 ? `${Math.round(calculatePrice(classprice))}` : (val.id == 2 ? `${Math.round(calculatePrice(classprice)) + 1410}` : `${`${Math.round(calculatePrice(classprice)) + 2308}`}`)}<p>Per person</p>`;

        const bookNow = document.createElement('button');
        bookNow.textContent = 'Book Now';

        bookNow.addEventListener('click',()=>{
            window.location.href = "../pages/addPassenger.html";
            localStorage.setItem('logo',JSON.stringify(val.logo));
            localStorage.setItem('flightname',JSON.stringify(val.name))
        })

        priceInfo.appendChild(bestPrice);
        priceInfo.appendChild(cheapest);
        priceInfo.appendChild(price);
        priceInfo.appendChild(bookNow);
        flightContainer.appendChild(priceInfo);

        flightShow.appendChild(flightContainer)

        //popup

        const popup = document.querySelector('.popup');
        viewDetails.addEventListener('click', (e) => {
            e.preventDefault();
            popup.style.display = 'block'; // Show the popup

            const popupmsg = document.createElement('div');
            popupmsg.className = 'popupmsg';




            // Airline Info
            const airlineDiv = document.createElement('div');
            airlineDiv.className = 'airline-div';

            const emiratesLogo = document.createElement('img');
            emiratesLogo.className = 'emirates-logo';
            emiratesLogo.src = val.logo;

            

            const airlineText = document.createElement('div');
            airlineText.className = 'airline-text';
            airlineText.textContent = val.airline;



            airlineDiv.appendChild(emiratesLogo);
            airlineDiv.appendChild(airlineText);
            popupmsg.appendChild(airlineDiv);


            // Flight Route
            const routeDiv = document.createElement('div');
            routeDiv.className = 'route-div';

            const fromdiv = document.createElement('div');
            fromdiv.className = 'fromdiv'

            // Departure
            const departureDiv = document.createElement('div');
            departureDiv.className = 'departure-div';
            departureDiv.innerHTML = `<h2>${source.name}</h2>`;
            fromdiv.appendChild(departureDiv);

            //Date
            const fromdate = document.createElement('div');
            fromdate.className = 'fromdate';
            fromdate.innerText = `${travelDate}`

            const todate = document.createElement('div');
            todate.className = 'fromdate';
            todate.innerText = `${travelDate}`

            //Time
            const sourceTime = document.createElement('div');
            sourceTime.className = 'sourcetime';
            sourceTime.innerText = `${randomtime()}`

            const departureTime = document.createElement('div');
            departureTime.className = 'sourcetime';
            departureTime.innerText = `${randomtime()}`

            // Route Line
            const routeLineDiv = document.createElement('div');
            routeLineDiv.className = 'route-line-div';

            const lines = document.createElement('div');
            lines.className = 'lines';

            const dotLefted = document.createElement('div');
            dotLefted.className = 'dot lefted dot';

            const dotRighted = document.createElement('div');
            dotRighted.className = 'dot righted dot';

            const durationText = document.createElement('div');
            durationText.className = 'duration-text';
            durationText.textContent = hours ? `${formattedHours}hr : ${formattedMinutes} min` : `${formattedMinutes} min`;

            const directText = document.createElement('div');
            directText.className = 'direct-text';
            directText.textContent = 'Direct';

            popupmsg.appendChild(durationText);
            fromdate.appendChild(sourceTime)
            
            routeLineDiv.appendChild(fromdate)
            
            routeLineDiv.appendChild(dotLefted);
            routeLineDiv.appendChild(lines);
            routeLineDiv.appendChild(dotRighted);
            routeLineDiv.appendChild(todate)
            todate.appendChild(departureTime)
            
            routeDiv.appendChild(routeLineDiv);
            popupmsg.appendChild(routeDiv);
            popupmsg.appendChild(directText);
            popupmsg.appendChild(fromdiv)


            // Arrival
            const arrivalDiv = document.createElement('div');
            arrivalDiv.className = 'arrival-div';
            arrivalDiv.innerHTML = `
            <h2>${destination.name}</h2>`;
            fromdiv.appendChild(arrivalDiv);



            // Baggage Info
            const baggageDiv = document.createElement('div');
            baggageDiv.className = 'baggage-div';

            const baggageLabels = ['BAGGAGE:', 'CHECK IN', 'CABIN', `${classprice}`];
            baggageLabels.forEach(label => {
                const labelDiv = document.createElement('div');
                labelDiv.textContent = label;
                baggageDiv.appendChild(labelDiv);
            });

            const baggageData = ['ADULT', '30kg', '7kg', '<i class="fa-solid fa-wifi"></i> <i class="fa-solid fa-utensils"></i> '];
            baggageData.forEach(data => {
                const dataDiv = document.createElement('div');
                // dataDiv.textContent = data;
                dataDiv.innerHTML = `<p>${data}</p>`
                baggageDiv.appendChild(dataDiv);
            });

            const childData = ['CHILD', '30kg', '7kg', ''];
            childData.forEach(data => {
                const dataDiv = document.createElement('div');
                dataDiv.textContent = data;
                baggageDiv.appendChild(dataDiv);
            });

            const infantData = ['INFANT', '15kg', '5kg', ''];
            infantData.forEach(data => {
                const dataDiv = document.createElement('div');
                dataDiv.textContent = data;
                baggageDiv.appendChild(dataDiv);
            });

            const priceDiv = document.createElement('div');
            priceDiv.className = 'price-div';
            priceDiv.innerHTML = `₹${val.id == 1 ? `${Math.round(calculatePrice(classprice))}` : (val.id == 2 ? `${Math.round(calculatePrice(classprice)) + 1410}` : `${`${Math.round(calculatePrice(classprice)) + 2308}`}`)}<br>Per person`;
            baggageDiv.appendChild(priceDiv);

            const bookButton = document.createElement('button');
            bookButton.className = 'book-button';
            bookButton.textContent = 'Book Now';

            bookButton.addEventListener('click',()=>{
                window.location.href = "../pages/addPassenger.html";
                localStorage.setItem('logo',JSON.stringify(val.logo));
                localStorage.setItem('flightname',JSON.stringify(val.name))
            })
            priceDiv.appendChild(bookButton);
            popupmsg.appendChild(baggageDiv);
            popup.appendChild(popupmsg);
        });

    })

}



//Add Passenger Page

//Show flight info div


function createFlightDetails(data) {
   
    const fcontainer = document.querySelector('.first-container');

    var flightfrom = localStorage.getItem('userfrom');
    flightfrom=JSON.parse(flightfrom)
    console.log(flightfrom);

    var flightto = localStorage.getItem('userto');
    flightto=JSON.parse(flightto)
    console.log(flightfrom);

    var flightimage = localStorage.getItem('logo');
    flightimage=JSON.parse(flightimage);
    console.log(flightimage);
    
    var flightNAme = localStorage.getItem('flightname');
    flightNAme=JSON.parse(flightNAme);

    var flightClasses = localStorage.getItem('classtype');
    flightClasses=JSON.parse(flightClasses);

    var travelDate = localStorage.getItem('bookDate');
    travelDate=JSON.parse(travelDate);

    let travelDated = getDayName(travelDate);


    const flightDetails = document.createElement('div');
    flightDetails.className = 'flight-details';
  
    const airlineInfo = document.createElement('div');
    airlineInfo.className = 'airlineInfo';
    const airlineLogo = document.createElement('img');
    airlineLogo.className = 'flight-image'
    airlineLogo.src = `${flightimage}`
    airlineLogo.alt = 'logo';
    const flightNumber = document.createElement('div');
    flightNumber.className = 'flight-number';
    flightNumber.textContent = `${flightNAme} ${ Math.floor(Math.random() * 900) + 100}`;

    
    const flightclass = document.createElement('div');
    flightclass.className='flight-class';

    const classdata = [ '<i class="fa-solid fa-wifi"></i> <i class="fa-solid fa-utensils"></i> '];
    classdata.forEach(data => {
        // dataDiv.textContent = data;
        flightclass.innerHTML = `<span>${flightClasses}</span> <p>${data}</p>`
    });


    airlineInfo.appendChild(airlineLogo);
    airlineInfo.appendChild(flightNumber);
    airlineInfo.appendChild(flightclass)

    const flightinfo = document.createElement('div');
    flightinfo.className = 'flight-info';

    const flightinfoleft = document.createElement('div');
    flightinfoleft.className = 'flightleftinfo'

    flightinfo.append(flightinfoleft)

    const flightinforight = document.createElement('div');
    flightinfo.append(flightinforight);
    //

     // Flight Route
     const routeDiv = document.createElement('div');
     routeDiv.className = 'route-div';

     const fromdiv = document.createElement('div');
     fromdiv.className = 'fromdiv'

     // Departure
     const departureDiv = document.createElement('div');
     departureDiv.className = 'departure-div';
     departureDiv.innerHTML = `<h2>${flightfrom.name}</h2>`;
     fromdiv.appendChild(departureDiv);

     //Date
     const fromdate = document.createElement('div');
     fromdate.className = 'fromdate';
     fromdate.innerText = `${travelDated}`

     const todate = document.createElement('div');
     todate.className = 'fromdate';
     todate.innerText = `${travelDated}`

     //Time
     const sourceTime = document.createElement('div');
     sourceTime.className = 'sourcetime';
     sourceTime.innerText = `${randomtime()}`

     const departureTime = document.createElement('div');
     departureTime.className = 'sourcetime';
     departureTime.innerText = `${randomtime()}`

     // Route Line
     const routeLineDiv = document.createElement('div');
     routeLineDiv.className = 'route-line-div';

     const lines = document.createElement('div');
     lines.className = 'lines';

     const dotLefted = document.createElement('div');
     dotLefted.className = 'dot lefted dot';

     const dotRighted = document.createElement('div');
     dotRighted.className = 'dot righted dot';

     const durationText = document.createElement('div');
     durationText.className = 'duration-text';
    //  durationText.textContent = hours ? `${formattedHours}hr : ${formattedMinutes} min` : `${formattedMinutes} min`;

     const directText = document.createElement('div');
     directText.className = 'direct-text';
     directText.textContent = 'Direct';

     flightinfo.appendChild(durationText);
     fromdate.appendChild(sourceTime);
     
     routeLineDiv.appendChild(fromdate)
     
     routeLineDiv.appendChild(dotLefted);
     routeLineDiv.appendChild(lines);
     routeLineDiv.appendChild(dotRighted);
     routeLineDiv.appendChild(todate)
     todate.appendChild(departureTime)
     
     routeDiv.appendChild(routeLineDiv);
     flightinfoleft.appendChild(routeDiv);
     flightinfoleft.appendChild(directText);
     flightinfoleft.appendChild(fromdiv)


     // Arrival
     const arrivalDiv = document.createElement('div');
     arrivalDiv.className = 'arrival-div';
     arrivalDiv.innerHTML = `
     <h2>${flightto.name}</h2>`;
     fromdiv.appendChild(arrivalDiv);


     const baggageDiv = document.createElement('div');
     baggageDiv.className = 'baggage-div';

     const baggageLabels = ['BAGGAGE:', 'CHECK IN', 'CABIN'];
     baggageLabels.forEach(label => {
         const labelDiv = document.createElement('div');
         labelDiv.textContent = label;
         baggageDiv.appendChild(labelDiv);
     });

     const baggageData = [ 'ADULT', '30KG','7KG'];
     baggageData.forEach(data => {
         const dataDiv = document.createElement('div');
         // dataDiv.textContent = data;
         dataDiv.innerHTML = `<p>${data}</p>`
         baggageDiv.appendChild(dataDiv);
     });

     const childData = ['CHILD', '30kg', '7KG'];
     childData.forEach(data => {
         const dataDiv = document.createElement('div');
         dataDiv.textContent = data;
         baggageDiv.appendChild(dataDiv);
     });

     const infantData = ['INFANT', '15KG','7KG'];
     infantData.forEach(data => {
         const dataDiv = document.createElement('div');
         dataDiv.textContent = data;
         baggageDiv.appendChild(dataDiv);
     });

     flightinforight.append(baggageDiv)

    flightDetails.appendChild(airlineInfo);
    flightDetails.appendChild(flightinfo);
    fcontainer.appendChild(flightDetails);
}


    const continuebtn = document.querySelector('.continue');
    console.log(continuebtn);
    
    continuebtn.addEventListener('click',()=>{
        window.location.href = "../pages/billpage.html";
    })

function fare(){

        var flightClasses = localStorage.getItem('classtype');
        flightClasses=JSON.parse(flightClasses);


        const secondcontainer = document.querySelector('.second-container')
        const fareDetails = document.createElement('div');
        fareDetails.style.fontFamily = 'sans-serif'; 
      
        // Fare Details Heading
        const heading = document.createElement('h2');
        heading.textContent = 'FARE DETAILS';
        fareDetails.appendChild(heading);
      
        // Basic Fare Section
        const basicFare = document.createElement('div');
        const basicFareHeading = document.createElement('h3');
        basicFareHeading.textContent = 'Basic Fare';
        basicFare.appendChild(basicFareHeading);
      
        const adultFare = document.createElement('div');
        adultFare.innerHTML = `Adult(s) <span style="float: right;">Rs: ${Math.round(calculatePrice(flightClasses))}</span>`;
        basicFare.appendChild(adultFare);
      
        // const childrenFare = document.createElement('div');
        // childrenFare.innerHTML = 'Children <span style="float: right;">Rs:' + 10000 + '</span>';
        // basicFare.appendChild(childrenFare);
      
        // const infantFare = document.createElement('div');
        // infantFare.innerHTML = 'Infant <span style="float: right;">Rs:' + 10000 + '</span>';
        // basicFare.appendChild(infantFare);
      
        fareDetails.appendChild(basicFare);
      
        // Tax Details Section
        const taxDetails = document.createElement('div');
        const taxHeading = document.createElement('h3');
        taxHeading.textContent = 'Tax Details';
        taxDetails.appendChild(taxHeading);
      
        const airlineTaxes = document.createElement('div');
        airlineTaxes.innerHTML = 'Airline Taxes <span style="float: right;">Rs:' + 2000 + '</span>';
        taxDetails.appendChild(airlineTaxes);
      
        const surcharges = document.createElement('div');
        surcharges.innerHTML = 'Surcharges <span style="float: right;">Rs:' + 3000 + '</span>';
        taxDetails.appendChild(surcharges);
      
        const serviceFee = document.createElement('div');
        serviceFee.innerHTML = 'Service Fee <span style="float: right;">Rs:' + 2000 + '</span>';
        taxDetails.appendChild(serviceFee);
      
        fareDetails.appendChild(taxDetails);
      
        // Discounts Section
        const discounts = document.createElement('div');
        discounts.className = 'discount'
        discounts.innerHTML = '<h2>Discounts</h2> <span style="float: right;">Rs:' + 2000 + '</span>';
        fareDetails.appendChild(discounts);
      
        // Total Amount Section
        const totalAmount = document.createElement('div');
        totalAmount.className = 'totalamount'
        totalAmount.style.borderTop = '1px solid black'; // Add a line
        totalAmount.innerHTML = `<h2 >Total Amount</h2> <span style="float: right;">Rs:${Math.round(calculatePrice(flightClasses)+2000+3000+2000)} </span>`;
        fareDetails.appendChild(totalAmount);

        const paynow = document.createElement('button');
        paynow.className = 'paybtn'
        paynow.innerText='Pay Now'
        fareDetails.append(paynow)
        secondcontainer.append(fareDetails)
      
}


