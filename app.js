// --------- CACHING THE DOM ----------------
const midContainer = document.querySelector('.mid-container');
const innerContainer = document.querySelector('.inner-container');


// --------------- GLOBAL VARIABLES --------------
const servicesArr = [{
    service: 'Wash Car',
    cost: 10
}, {
    service: 'Mow Lawn',
    cost: 20
}, {
    service: 'Pull Weeds',
    cost: 30
}
]

let servicesAdded = false;
let duplicateItems = false;
let serviceItems = [];
let totalCost = 0;

// --------------- FUNCTIONS -------------------------
function services(arr) {
    for (let i = 0; i < arr.length; i++) {
        midContainer.innerHTML += `<button class='services'>${arr[i].service}: $${arr[i].cost}</button>`
    }
    midContainer.innerHTML += `<p><span>TASK</span></p>`
}

services(servicesArr)

function updateTotalCost(event) {
    if (event.textContent === `${servicesArr[0].service}: $${servicesArr[0].cost}`) {
        totalCost += servicesArr[0].cost;
    } else if (event.textContent === `${servicesArr[1].service}: $${servicesArr[1].cost}`) {
        totalCost += servicesArr[1].cost;
    } else {
        totalCost += 30;
    }
}

function checkDuplicate(event) {
    if (serviceItems.includes(`${event}`)) {
        alert('You have already added this service!')
        duplicateItems = true;
    }
}

//-----------------------------------------------------------
const serviceBtns = document.querySelectorAll('.services')

function runApp() {
    for (let i = 0; i < serviceBtns.length; i++) {
        serviceBtns[i].addEventListener('click', function() {
            checkDuplicate(serviceBtns[i].textContent)
            if (duplicateItems) {
                duplicateItems = false;
                return;
            }
            serviceItems.push(serviceBtns[i].textContent)
            console.log(serviceItems)
            
            updateTotalCost(serviceBtns[i])
    
            const node = document.createElement('p');
            node.classList.add('added-service');
            const textNode = document.createTextNode(`${serviceBtns[i].textContent}`)
            
            const spanNode = document.createElement('span')
            spanNode.classList.add('remove')
            const spanText = document.createTextNode('Remove')
            
            
            spanNode.append(spanText)
            
            node.append(textNode, spanNode);
            
            midContainer.appendChild(node)
            
            if (serviceItems.length === 1) {
                servicesAdded = true;
                innerContainer.innerHTML += `<p class="total"><span class="payment-method">We accept cash, credit card, or Paypal</span><span class='total-cost'></span></p>`
            }

            let totalEl = document.querySelector('.total-cost')
            totalEl.textContent = ` $${totalCost}`;
        })
    }
}

runApp();

