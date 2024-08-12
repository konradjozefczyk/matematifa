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
