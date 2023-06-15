/*const surveyForm = document.getElementById('surveyForm');
const submitBtn = document.getElementById('submitBtn');
const resultsDiv = document.getElementById('results');


// Add event listener to submit button
submitBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Get survey responses
  const formData = new FormData(surveyForm);
  const responses = {};
  for (let [name, value] of formData.entries()) {
    responses[name] = value;
  }

  // Analyze responses and generate recommendations
  const recommendations = analyzeResponses(responses);

  // Display results
  displayResults(responses, recommendations);
});
// Function to display survey results and recommendations
function displayResults(responses, recommendations) {
  // Generate HTML for displaying results and recommendations
  let resultsHTML = '<h2>Survey Results</h2>';
  for (let question in responses) {
    resultsHTML += '<p><strong>' + question + ':</strong> ' + responses[question] + '</p>';
  }

  resultsHTML += '<h2>Recommendations</h2>';
  if (recommendations.length == 0) {
    resultsHTML += '<ul>';
    for (let i = 0; i < recommendations.length; i++) {
      resultsHTML += '<li>' + recommendations[i] + '</li>';
    }
    resultsHTML += '</ul>';
  } else {
    resultsHTML += '<p>No recommendations available.</p>';
  }

  // Update the results div with the survey results and recommendations
  resultsDiv.innerHTML = resultsHTML;
}

function analyzeResponses(survey_responses) {
  const recommendations = [];

  // Analyze mood rating
  const mood_response = survey_responses["Rate your current mood on a scale of 1-10: "];
  if (mood_response !== undefined) {
    try {
      const mood_rating = parseInt(mood_response);
      if (mood_rating <= 3) {
        recommendations.push("Consider seeking support from a mental health professional.");
        recommendations.push("Engage in activities that bring you joy and relaxation.");
      } else if (mood_rating <= 7) {
        recommendations.push("Practice self-care activities to boost your mood.");
        recommendations.push("Consider talking to a trusted friend or family member about your feelings.");
      } else {
        recommendations.push("Continue engaging in activities that promote positive mood.");
        recommendations.push("Spread positivity and support to others.");
      }
    } catch (error) {
      recommendations.push("Invalid response for mood rating.");
    }
  }

  // Analyze stress and anxiety frequency
  const stress_frequency = survey_responses["How often do you experience stress? (Rarely/Sometimes/Often)"];
  const anxiety_frequency = survey_responses["How often do you experience anxiety? (Rarely/Sometimes/Often)"];
  if (stress_frequency !== undefined && anxiety_frequency !== undefined) {
    if (stress_frequency === "Often" || anxiety_frequency === "Often") {
      recommendations.push("Explore stress management techniques such as meditation or deep breathing exercises.");
      recommendations.push("Identify and address the root causes of your stress and anxiety.");
    } else if (stress_frequency === "Sometimes" || anxiety_frequency === "Sometimes") {
      recommendations.push("Incorporate stress-relief activities into your daily routine.");
      recommendations.push("Practice mindfulness techniques to manage stress and anxiety.");
    }
  }

  // Analyze sleep quality
  const sleep_quality = survey_responses["Rate your sleep quality on a scale of 1-10: "];
  if (sleep_quality !== undefined) {
    try {
      const sleep_quality_rating = parseInt(sleep_quality);
      if (sleep_quality_rating <= 5) {
        recommendations.push("Establish a consistent sleep schedule and create a relaxing bedtime routine.");
        recommendations.push("Avoid electronic devices and stimulating activities before bed.");
      } else if (sleep_quality_rating <= 8) {
        recommendations.push("Continue practicing good sleep hygiene habits.");
        recommendations.push("Consider using relaxation techniques to improve sleep quality.");
      }
    } catch (error) {
      recommendations.push("Invalid response for sleep quality.");
    }
  }

  // ... (Add more recommendations based on specific survey responses)

  return recommendations;
}*/

const cardContainer = document.querySelector('.card-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

let currentCardIndex = 0;
const cards = Array.from(cardContainer.querySelectorAll('.card'));
const lastCardIndex = cards.length - 1;

// Show the first card, hide the rest
cards.forEach((card, index) => {
  if (index === currentCardIndex) {
    card.style.display = 'block';
  } else {
    card.style.display = 'none';
  }
});

// Function to show the current card
function showCard(index) {
  cards.forEach((card, cardIndex) => {
    if (cardIndex === index) {
      card.classList.add('flip');
      card.style.display = 'block';
    } else {
      card.classList.remove('flip');
      card.style.display = 'none';
    }
  });
}



// Event listener for the Next button
nextBtn.addEventListener('click', () => {
  if (currentCardIndex < lastCardIndex) {
    currentCardIndex++;
    showCard(currentCardIndex);
    cardContainer.children[currentCardIndex].classList.add('card-flip'); // Add this line to trigger flip animation
  
  }

  // Show/hide buttons based on current card index
  if (currentCardIndex === lastCardIndex) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  }
  prevBtn.style.display = 'block';
});

// Event listener for the Previous button
prevBtn.addEventListener('click', () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    showCard(currentCardIndex);
    cardContainer.children[currentCardIndex].classList.add('card-flip'); // Add this line to trigger flip animation
  }

  // Show/hide buttons based on current card index
  if (currentCardIndex === 0) {
    prevBtn.style.display = 'none';
  }
  nextBtn.style.display = 'block';
  submitBtn.style.display = 'none';
});

//after Submit
var submitButtonClicked = false;
document.getElementById("submitBtn").addEventListener("click", function(event) {
  event.preventDefault();
  submitButtonClicked = true; 
  document.getElementById("recommendationsSection").style.display = "block";// Prevent the form from submitting
  generateRecommendations();
});

// Question 1
var ratingOptionsQuestion1 = document.querySelectorAll('.rating-n.question1 li');
var selectedRatingQuestion1;

ratingOptionsQuestion1.forEach(function(option) {
  option.addEventListener('click', function() {
    ratingOptionsQuestion1.forEach(function(opt) {
      opt.classList.remove('selected');
    });
    this.classList.add('selected');
    selectedRatingQuestion1 = this.querySelector('span').innerText; 
    if (submitButtonClicked) {
      generateRecommendations();
    }
  });
});



// Question 4
var ratingOptionsQuestion4 = document.querySelectorAll('.rating-n.question4 li');
var selectedRatingQuestion4 ;
ratingOptionsQuestion4.forEach(function(option) {
  option.addEventListener('click', function() {
    ratingOptionsQuestion4.forEach(function(opt) {
      opt.classList.remove('selected');
    });
    this.classList.add('selected');
    selectedRatingQuestion4 = this.querySelector('span').innerText;
    if (submitButtonClicked) {
      generateRecommendations();
    }
  });
});


var stressOptions = document.querySelectorAll('.card2 .option');
var anxietyOptions = document.querySelectorAll('.card3 .option');
var supportOptions = document.querySelectorAll('.card7 .option');
var selectedStressOption;
var selectedAnxietyOption;
var selectedSupportOption;

stressOptions.forEach(function(option) {
  option.addEventListener('click', function() {
    selectedStressOption = this.textContent;
    if (submitButtonClicked) {
      generateRecommendations();
    }
  });
});


anxietyOptions.forEach(function(option) {
  option.addEventListener('click', function() {
    selectedAnxietyOption = this.textContent;
    if (submitButtonClicked) {
      generateRecommendations();
    }
  });
});

supportOptions.forEach(function(option) {
  option.addEventListener('click', function() {
    selectedSupportOption = this.textContent;
    if (submitButtonClicked) {
      generateRecommendations();
    }
  });
});
var recommendations = [];
var prevButton = document.getElementById("prevBtn");
var nextButton = document.getElementById("nextBtn");
var sub=document.getElementById("submitBtn");
function generateRecommendations() {
  // Get the user's responses from the survey questions
  if (!submitButtonClicked) {
    return; // Return early if the submit button hasn't been clicked
  }

  recommendations = []; 
  var moodRating = parseInt(selectedRatingQuestion1);
  var sleepQualityRating = parseInt(selectedRatingQuestion4);
  var stressLevel = selectedStressOption;
  var anxietyLevel = selectedAnxietyOption;
  var supportNetwork = selectedSupportOption;
   // Generate recommendations based on the user's responses
   
   if (!selectedRatingQuestion1 || !selectedRatingQuestion4 || !selectedStressOption || !selectedAnxietyOption || !selectedSupportOption) {
    return; // Return early if any option is missing
  }
  if (moodRating >= 4) {
    recommendations.push("Engage in activities that bring you joy and uplift your mood, such as going for a walk in nature, listening to your favorite music, or spending time with loved ones.");
  } else {
    recommendations.push("Explore relaxation techniques to improve your mood, such as practicing deep breathing exercises, trying out yoga or meditation, or indulging in a hobby you enjoy.");
  }
  
  // Recommendation logic for sleep quality rating
  if (sleepQualityRating >= 4) {
    recommendations.push("Maintain a consistent sleep schedule and create a relaxing bedtime routine. Consider incorporating soothing activities before bed, such as reading a book, taking a warm bath, or listening to calming music.");
  } else {
    recommendations.push("Improve your sleep hygiene practices for better sleep. Establish a regular sleep routine, create a comfortable sleep environment, and limit exposure to electronic devices before bedtime.");
  }
  //Recommendation Logic for stressLevel rating
  switch (stressLevel) {
    case "Rarely":
      recommendations.push("Continue practicing stress management techniques for overall well-being. Find healthy ways to unwind and manage stress, such as engaging in regular physical exercise, practicing mindfulness, or pursuing hobbies that bring you joy.");
      break;
    case "Sometimes":
      recommendations.push("Explore stress-reducing activities such as meditation, deep breathing exercises, or engaging in creative outlets like painting or writing. Consider setting aside dedicated time for relaxation and self-care.");
      break;
    case "Often":
      recommendations.push("Consider seeking professional support or therapy to manage stress. A trained therapist can provide guidance and tools to help you cope with stress more effectively. Additionally, prioritize self-care activities and reach out to trusted friends or family for support.");
      break;
    default:
      break;
  }
  
  // Recommendation logic for anxiety level
  switch (anxietyLevel) {
    case "Rarely":
      recommendations.push("Incorporate relaxation techniques to reduce anxiety, such as deep breathing exercises, progressive muscle relaxation, or guided imagery. Practice self-care and engage in activities that bring you peace and tranquility.");
      break;
    case "Sometimes":
      recommendations.push("Try incorporating mindfulness practices to manage anxiety. Practice being present in the moment, engage in activities that promote mindfulness, such as yoga or meditation, and consider journaling your thoughts and feelings.");
      break;
    case "Often":
      recommendations.push("Consider seeking therapy or counseling for anxiety management. A mental health professional can provide strategies and support to help you better cope with anxiety. Prioritize self-care, maintain a healthy lifestyle, and reach out to your support network for assistance.");
      break;
    default:
      break;
  }
  
  // Recommendation logic for support network
  if (supportNetwork === "No") {
    recommendations.push("Explore ways to expand your support network, such as joining social groups or clubs that align with your interests, attending community events, or participating in volunteer activities. Building meaningful connections can provide valuable support in challenging times.");
  } else if (supportNetwork === "Yes") {
    recommendations.push("Nurture and maintain your existing support network. Reach out to your loved ones, friends, or colleagues, and make time for meaningful connections. Sharing your thoughts and feelings with a trusted support system can provide comfort and help you navigate through difficult moments.");
  }

  var lastCard = document.getElementById("lastcard");
  var recommendationsSection = document.getElementById("recommendationsSection");

  lastcard.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";
  sub.style.display="none";
  recommendationsSection.style.display = "block";

  toprint(recommendations);
   
}
function toprint(recommendations)
{
  var recommendationsSection = document.getElementById("recommendationsSection");
   recommendationsSection.innerHTML = "<h3>Recommendations</h3><ul><li>" + recommendations.join("</li><li>") + "</li></ul>";
}

