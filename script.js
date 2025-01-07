// Confetti Animation Function
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti');
  document.body.appendChild(confettiContainer);

  // More vibrant and varied colors
  const colors = [
    '#3498db', // bright blue
    '#2ecc71', // green
    '#e74c3c', // red
    '#f1c40f', // yellow
    '#9b59b6', // purple
    '#1abc9c'  // turquoise
  ];
  
  // Increase number of confetti pieces and add more randomness
  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    
    // More dynamic randomization
    const angle = Math.random() * 360;
    const velocity = Math.random() * 2 + 1;
    const size = Math.random() * 15 + 5;
    
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    // Add rotation and perspective for more 3D effect
    confetti.style.transform = `rotate(${angle}deg)`;
    
    // Stagger animations
    confetti.style.animationDuration = `${3 + Math.random()}s`;
    
    confettiContainer.appendChild(confetti);
  }

  // Remove confetti after animation
  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 6000);
}

document.getElementById('searchForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const studentName = document.getElementById('studentName').value.trim();
  const fatherName = document.getElementById('fatherName').value.trim();
  const resultDiv = document.getElementById('result');

  // Clear previous results and reset styles
  resultDiv.innerHTML = '';
  resultDiv.classList.remove('show');

  // Validation with bilingual error messages
  if (!studentName || !fatherName) {
    resultDiv.innerHTML = `
      <div>🚫 Please provide both Student Name and Father's Name</div>
      <div>براہ کرم طالب علم کا نام اور والد کا نام درج کریں</div>
    `;
    resultDiv.style.color = 'var(--error-color)';
    resultDiv.classList.add('show');
    return;
  }

  // Combine names into possible formats
  const combinedName1 = `${studentName} ${fatherName}`;
  const combinedName2 = `${fatherName} ${studentName}`;
  const encodedName1 = encodeURIComponent(combinedName1); // Encode spaces as %20
  const encodedName2 = encodeURIComponent(combinedName2); // Encode spaces as %20

  // GitHub repository details (replace as needed)
  const repoOwner = "anonfaded"; // Dynamic username input can replace this
  const repoName = "result";
  const folderPath = "results";

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

  try {
    // Show loading state with bilingual text
    resultDiv.innerHTML = `
      <div>🔄 Searching for your certificate...</div>
      <div>آپ کے سرٹیفکیٹ کی تلاش جاری ہے...</div>
    `;
    resultDiv.style.color = 'var(--primary-color)';
    resultDiv.classList.add('show');

    // Fetch list of files in the results folder
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files from GitHub: ${response.statusText}`);
    }

    const files = await response.json();

    // Check for a matching file in both combinations
    const matchingFile = files.find(file => {
      const fileName = file.name.toLowerCase();
      return (
        // Match with original space and encoded space (both combinations)
        fileName === `${combinedName1.toLowerCase()}.pdf` || 
        fileName === `${encodedName1.toLowerCase()}.pdf` ||
        fileName === `${combinedName2.toLowerCase()}.pdf` || 
        fileName === `${encodedName2.toLowerCase()}.pdf`
      );
    });

    if (matchingFile) {
      // PDF found - provide download link with bilingual text
      // Trigger celebration animation
      createConfetti();

      resultDiv.innerHTML = `
        <div>🎉 Certificate Found!</div>
        <div>سرٹیفکیٹ مل گیا!</div>
        <a href="${matchingFile.download_url}" target="_blank">
          Download PDF 📄 / پی ڈی ایف ڈاؤن لوڈ کریں
        </a>
      `;
    } else {
      // No matching PDF with bilingual message
      resultDiv.innerHTML = `
        <div>🔍 No results found. Please check the names and try again.</div>
        <div>کوئی نتیجہ نہیں ملا۔ براہ کرم نام چیک کریں اور دوبارہ کوشش کریں۔</div>
      `;
      resultDiv.style.color = 'var(--error-color)';
    }
  } catch (error) {
    // Error handling with bilingual message
    resultDiv.innerHTML = `
      <div>❌ Error: ${error.message}. Please try again later.</div>
      <div>غلطی: ${error.message}۔ براہ کرم بعد میں دوبارہ کوشش کریں۔</div>
    `;
    resultDiv.style.color = 'var(--error-color)';
    console.error('Result search error:', error);
  } finally {
    // Ensure result is visible
    resultDiv.classList.add('show');
  }
});
