function calculateEMI() {
  const amount = Number(document.getElementById("amount")?.value);
  const rate = Number(document.getElementById("rate")?.value);
  const years = Number(document.getElementById("years")?.value);

  if (!amount || !rate || !years) {
    const result = document.getElementById("emiResult");
    if (result) result.innerText = "Please enter all values.";
    return;
  }

  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  const emi =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  document.getElementById("emiResult").innerText =
    "Estimated Monthly EMI: ₹" + emi.toFixed(2);
}

function toggleFaq(id) {
  const item = document.getElementById(id);

  if (item.style.display === "block") {
    item.style.display = "none";
  } else {
    item.style.display = "block";
  }
}

/* Capture customer details and send to Genesys Digital Tracking */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("customerInfoForm");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value.trim();
    const customerEmail = document.getElementById("customerEmail").value.trim();
    const customerPhone = document.getElementById("customerPhone").value.trim();
    const loanType = document.getElementById("loanType").value;
    const customerQuestion = document.getElementById("customerQuestion").value.trim();

    if (!customerName || !customerEmail || !customerPhone) {
      document.getElementById("submitResult").innerText =
        "Please enter name, email, and phone.";
      return;
    }

    /*
      Genesys Predictive Engagement / Digital Tracking custom event.
      This sends customer details as custom attributes.
    */
    if (typeof ac === "function") {
      ac("record", "customer_details_submitted", {
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        loanType: loanType,
        customerQuestion: customerQuestion,
        currentPage: window.location.href
      });

      document.getElementById("submitResult").innerText =
        "Customer details submitted and sent to Genesys tracking.";
    } else {
      document.getElementById("submitResult").innerText =
        "Customer details submitted, but Genesys tracking object is not loaded.";
    }
  });
});