document.getElementById("fetchBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;

  // Map email → employee_id (replace with real mapping)
  const employeeId = "ddb0765e-733c-4f3c-8907-f1b009dbd48e";

  try {
    const res = await fetch(
      `https://nodejs-production-5a47f.up.railway.app/getSchedules?start_date=${start_date}&end_date=${end_date}&employee_id=${employeeId}`
    );
    const data = await res.json();
    document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("output").textContent = "Error: " + err;
  }
});
