document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('add-integration');
    checkPageButton.addEventListener('click', function () {
        chrome.tabs.executeScript({
            file: 'library.js'
        });
        chrome.tabs.executeScript({
            file: 'integration.js'
        });
    });
});
