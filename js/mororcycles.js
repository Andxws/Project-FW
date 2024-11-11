
let totalCost = 0;
let scheduledServices = [];

function showDetails(serviceName, serviceDescription, unitPrice) {
    document.getElementById('service-name').innerText = serviceName;
    document.getElementById('service-description').innerText = serviceDescription;
    let totalPrice = unitPrice; 
    

    if (serviceName === "Cambio de Bujías") {
        const quantity = prompt("¿Cuántas bujías desea cambiar?");

        if (quantity && !isNaN(quantity) && quantity > 0) {
            totalPrice = unitPrice * quantity;

            document.getElementById('service-price').innerText = `${totalPrice.toLocaleString('es-CO')} COP`;
            document.getElementById('service-price').dataset.price = totalPrice; 
            document.getElementById('unit-price').style.display = "block";
            document.getElementById('unit-price').innerText = `Precio por bujía: ${unitPrice.toLocaleString('es-CO')} COP`;
        } else {
            alert("Por favor, ingrese una cantidad válida.");
            resetServiceDetails();
            return;
        }
    } else {
        document.getElementById('service-price').innerText = `${unitPrice.toLocaleString('es-CO')} COP`;
        document.getElementById('service-price').dataset.price = unitPrice; 
        document.getElementById('unit-price').style.display = "none"; 
    }
}
function scheduleService() {
    const serviceName = document.getElementById('service-name').innerText;
    const servicePrice = parseFloat(document.getElementById('service-price').dataset.price);

    if (!serviceName || serviceName === "Selecciona un servicio") {
        alert("Por favor, selecciona un servicio antes de agendarlo.");
        return;
    }

    scheduledServices.push({ name: serviceName, price: servicePrice });

    const scheduledList = document.getElementById('scheduled-list');
    const listItem = document.createElement('li');
    listItem.classList.add('scheduled-service-item');

    listItem.innerText = `${serviceName} - ${servicePrice.toLocaleString('es-CO')} COP`;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "X";
    deleteButton.classList.add('btn-delete');

    deleteButton.onclick = function () {
        removeService(listItem, servicePrice);
    };

    listItem.appendChild(deleteButton);
    scheduledList.appendChild(listItem);

    totalCost += servicePrice;
    document.getElementById('total-cost').innerText = `${totalCost.toLocaleString('es-CO')} COP`;

    if (scheduledServices.length > 6) {
        document.getElementById('sidebar').style.display = 'block';
    }
}

function resetServiceDetails() {
    document.getElementById('service-name').innerText = "Selecciona un servicio";
    document.getElementById('service-description').innerText = "";
    document.getElementById('service-price').innerText = "$0";
    document.getElementById('unit-price').style.display = "none"; 
}

function removeService(listItem, servicePrice) {
    scheduledServices = scheduledServices.filter(service => service.name !== listItem.innerText.split(' - ')[0]);

    totalCost -= servicePrice;
    document.getElementById('total-cost').innerText = `${totalCost.toLocaleString('es-CO')} COP`; 

    listItem.remove();

    if (scheduledServices.length <= 6) {
        document.getElementById('sidebar').style.display = 'none';
    }
}

function payServices() {
    if (scheduledServices.length === 0) {
        alert("No hay servicios agendados.");
        return;
    }

    alert(`Total a pagar: $${totalCost.toLocaleString('es-CO')} COP`);

    resetSchedule();
}

function resetSchedule() {
    scheduledServices = [];
    totalCost = 0;

    const scheduledList = document.getElementById('scheduled-list');
    scheduledList.innerHTML = '';

    document.getElementById('total-cost').innerText = '0 COP';

    document.getElementById('service-name').innerText = "Selecciona un servicio";
    document.getElementById('service-description').innerText = "";
    document.getElementById('service-price').innerText = "$0";

    document.getElementById('sidebar').style.display = 'none';
}

const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.style.maxHeight = null;
            });
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

function searchServices() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const services = item.querySelectorAll("li");
        let categoryMatch = false; 

        services.forEach(service => {
            const serviceText = service.textContent.toLowerCase();
            if (serviceText.includes(searchTerm)) {
                service.style.display = "block"; 
                categoryMatch = true;
            } else {
                service.style.display = "none"; 
            }
        });
        item.style.display = categoryMatch ? "block" : "none";
    });
}

