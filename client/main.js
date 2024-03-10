const questionSection = document.getElementById("info-section");
const anserSection = document.getElementById("answer-section");
const optionSection = document.getElementById("options");
let loginForm = document.getElementById("ai-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let category = document.getElementById("category");

    if (category.value == "") {
        alert("Ensure you input a value in both fields!");
    } else {
        // perform operation with form input
        // async function getJoke() {
        await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "category": category.value
            })

        })
            .then((response) => response.text())
            .then((data) => createLayout(data))
            .catch((error) => console.log('data couldnt load: ' + error))
    }
    console.log(
        `This form has a username of ${category.value}`
    );

    category.value = "";
});


    function createLayout(data) {
    // console.log(data);
    let text = JSON.parse(data);
    const content = JSON.parse(text.kwargs.content);
    content.questions.forEach(function(item) {
       let questionBox = document.createElement("div");
       console.log(item);
       //here question box
       questionBox.classList.add("question-box");
       // questionBox.innerHTML = localStorage.getItem("key");
       questionSection.appendChild(questionBox);

       //here question
        localStorage.setItem("key", item.title )
       let question = document.createElement("p");
       question.innerHTML = localStorage.getItem("key");
       questionBox.appendChild(question);

       // here anwser box
        let answerBox = document.createElement("div");
        answerBox.classList.add("answer-box");
        questionBox.appendChild(answerBox);

        let selectedOptions = document.createElement("select");
        answerBox.appendChild(selectedOptions);
       item.choices.forEach(function (choice) {
           let optionValue = document.createElement("option");
           optionValue.innerHTML = choice;
           selectedOptions.appendChild(optionValue);
           console.log("this" + choice);
       })
        const checkButton  = document.createElement("button");
        checkButton.id = "checkButtonId"
        checkButton.innerHTML = "check anwser";
        questionBox.appendChild(checkButton);
    });

    let check = document.querySelectorAll("#checkButtonId");
    for(let i=0; i<= check.length; i++) {
        check[i].addEventListener('click', function checkAnswer()  {
            //check answer
            // const correctAnswerIndex = questionData.answer;
            //
            // if (userChoice === correctAnswerIndex) {
            //     console.log('Correct! You chose the right answer.');
            // } else {
            //     console.log('Incorrect. Please try again.');
            // }
        })
    }
}

// }
// })
// async function getJoke() {
//     await fetch('http://localhost:8000/chat', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//
//     })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log('data couldnt load: ' + error))
// }

// getJoke();
