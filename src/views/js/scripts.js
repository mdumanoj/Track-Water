(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Navbar Tabs
        var navbarTab = document.getElementById('navbar-tab');
        var tabInstance = M.Tabs.init(navbarTab);
        tabInstance.select('list');
        
        // Select Option
        var selectElement = document.querySelectorAll('select');
        var selectInstance = M.FormSelect.init(selectElement);

        // Datepicker
        var datePickerOptions = { defaultDate : new Date(), setDefaultDate : true };
        var datePicker = document.querySelectorAll('.datepicker');
        var datePickerInstance = M.Datepicker.init(datePicker,datePickerOptions);
    });
})();