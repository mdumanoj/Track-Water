(function () {
    /**
     * Materialize elements initialization
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Navbar Tabs
        var navbarTab = document.getElementById('navbar-tab');
        window.tabInstance = M.Tabs.init(navbarTab);
        gotoListTab(new Date().getMonth()+1);

        // Select Option
        var selectElement = document.querySelectorAll('select');
        var selectInstance = M.FormSelect.init(selectElement);

        // Datepicker
        var datePickerOptions = { defaultDate: new Date(), setDefaultDate: true, maxDate: new Date() };
        var datePicker = document.querySelectorAll('.datepicker');
        var datePickerInstance = M.Datepicker.init(datePicker, datePickerOptions);
    });
})();

/**
 * HTTP request util method
 * @param {*} url 
 * @param {*} reqOptions 
 */
var fetchRequest = (url, reqOptions) => {
    return fetch(url, reqOptions)
        .then(response => response.json())
        .catch(function (error) {
            throw 'Error !';
        });
}

/**
 * Creates a div element with given class attributes
 * @param {*} classNames 
 */
function createDiv(classNames) {
    let div = document.createElement('div');
    div.setAttribute('class', classNames);
    return div;
}

/**
 * Removes all child element of given id element
 * @param {*} divId 
 */
function removeAllChildElement(divId) {
    var myNode = document.getElementById(divId);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

/**
 * Show overlay and loader
 */
function showLoader() {
    let loader = document.getElementById("loader");
    let overlay = document.getElementById("overlay");

    loader.classList.remove('hide');
    overlay.classList.remove('hide');
}

/**
 * Hide overlay and loader
 */
function hideLoader() {
    let loader = document.getElementById("loader");
    let overlay = document.getElementById("overlay");

    loader.classList.add('hide');
    overlay.classList.add('hide');
}


/**
 * Get list data from database to populate in List Tab
 */
async function getList() {
    showLoader();
    let reqOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var month = +document.getElementById('month').value;
    return await fetchRequest('api/track-water/month/' + month, reqOptions)
        .then(resp => {
            hideLoader();
            return resp.data;
        });
}

/**
 * Change tab to list and populate data
 * @param {*} month 
 */
async function gotoListTab(month) {
    window.tabInstance.select('list');

    if(month) {
        let monthElement = document.getElementById('month');
        monthElement.value = month;
    }
    
    let data = await getList();
    removeAllChildElement('list-content');
    let listContent = document.getElementById('list-content');
    
    if (data.length == 0) {
        let h4 = document.createElement('h4');
        h4.setAttribute('class', 'center mt-5 grey-text');
        h4.innerText = 'No data found';
        listContent.appendChild(h4);
        return;
    }

    let total = data.map(d => d.count).reduce((p, n) => p + n);
    let div = createDiv('col s12');
    let blockquote = document.createElement('blockquote');
    blockquote.innerHTML = '<span class="text-bold">Total Can : </span>' + total + ' x 35 : ' + total*35 + 'rs';
    div.appendChild(blockquote);
    listContent.appendChild(div);
    data.forEach(d => {
        let panelDiv = createDiv('row card-panel blue lighten-4 z-depth-2');

        let colDiv = createDiv('col s4');
        panelDiv.appendChild(colDiv);
        let labelSpan = document.createElement('span');
        labelSpan.classList.add('text-bold');
        labelSpan.innerText = 'Date:';
        let br = document.createElement('br');
        let valueSpan = document.createElement('span');
        valueSpan.innerText = d.date;
        colDiv.appendChild(labelSpan);
        colDiv.appendChild(br);
        colDiv.appendChild(valueSpan);

        colDiv = createDiv('col s4');
        panelDiv.appendChild(colDiv);
        labelSpan = document.createElement('span');
        labelSpan.classList.add('text-bold');
        labelSpan.innerText = 'By:';
        br = document.createElement('br');
        valueSpan = document.createElement('span');
        valueSpan.innerText = d.by;
        colDiv.appendChild(labelSpan);
        colDiv.appendChild(br);
        colDiv.appendChild(valueSpan);

        colDiv = createDiv('col s4');
        panelDiv.appendChild(colDiv);
        labelSpan = document.createElement('span');
        labelSpan.classList.add('text-bold');
        labelSpan.innerText = 'Count:';
        br = document.createElement('br');
        valueSpan = document.createElement('span');
        valueSpan.innerText = d.count;
        colDiv.appendChild(labelSpan);
        colDiv.appendChild(br);
        colDiv.appendChild(valueSpan);

        listContent.appendChild(panelDiv);
    });
}

/**
 * Add can data to database
 */
function addCan() {
    let form = document.getElementById('add-can');

    let payload = {
        date: form.elements.date.value,
        month: new Date(form.elements.date.value).getMonth() + 1,
        count: +form.elements.count.value,
        by: form.elements.by.value
    };

    if (payload.count == '' || payload.count <= "0") {
        M.Toast.dismissAll();
        M.toast({ html: 'Count cannot be 0 or empty', classes: 'red rounded' });
        return;
    }

    console.log(payload);

    let reqOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    showLoader();
    fetchRequest('api/track-water', reqOptions)
        .then(resp => {
            hideLoader();
            M.Toast.dismissAll();
            M.toast({ html: 'Can added successfully', classes: 'green rounded' });
            gotoListTab(new Date().getMonth()+1);
        });
}