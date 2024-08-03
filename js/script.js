const form = document.querySelector('.quiz-box')
const answers = Array.from(document.querySelectorAll('.answer'))
const modal = document.querySelector('.modal')
const modalInfo = modal.querySelector('p')
const modalBtn = modal.querySelector('.close-modal')

const handleQuiz = e => {
	e.preventDefault()
	const checkedAnswers = answers.filter(answer => answer.checked)
	console.log(checkedAnswers)
	const isTrue = form.value
	console.log(isTrue)
}

form.addEventListener('submit', handleQuiz)


function cennik() {
	let var1 = document.querySelector("input[name=question-1]:checked").value;
	let var2 = document.querySelector("input[name=question-2]:checked").value;
	let var3 = document.querySelector("input[name=question-3]:checked").value;
	console.log(var1);
	console.log(var2);
	console.log(var3);

	cena = parseInt(var1) + parseInt(var2) + parseInt(var3);
	document.getElementById("change").innerHTML = cena;
}
