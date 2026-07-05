/* ============================================
   1 Rep Max Calculator - JavaScript Logic
   ============================================ */

/**
 * Calculate 1 Rep Max using multiple formulas
 * Sources:
 * - Brzycki: Weight × (36 / (37 - Reps))
 * - Epley: Weight × (1 + Reps / 30)
 * - Lander: (100 × Weight) / (101.3 - 2.67123 × Reps)
 * - Lombardi: Weight × Reps^0.10
 * - Adams: Weight / (1.0278 - 0.0278 × Reps)
 */

function calculateOneRepMax() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseFloat(document.getElementById('reps').value);
    const unit = document.getElementById('unit').value;

    // Validate inputs
    if (!weight || !reps || weight <= 0 || reps <= 0) {
        alert('Please enter valid weight and reps');
        return;
    }

    if (reps > 100) {
        alert('Number of reps should be 100 or less');
        return;
    }

    // Calculate 1RM using different formulas
    const brzycki = calculateBrzycki(weight, reps);
    const epley = calculateEpley(weight, reps);
    const lander = calculateLander(weight, reps);
    const lombardi = calculateLombardi(weight, reps);
    const adams = calculateAdams(weight, reps);

    // Calculate average
    const average = (brzycki + epley + lander + lombardi + adams) / 5;

    // Display results
    displayResults(brzycki, epley, lander, lombardi, adams, average, unit);
}

/**
 * Brzycki Formula
 * Most commonly used formula
 * Formula: Weight × (36 / (37 - Reps))
 */
function calculateBrzycki(weight, reps) {
    return weight * (36 / (37 - reps));
}

/**
 * Epley Formula
 * Popular and reliable
 * Formula: Weight × (1 + Reps / 30)
 */
function calculateEpley(weight, reps) {
    return weight * (1 + reps / 30);
}

/**
 * Lander Formula
 * Good for 2-10 reps
 * Formula: (100 × Weight) / (101.3 - 2.67123 × Reps)
 */
function calculateLander(weight, reps) {
    return (100 * weight) / (101.3 - 2.67123 * reps);
}

/**
 * Lombardi Formula
 * Power law based
 * Formula: Weight × Reps^0.10
 */
function calculateLombardi(weight, reps) {
    return weight * Math.pow(reps, 0.1);
}

/**
 * Adams Formula
 * Alternative method
 * Formula: Weight × (Reps / 30 + 1) / (1.0278 - 0.0278 × Reps)
 */
function calculateAdams(weight, reps) {
    return (weight * (reps / 30 + 1)) / (1.0278 - 0.0278 * reps);
}

/**
 * Display the calculated results
 */
function displayResults(brzycki, epley, lander, lombardi, adams, average, unit) {
    // Format the results to 1 decimal place
    document.getElementById('brzycki').textContent = formatResult(brzycki, unit);
    document.getElementById('epley').textContent = formatResult(epley, unit);
    document.getElementById('lander').textContent = formatResult(lander, unit);
    document.getElementById('lombardi').textContent = formatResult(lombardi, unit);
    document.getElementById('adams').textContent = formatResult(adams, unit);
    document.getElementById('average').textContent = formatResult(average, unit);

    // Show the results section
    document.getElementById('results').style.display = 'block';

    // Scroll to results
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

/**
 * Format the result with unit
 */
function formatResult(value, unit) {
    return `${value.toFixed(1)} ${unit}`;
}

/**
 * Allow Enter key to trigger calculation
 */
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"], select');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateOneRepMax();
            }
        });
    });

    // Example values on load (optional - remove if not needed)
    // document.getElementById('weight').value = '225';
    // document.getElementById('reps').value = '5';
});
