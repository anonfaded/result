document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Normalize input values
  const studentName = document.getElementById('studentName').value
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .toUpperCase();
  const fatherName = document.getElementById('fatherName').value
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .toUpperCase();

  // Generate encoded PDF path
  const pdfName = `${studentName} ${fatherName}.pdf`;
  const pdfPath = `results/${encodeURIComponent(pdfName)}`; // Encode spaces

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
