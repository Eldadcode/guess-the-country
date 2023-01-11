// fetch('countries.json')
//   .then(response => response.json())
//   .then(data => {
//     const countries = data;
//     const countryList = document.getElementById('country-list');

//     countries.forEach(country => {
//       const li = document.createElement('li');
//       const img = document.createElement('img');
//       img.src = country.flag;
//       li.appendChild(img);
//       li.appendChild(document.createTextNode(country.name + ' - ' + country.capital));
//       countryList.appendChild(li);
//     });
//   })
//   .catch(error => console.error('Error:', error));

const memorizeButton = document.getElementById('memorize-button');

memorizeButton.addEventListener('click', startQuiz);

function startQuiz() {
  fetch('countries.json')
    .then(response => response.json())
    .then(data => {
      const countries = data;
      
      // random index to select a random country
      const randomIndex = Math.floor(Math.random() * countries.length);
      const randomCountry = countries[randomIndex];
      // creating the question element 
      const question = document.createElement('p');
      question.innerHTML = `Which country is this flag from?`;
      
      // flag image element
      const flagImg = document.createElement('img');
      flagImg.src = randomCountry.flag;
      flagImg.width = '200';
      flagImg.height = '120';

      // creating the form element
      const form = document.createElement('form');
      form.id = 'quizContainer';

      // creating the answer choices
      const choices = document.createElement('div');
      // creating the answer choices radio buttons
      countries.forEach(country => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = country.name;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(country.name));
        choices.appendChild(label);
      });
      
      // creating a submit button
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.innerHTML = 'Submit';

      // add all the element to form
      form.appendChild(question);
      form.appendChild(flagImg);
      form.appendChild(choices);
      form.appendChild(submitButton);

      // add event listener to form submit
      form.addEventListener('submit', event => {
        event.preventDefault();
        checkAnswer(randomCountry.name);
      });
      
      // add the form to the body
      document.body.appendChild(form);
    })
    .catch(error => console.error('Error:', error));
}

// function to check if the answer is correct
function checkAnswer(correctAnswer) {
  const answer = document.querySelector('input[name="answer"]:checked').value;
  if (answer === correctAnswer) {
    alert('Correct!');
  } else {
    alert('Incorrect. The correct answer is ' + correctAnswer);
  }
}