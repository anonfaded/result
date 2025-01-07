document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get and normalize input values
  const studentName = document.getElementById('studentName').value.trim().toUpperCase();
  const fatherName = document.getElementById('fatherName').value.trim().toUpperCase();

  // Fetch the list of filenames from the JSON file
  fetch('results/files.json')
      .then(response => response.json())
      .then(files => {
          // Try to find a matching file
          const matchedFile = files.find(file => {
              // Split the filename to extract student and father names
              const [fileStudentName, fileFatherNameWithExt] = file.split(' ');
              const fileFatherName = fileFatherNameWithExt.replace('.pdf', '').toUpperCase();

              // Compare input values with the current file's names
              return (
                  fileStudentName.toUpperCase() === studentName &&
                  fileFatherName.toUpperCase() === fatherName
              );
          });

          // Show the result based on the match
          if (matchedFile) {
              const pdfPath = `results/${encodeURIComponent(matchedFile)}`;
              document.getElementById('result').innerHTML = `
                  <p>Result found!</p>
                  <a href="${pdfPath}" download>Download Result</a>
              `;
          } else {
              document.getElementById('result').innerHTML = `<p>Result not found.</p>`;
          }
      })
      .catch(error => {
          console.error('Error fetching files:', error);
          document.getElementById('result').innerHTML = `<p>Error searching for the result.</p>`;
      });
});
