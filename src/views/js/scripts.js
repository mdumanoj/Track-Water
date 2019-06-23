(function () {
    /**
     * Materialize elements initialization
     */
    document.addEventListener('DOMContentLoaded', function () {
        // Navbar Tabs
        var navbarTab = document.getElementById('navbar-tab');
        var tabInstance = M.Tabs.init(navbarTab);
        tabInstance.select('list');

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
 * Add can data to database
 */
function addCan() {
    let form = document.getElementById('add-can');

    let payload = {
        date: form.elements.date.value,
        month: new Date(form.elements.date.value).getMonth() + 1,
        count: form.elements.count.value,
        by: form.elements.by.value
    };

    if (payload.count == '' || payload.count == "0") {
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
        });
}