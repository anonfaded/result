document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Normalize the input values: trim, replace multiple spaces, and lowercase
  const studentName = document.getElementById('studentName').value
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .toLowerCase();
  const fatherName = document.getElementById('fatherName').value
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .toLowerCase();

  // Generate the normalized PDF name
  const pdfName = `${studentName} ${fatherName}.pdf`.toLowerCase();
  const pdfPath = `results/${encodeURIComponent(pdfName)}`; // Encode spaces and special characters

  // Check if the PDF exists
  fetch(pdfPath, { method: 'HEAD' }) // Use HEAD to check if the file exists without downloading it
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
