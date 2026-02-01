const zodiacSigns = [
    { name: "Capricorn", start: "01-01", end: "01-19" },
    { name: "Aquarius", start: "01-20", end: "02-18" },
    { name: "Pisces", start: "02-19", end: "03-20" },
    { name: "Aries", start: "03-21", end: "04-19" },
    { name: "Taurus", start: "04-20", end: "05-20" },
    { name: "Gemini", start: "05-21", end: "06-20" },
    { name: "Cancer", start: "06-21", end: "07-22" },
    { name: "Leo", start: "07-23", end: "08-22" },
    { name: "Virgo", start: "08-23", end: "09-22" },
    { name: "Libra", start: "09-23", end: "10-22" },
    { name: "Scorpio", start: "10-23", end: "11-21" },
    { name: "Sagittarius", start: "11-22", end: "12-21" },
    { name: "Capricorn", start: "12-22", end: "12-31" }
];

function getZodiac(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // Simple string comparison works because formats are MM-DD
    for (const sign of zodiacSigns) {
        if (dateStr >= sign.start && dateStr <= sign.end) {
            return sign.name;
        }
    }
    return "Unknown";
}

function getMoonPhase(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 3) {
        year--;
        month += 12;
    }

    ++month;

    let c = 365.25 * year;
    let e = 30.6 * month;
    let jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    let b = parseInt(jd); // integer part of jd
    jd -= b; // fractional part of jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

    switch (b) {
        case 0: return "New Moon";
        case 1: return "Waxing Crescent";
        case 2: return "First Quarter";
        case 3: return "Waxing Gibbous";
        case 4: return "Full Moon";
        case 5: return "Waning Gibbous";
        case 6: return "Last Quarter";
        case 7: return "Waning Crescent";
        default: return "Unknown";
    }
}

function calculateAge() {
    const userInput = document.getElementById("date-input");
    const resultDisplay = document.getElementById("result");
    const extraInfoDisplay = document.getElementById("extra-info");
    const preciseAgeDisplay = document.getElementById("precise-age");

    // Clear previous
    resultDisplay.innerHTML = "";
    resultDisplay.className = "";
    extraInfoDisplay.innerHTML = "";
    preciseAgeDisplay.innerHTML = "";

    if (!userInput.value) {
        resultDisplay.textContent = "Please select a date of birth.";
        resultDisplay.classList.add("error");
        return;
    }

    const birthDate = new Date(userInput.value);
    // Set birth time to midnight local time for 'day' calculation, 
    // but for 'precise' seconds we assume birth was start of that day.
    const today = new Date();

    if (birthDate > today) {
        resultDisplay.textContent = "Date of birth cannot be in the future.";
        resultDisplay.classList.add("error");
        return;
    }

    // Precise Age Calculation
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    let hours = today.getHours() - birthDate.getHours();
    let minutes = today.getMinutes() - birthDate.getMinutes();
    let seconds = today.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) {
        minutes--;
        seconds += 60;
    }
    if (minutes < 0) {
        hours--;
        minutes += 60;
    }
    if (hours < 0) {
        days--;
        hours += 24;
    }
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Display Main Result (Years)
    resultDisplay.innerHTML = `You are <span>${years}</span> years old.`;
    resultDisplay.classList.add("success");

    // Display Precise Age
    preciseAgeDisplay.innerHTML = `
        <div class="precise-item"><span>${months}</span> Months</div>
        <div class="precise-item"><span>${days}</span> Days</div>
        <div class="precise-item"><span>${hours}</span> Hours</div>
        <div class="precise-item"><span>${minutes}</span> Minutes</div>
        <div class="precise-item"><span>${seconds}</span> Seconds</div>
    `;

    // Calculate Totals
    const diffTime = today - birthDate;
    const totalSeconds = Math.floor(diffTime / 1000);
    const totalMinutes = Math.floor(diffTime / (1000 * 60));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    const totalMonths = (years * 12) + months;

    const totalsGrid = document.getElementById("totals-grid");
    if (!totalsGrid) {
        // Create if doesn't exist (safety) but we will add to HTML
    } else {
        totalsGrid.innerHTML = `
            <div class="total-card">
                <h3>Total Months</h3>
                <p>${totalMonths.toLocaleString()}</p>
            </div>
            <div class="total-card">
                <h3>Total Weeks</h3>
                <p>${totalWeeks.toLocaleString()}</p>
            </div>
            <div class="total-card">
                <h3>Total Days</h3>
                <p>${totalDays.toLocaleString()}</p>
            </div>
            <div class="total-card">
                <h3>Total Minutes</h3>
                <p>${totalMinutes.toLocaleString()}</p>
            </div>
        `;
    }

    // Display Extra Info
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDay = daysOfWeek[birthDate.getDay()];
    const zodiac = getZodiac(birthDate);
    const moon = getMoonPhase(birthDate);

    extraInfoDisplay.innerHTML = `
        <div class="info-card">
            <h3>Born On</h3>
            <p>${bornDay}</p>
        </div>
        <div class="info-card">
            <h3>Zodiac</h3>
            <p>${zodiac}</p>
        </div>
        <div class="info-card">
            <h3>Moon Phase</h3>
            <p>${moon}</p>
        </div>
    `;
}
