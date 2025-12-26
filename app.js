/************* FIREBASE IMPORTS *************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

/************* FIREBASE CONFIG (PASTE YOUR OWN) *************/
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

/************* INITIALIZE FIREBASE *************/
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/************* PDF LIBRARY *************/
const { jsPDF } = window.jspdf;

/************* FORM SUBMIT *************/
document.getElementById("cbcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const patient = {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    hb: document.getElementById("hb").value,
    rbc: document.getElementById("rbc").value,
    wbc: document.getElementById("wbc").value,
    platelets: document.getElementById("platelets").value,
    pcv: document.getElementById("pcv").value,
    mcv: document.getElementById("mcv").value,
    mch: document.getElementById("mch").value,
    mchc: document.getElementById("mchc").value,
    date: new Date().toLocaleString()
  };

  /************* SAVE TO FIREBASE *************/
  push(ref(db, "cbcReports"), patient);

  /************* GENERATE PDF *************/
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("DIAGNOSTIC LABORATORY", 60, 15);
  doc.setFontSize(12);
  doc.text("Complete Blood Picture (CBC)", 65, 25);
  doc.line(10, 30, 200, 30);

  doc.text(`Patient Name: ${patient.name}`, 10, 40);
  doc.text(`Age: ${patient.age}`, 10, 48);
  doc.text(`Gender: ${patient.gender}`, 10, 56);
  doc.text(`Date: ${patient.date}`, 10, 64);

  doc.line(10, 70, 200, 70);

  let y = 80;
  doc.text("Hemoglobin (g/dL):", 10, y); doc.text(patient.hb, 90, y); y += 8;
  doc.text("RBC (million/µL):", 10, y); doc.text(patient.rbc, 90, y); y += 8;
  doc.text("WBC (/µL):", 10, y); doc.text(patient.wbc, 90, y); y += 8;
  doc.text("Platelets (lakhs):", 10, y); doc.text(patient.platelets, 90, y); y += 8;
  doc.text("PCV (%):", 10, y); doc.text(patient.pcv, 90, y); y += 8;
  doc.text("MCV (fL):", 10, y); doc.text(patient.mcv, 90, y); y += 8;
  doc.text("MCH (pg):", 10, y); doc.text(patient.mch, 90, y); y += 8;
  doc.text("MCHC (%):", 10, y); doc.text(patient.mchc, 90, y);

  doc.line(10, y + 10, 200, y + 10);
  doc.text("Authorized Signatory", 140, y + 25);

  doc.save(`${patient.name}_CBC_Report.pdf`);
});
