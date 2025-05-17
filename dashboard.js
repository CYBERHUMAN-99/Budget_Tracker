// get income form container and expense form container, and the two forms, get the two tables, get add income and add expense
// get the two cancel
// input for both forms get them
// in the dashboard show email and password and date

const logoutButtons = document.querySelectorAll(".exit")

//show user name and email in dashboard
const showUserEmail = document.getElementById("showUserEmail")
const showUserName = document.getElementById("showUserName")
//date
const currentDate= document.getElementById("currentDate")
//hamburger
// const hamburgerButton = document.querySelector(".hamburger")
//others
// const allMenu = document.querySelector(".menu-side")

const totalIncome = document.querySelector(".total-income")
const totalExpense = document.querySelector(".total-expense")
const incomeFormContainer = document.getElementById("income-form-container")
const expenseFormContainer = document.getElementById("expense-form-container")
const incomeForm = document.getElementById("income-form")
const expenseForm = document.getElementById("expense-form")
const incomeOverview = document.querySelector(".income-overview")
const expenseOverview = document.querySelector(".expense-overview")
const incomeTable = document.getElementById("income-table")
const expenseTable = document.getElementById("expense-table")
const addIncome = document.querySelector(".add-income")
const addExpense = document.querySelector(".add-expense")
const incomeCancelButton = document.querySelector(".income-cancel")
const expenseCancelButton = document.querySelector(".expense-cancel")
const incomeSubmitButton = document.querySelector(".income-submit")
const expenseSubmitButton = document.querySelector(".expense-submit")
const incomeAmount = document.getElementById("income-amount")
const incomeDate = document.getElementById("income-date")
const incomeDescription = document.getElementById("income-description")
const incomeChannel = document.getElementById("income-Channel")
const expenseAmount = document.getElementById("expense-amount")
const expenseDate = document.getElementById("expense-date")
const expenseDescription = document.getElementById("expense-description")
const expenseChannel = document.getElementById("expense-Channel")
const expenseContainer = document.querySelector(".expense-container")
const incomeContainer = document.querySelector(".income-container")


const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  const monthOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const today = new Date()
  const date = today.getDate();
const weekday = today.getDay();
const month = today.getMonth();
const year = today.getFullYear();

const wholeDate = `${daysOfTheWeek[weekday]}, ${getPattern(date)} ${monthOfTheYear[month]}, ${year}`

function getPattern(number) {
    if (number == 1  || number == 21 || number == 31) {
        return `${number}st`
    }else if(number == 2 || number == 22){
        return `${number}nd`
    }else if(number == 3 || number == 23){
        return `${number}rd`
    }else{
        return `${number}th`
    }
}
console.log(wholeDate);

currentDate.innerHTML = wholeDate


incomeOverview.addEventListener("click", toggleIncomeOverview)

function toggleIncomeOverview() {
  incomeOverview.classList.add("active")
  expenseOverview.classList.remove("active")
  incomeContainer.classList.remove("hide")
  expenseContainer.classList.add("hide")

}

expenseOverview.addEventListener("click", toggleExpenseOverview)

function toggleExpenseOverview() {
    expenseOverview.classList.add("active")
    incomeOverview.classList.remove("active")
    expenseContainer.classList.remove("hide")
    incomeContainer.classList.add("hide")
}

const userData = JSON.parse(localStorage.getItem("currentUser"))
const email = userData?.email
const username = userData?.username

const user = JSON.parse(localStorage.getItem(`user_${email}`));



showUserEmail.innerHTML = email
showUserName.innerHTML = `Welcome, ${username}`;



// hamburgerButton.addEventListener("click", ()=>{
// allMenu.classList.add("show")
// })



//logout
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html"
}

logoutButtons.forEach((button)=>{
 button.addEventListener("click", logout)
 
})

//reject user from accessing dashboard without login
if (!userData) {
    window.location.href = "login.html"
}


addIncome.addEventListener("click", showIncomeForm)

function showIncomeForm() {
    incomeFormContainer.classList.add("show")
    
}


addExpense.addEventListener("click", showExpenseForm)

function showExpenseForm() {
   expenseFormContainer.classList.add("show")
    
}

incomeCancelButton.addEventListener("click", ()=>{
    incomeFormContainer.classList.remove("show")
})

expenseCancelButton.addEventListener("click", ()=>{
    expenseFormContainer.classList.remove("show")
})

// to add the incomeForm to local storage
incomeFormContainer.addEventListener("submit", (e)=>{
    e.preventDefault()

    let incomeAmountValue = incomeAmount.value.trim()
    let incomeDateValue = incomeDate.value.trim()
    let incomeDescriptionValue = incomeDescription.value.trim()
    let incomeChannelValue = incomeChannel.value.trim()


    if(!incomeAmountValue || !incomeChannelValue || !incomeDescriptionValue || !incomeDateValue){
        alert("All fields are required");
        return;
    }
    let incomeArray = user.income || []

    incomeArray.push({
        amount: incomeAmountValue,
        date: incomeDateValue,
        channel: incomeChannelValue,
        description: incomeDescriptionValue
    })
    //localstorage
    localStorage.setItem(`user_${userData.email}`,
    JSON.stringify({
        ...userData,
        ...user,
        income : incomeArray,   
    }

)
)
incomeAmount.value = ""
incomeChannel.value = ""
incomeDescription.value = ""
incomeDate.value = ""

displayIncomeTable()
incomeFormContainer.classList.remove("show")


})

function displayIncomeTable() {
    //fetch again from local storage to get the income
const UpdatedUserIncome = JSON.parse(localStorage.getItem(`user_${email}`))?.income;

    //add income to table
    if (UpdatedUserIncome ) {
        
        const incomeTableInfo = UpdatedUserIncome.map((item, index)=>{
            return `<tr>
                     <td>${index + 1}</td>
                     <td>${item.date}</td>
                     <td>${item.amount}</td>
                     <td>${item.channel}</td>
                     <td>${item.description}</td>
                  </tr>`
            })
            incomeTable.innerHTML = incomeTableInfo.join("")
    }else{
        incomeTable.innerHTML =  `<tr>
        <td colspan="5">
        <h2>No Transaction yet</h2>
        </td>
        </tr>`
    }
    let totalIncomeValue = 0
    for (let i = 0; i < UpdatedUserIncome.length; i++) {
         totalIncomeValue += parseFloat(UpdatedUserIncome[i].amount);
    }
    totalIncome.innerHTML= totalIncomeValue
}
displayIncomeTable()
//to add the expenseForm to local storage

expenseFormContainer.addEventListener("submit", (e)=>{
    e.preventDefault()

    const expenseAmountValue = expenseAmount.value.trim()
    const expenseDateValue = expenseDate.value.trim()
    const expenseDescriptionValue = expenseDescription.value.trim()
    const expenseChannelValue = expenseChannel.value.trim()


    if(!expenseAmountValue || !expenseChannelValue || !expenseDescriptionValue || !expenseDateValue){
        alert("All fields are required")
        return;
    }

    //localstorage
    let expenseArray = user.expense || []

    expenseArray.push({
        amount: expenseAmountValue,
        date: expenseDateValue,
        channel: expenseChannelValue,
        description: expenseDescriptionValue
    })
    //localstorage
    localStorage.setItem(`user_${userData.email}`,
    JSON.stringify({
        ...userData,
        ...user,
        expense : expenseArray,   
    }
    )
)
expenseAmount.value = ""
expenseChannel.value = ""
expenseDescription.value = ""
expenseDate.value = ""

displayExpenseTable()
expenseFormContainer.classList.remove("show")

})

// expense
function displayExpenseTable() {
    //fetch again from local storage to get the expense
const UpdatedUserExpense = JSON.parse(localStorage.getItem(`user_${email}`))?.expense;

    //add expense to table
    if (UpdatedUserExpense ) {
        
        const expenseTableInfo = UpdatedUserExpense.map((item, index)=>{
            return `<tr>
                     <td>${index + 1}</td>
                     <td>${item.date}</td>
                     <td>${item.amount}</td>
                     <td>${item.channel}</td>
                     <td>${item.description}</td>
                  </tr>`
            })
            expenseTable.innerHTML = expenseTableInfo.join("")
    }else{
        expenseTable.innerHTML =  `<tr>
        <td colspan="5">
        <h2>No Transaction yet</h2>
        </td>
        </tr>`
    }
    let totalExpenseValue = 0
    for (let i = 0; i < UpdatedUserExpense.length; i++) {
         totalExpenseValue += parseFloat(UpdatedUserExpense[i].amount);
    }
    totalExpense.innerHTML= totalExpenseValue
}
displayExpenseTable()
//to add the expenseForm to local storage