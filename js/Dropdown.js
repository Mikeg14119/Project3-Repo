// Function to populate the dropdown with Calling_Umpire values
function populateDropdown() {
  // Fetch the play_information.json data
  fetch('json_data/play_information.json')
    .then(response => response.json())
    .then(data => {
      const umpires = [...new Set(data.map(entry => entry.Calling_Umpire))]; // Update the field name to Calling_Umpire1
      const dropdown = document.getElementById('callingUmpireDropdown'); // Update the dropdown ID
      umpires.forEach(umpire => {
        const option = document.createElement('option');
        option.value = umpire;
        option.textContent = umpire;
        dropdown.appendChild(option);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Call the function when the page is loaded
window.addEventListener('DOMContentLoaded', populateDropdown);

// Function to calculate and display the review statistics for the selected umpire
function calculateStatistics(selectedUmpire) {
  // Fetch the review_outcome_information.json data
  fetch('json_data/review_outcome_information.json')
    .then(response => response.json())
    .then(reviewData => {
      // Fetch the play_information.json data
      fetch('json_data/play_information.json')
        .then(response => response.json())
        .then(playData => {
          const filteredReviews = reviewData.filter(reviewEntry =>
            playData.some(playEntry =>
              playEntry.Replay_Review_Num === reviewEntry.Replay_Review_Num &&
              playEntry.Calling_Umpire === selectedUmpire
            )
          );
          const totalReviews = filteredReviews.length;
          const overturnedReviews = filteredReviews.filter(entry => entry.Replay_Official_Ruling === 'OVERTURNED').length;
          const confirmedReviews = filteredReviews.filter(entry => entry.Replay_Official_Ruling === 'CONFIRMED').length;
          const standsReviews = filteredReviews.filter(entry => entry.Replay_Official_Ruling === 'STANDS').length;

          const replayReviewsElement = document.getElementById('replayReviews');
          replayReviewsElement.textContent = totalReviews;

          const overturnedPercentageElement = document.getElementById('overturnedPercentage');
          const overturnedPercentage = totalReviews === 0 ? 0 : (overturnedReviews / totalReviews) * 100;
          overturnedPercentageElement.textContent = overturnedPercentage.toFixed(2) + '%';
          
          const confirmedPercentageElement = document.getElementById('confirmedPercentage');
          const confirmedPercentage = totalReviews === 0 ? 0 : (confirmedReviews / totalReviews) * 100;
          confirmedPercentageElement.textContent = confirmedPercentage.toFixed(2) + '%';
          
          const standsPercentageElement = document.getElementById('standsPercentage');
          const standsPercentage = totalReviews === 0 ? 0 : (standsReviews / totalReviews) * 100;
          standsPercentageElement.textContent = standsPercentage.toFixed(2) + '%';
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

// Call the function when the dropdown value changes
document.getElementById('callingUmpireDropdown').addEventListener('change', function() {
  const selectedUmpire = this.value;
  calculateStatistics(selectedUmpire);
});

// Call the function when the page is loaded
window.addEventListener('DOMContentLoaded', populateDropdown);