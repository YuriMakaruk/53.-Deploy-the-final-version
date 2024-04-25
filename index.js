// Initialize an array to store leads
let myLeads = []

// Get reference to HTML elements
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )// Retrieve leads from local storage
const tabBtn = document.getElementById("tab-btn")

// If leads exist in local storage, load them
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads) // Render leads on the UI
}

// Listen for click on the 'Tab' button
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
// Render function to display leads on the UI
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
// Listen for double click on the delete button
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()// Clear local storage
    myLeads = []// Clear leads array
    render(myLeads)
})
// Listen for click on the input button
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})