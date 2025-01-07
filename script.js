document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const studentName = document.getElementById('studentName').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const resultDiv = document.getElementById('result');

  if (!studentName || !fatherName) {
    resultDiv.textContent = "Please provide both Student Name and Father Name.";
    return;
  }

  // Combine names into a single file name
  const combinedName = `${studentName} ${fatherName}`;
  const encodedName = encodeURIComponent(combinedName); // Encode spaces as %20

  // GitHub repository details (replace as needed)
  const repoOwner = "anonfaded"; // Dynamic username input can replace this
  const repoName = "result";
  const folderPath = "results";

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

  try {
    // Fetch list of files in the results folder
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files from GitHub: ${response.statusText}`);
    }

    const files = await response.json();

    // Check for a matching file
    const matchingFile = files.find(file => {
      const fileName = file.name.toLowerCase();
      return (
        fileName === `${combinedName.toLowerCase()}.pdf` || // Match without encoding
        fileName === `${encodedName.toLowerCase()}.pdf`     // Match with encoding
      );
    });

    if (matchingFile) {
      const fileUrl = `https://${repoOwner}.github.io/${repoName}/${folderPath}/${matchingFile.name}`;
      resultDiv.innerHTML = `<a href="${fileUrl}" target="_blank">Download Result</a>`;
    } else {
      resultDiv.textContent = "No matching result found.";
    }
  } catch (error) {
    console.error(error);
    resultDiv.textContent = "An error occurred while searching. Please try again.";
  }
});
