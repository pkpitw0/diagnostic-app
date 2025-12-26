import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

/* 🔴 PASTE YOUR FIREBASE CONFIG HERE */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-i_Q8_XfSIjfTPHxgZFF6zQU6SGDQylw",
  authDomain: "diagnostics-83f7c.firebaseapp.com",
  databaseURL: "https://diagnostics-83f7c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "diagnostics-83f7c",
  storageBucket: "diagnostics-83f7c.firebasestorage.app",
  messagingSenderId: "338963278068",
  appId: "1:338963278068:web:71544b0a6aace1ccc1d6a1",
  measurementId: "G-V5KSSTWE1P"
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

