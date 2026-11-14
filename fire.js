// Select all student rows
const rows = document.querySelectorAll("#studentRows tr");

// Select dashboard elements
const highest = document.querySelector("#highest");
const average = document.querySelector("#average");
const message = document.querySelector("#message");

// Function to calculate grade
function getGrade(total) {
  if (total >= 70) {
    return "A";
  } else if (total >= 60) {
    return "B";
  } else if (total >= 50) {
    return "C";
  } else if (total >= 46) {
    return "D";
  } else if (total >= 40) {
    return "E";
  } else {
    return "F";
  }
}

// Main calculator function
function calculateResults() {
  let totals = [];

  rows.forEach((row) => {
    const scores = row.querySelectorAll(".score");
    const totalCell = row.querySelector(".total");
    const gradeCell = row.querySelector(".grade");

    let total = 0;
    let valid = true;

    scores.forEach((input) => {
      const value = input.value.trim();
      const score = value === "" ? 0 : Number(value);
      const maximum = Number(input.max);

      if (!Number.isFinite(score) || score < 0 || score > maximum) {
        valid = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#d5deea";
        total += score;
      }
    });

    // Display total immediately
    totalCell.textContent = total;

    // Display grade immediately
    const grade = getGrade(total);
    gradeCell.textContent = grade;

    // Add valid results to statistics
    if (valid) {
      totals.push(total);
    }
  });

  // Calculate highest score and class average
  if (totals.length > 0) {
    highest.textContent = Math.max(...totals);

    const sum = totals.reduce((a, b) => a + b, 0);

    average.textContent = (sum / totals.length).toFixed(1);
  } else {
    highest.textContent = 0;
    average.textContent = "0.0";
  }

  message.textContent = "Your results are calculated automatically.";
}

// Listen for score input changes
document.querySelectorAll(".score").forEach((input) => {
  input.addEventListener("input", calculateResults);
});

// Run calculator when page opens
calculateResults();
