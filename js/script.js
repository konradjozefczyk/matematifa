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
	let var1 = document.querySelector('input[name=question-1]:checked').value
	let var2 = document.querySelector('input[name=question-2]:checked').value
	let var3 = document.querySelector('input[name=question-3]:checked').value
	console.log(var1)
	console.log(var2)
	console.log(var3)

	cena = parseInt(var1) + parseInt(var2) + parseInt(var3)
	document.getElementById('change').innerHTML = cena
}

window.addEventListener(
	'scroll',
	() => {
		document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight))
	},
	false
)

function menuOpen() {
	var menu = document.getElementById('menuitems')
	if (menu.style.display === 'block') {
		menu.style.display = 'none'
	} else {
		menu.style.display = 'block'
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.counter')

	const options = {
		root: null, // viewport
		threshold: 0.1, // uruchom, gdy 10% elementu jest widoczne
	}

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counter = entry.target
				const updateCount = () => {
					const target = +counter.getAttribute('data-target')
					const count = +counter.innerText
					const increment = target / 500 // dostosuj, aby kontrolować prędkość

					if (count < target) {
						counter.innerText = Math.ceil(count + increment)
						setTimeout(updateCount, 1) // opóźnienie między inkrementacjami
					} else {
						counter.innerText = target
					}
				}

				updateCount()
				observer.unobserve(counter) // przestań obserwować, gdy licznik się uruchomi
			}
		})
	}, options)

	counters.forEach(counter => {
		observer.observe(counter)
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const observeElements = selector => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show')
					observer.unobserve(entry.target)
				}
			})
		})

		document.querySelectorAll(selector).forEach(element => {
			observer.observe(element)
		})
	}

	observeElements('.about-us-bgc')
	observeElements('.certif-bgc')
	observeElements('.rev-bgc')
	observeElements('.offer-subject')
})

document.querySelectorAll('.faq-question').forEach(item => {
	item.addEventListener('click', () => {
		const faqItem = item.parentElement

		// Zamknij inne otwarte pytania
		document.querySelectorAll('.faq-item').forEach(i => {
			if (i !== faqItem) {
				i.classList.remove('active')
			}
		})

		// Przełącz otwieranie i zamykanie aktualnego pytania
		faqItem.classList.toggle('active')
	})
})

let currentQuestion = 1

function nextQuestion() {
	const currentElement = document.querySelector(`.question[data-question="${currentQuestion}"]`)
	const input = currentElement.querySelector('input, textarea')

	if (input.checkValidity()) {
		currentElement.classList.remove('active')
		currentQuestion++
		document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active')
	} else {
		input.nextElementSibling.style.display = 'block'
	}
}

function previousQuestion() {
	document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.remove('active')
	currentQuestion--
	document.querySelector(`.question[data-question="${currentQuestion}"]`).classList.add('active')
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
	event.preventDefault()

	const formData = new FormData(this)

	fetch('send_email.php', {
		method: 'POST',
		body: formData,
	})
		.then(response => response.text())
		.then(data => {
			alert('Formularz został wysłany.')
			this.reset()
			currentQuestion = 1
			document.querySelectorAll('.question').forEach(el => el.classList.remove('active'))
			document.querySelector('.question[data-question="1"]').classList.add('active')
		})
		.catch(error => {
			console.error('Błąd:', error)
			alert('Wystąpił błąd. Spróbuj ponownie później.')
		})
})

if (document.querySelector('.slick-slider')) {
	const script = document.createElement('script')
	script.src = '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js'
	document.head.appendChild(script)
}
