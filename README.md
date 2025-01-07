# Student Result Finder

## Overview
A web application designed to help students quickly find their PDF results by searching with their name and father's name. The application uses GitHub as a backend storage solution for result PDFs.

## Features
- Simple, user-friendly interface
- Search results by student and father's name
- Dynamic PDF retrieval from GitHub repository
- Responsive design that works on desktop and mobile devices

## Project Structure
- `index.html`: Main HTML file with search form
- `style.css`: Responsive styling for the application
- `script.js`: Core JavaScript functionality for result searching
- `results/`: Directory for storing result PDFs (on GitHub)

## How to Use
1. Enter the student's name in the first input field
2. Enter the student's father's name in the second input field
3. Click "Search" to find the corresponding PDF result
4. The application will automatically retrieve and display the matching PDF

## Technical Details
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend Storage: GitHub Repository
- API: GitHub Contents API for file retrieval
- Search Method: Case-insensitive name matching with multiple name format support

## Setup and Deployment
1. Clone the repository
2. Ensure PDFs are uploaded to the `results/` directory in the GitHub repository
3. Update `script.js` with your GitHub repository details:
   - `repoOwner`: Your GitHub username
   - `repoName`: Repository name containing results
   - `folderPath`: Path to the results directory

## Limitations
- Requires internet connection to fetch PDFs
- Depends on consistent naming of PDF files
- Limited to searching within a single GitHub repository


