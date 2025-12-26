import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
const db = getDatabase(app);

// FORM SUBMIT LOGIC
document.getElementById("testForm").addEventListener("submit", function(e){
  e.preventDefault();

  let patient = {
    name: document.getElementById("patientName").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    hemoglobin: document.getElementById("hemoglobin").value,
    sugar: document.getElementById("sugar").value,
    cholesterol: document.getElementById("cholesterol").value,
    date: new Date().toLocaleString()
  };

  // SAVE DATA ONLINE
  push(ref(db, "patients"), patient);

  // GENERATE REPORT
  document.getElementById("report").innerHTML = `
    <h3>Diagnostic Report</h3>
    <p><b>Name:</b> ${patient.name}</p>
    <p><b>Age:</b> ${patient.age}</p>
    <p><b>Gender:</b> ${patient.gender}</p>
    <p><b>Hemoglobin:</b> ${patient.hemoglobin}</p>
    <p><b>Blood Sugar:</b> ${patient.sugar}</p>
    <p><b>Cholesterol:</b> ${patient.cholesterol}</p>
    <p><b>Date:</b> ${patient.date}</p>
  `;
});
