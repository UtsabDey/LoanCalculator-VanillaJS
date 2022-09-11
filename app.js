document.getElementById("loan-form").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById('loading').style.display = "block";

    document.getElementById('results').style.display = "none";

    setTimeout(calculateResults, 2000);

});

function calculateResults(e) {

    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = ( monthly * calculatedPayments).toFixed(2); 
        totalInterest.value = (( monthly * calculatedPayments) - principle).toFixed(2); 

        document.getElementById('loading').style.display = "none";

        document.getElementById('results').style.display = "block";
    }
    else {
        showError('Check your number');
    }
}

function showError(error) {
    document.getElementById('loading').style.display = "none";

    document.getElementById('results').style.display = "none";

    const errorDiv = document.createElement('div');
    errorDiv.className = "alert alert-danger";

    errorDiv.appendChild(document.createTextNode(error));

    const cardBody = document.querySelector('.card-body');
    const heading = document.querySelector('.heading');

    cardBody.insertBefore(errorDiv, heading);
    setTimeout(clearError, 4000);
}

function clearError() {
    document.querySelector('.alert').remove();
}