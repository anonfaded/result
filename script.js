document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const studentName = document.getElementById('studentName').value.trim().toUpperCase();
    const fatherName = document.getElementById('fatherName').value.trim().toUpperCase();
    const pdfName = `${studentName} ${fatherName}.pdf`;
    const pdfPath = `results/${pdfName}`;
  
    // Check if the PDF exists
    fetch(pdfPath)
      .then(response => {
        if (response.ok) {
          document.getElementById('result').innerHTML = `
            <p>Result found!</p>
            <a href="${pdfPath}" download>Download Result</a>
          `;
        } else {
          document.getElementById('result').innerHTML = `<p>Result not found.</p>`;
        }
      })
      .catch(() => {
        document.getElementById('result').innerHTML = `<p>Error searching for the result.</p>`;
      });
  });