function noop() {}
document.addEventListener('touchstart', noop, { passive: !0 })
document.addEventListener('touchmove', noop, { passive: !0 })
window.addEventListener('scroll', noop, { passive: !0 })
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
function updateSubjects() {
	const zajecia = document.querySelector('input[name=question-1]:checked').value
	const przedmioty = document.querySelectorAll('input[name=question-3]')
	przedmioty.forEach(przedmiot => {
		przedmiot.disabled = !1
		przedmiot.checked = !1
	})
	const poziomy = document.querySelectorAll('input[name=question-2]')
	poziomy.forEach(poziom => {
		poziom.disabled = !1
		poziom.checked = !1
	})
	if (zajecia === '200') {
		przedmioty.forEach(przedmiot => {
			if (przedmiot.value > 3) {
				przedmiot.disabled = !0
			}
		})
	} else if (zajecia === '300') {
		przedmioty.forEach(przedmiot => {
			if (przedmiot.value !== '1') {
				przedmiot.disabled = !0
			}
		})
		poziomy.forEach(poziom => {
			if (poziom.value === '10' || poziom.value === '40') {
				poziom.disabled = !0
			}
		})
	}
}
function cennik() {
	let var1 = document.querySelector('input[name=question-1]:checked').value
	let var2 = document.querySelector('input[name=question-2]:checked').value
	let var3 = document.querySelector('input[name=question-3]:checked').value
	console.log(var1)
	console.log(var2)
	console.log(var3)
	let cena = parseInt(var1) + parseInt(var2) + parseInt(var3)
	switch (cena) {
		case 111:
			cena = 90
			pakiet = 340
			break
		case 121:
			cena = 100
			pakiet = 380
			break
		case 131:
			cena = 110
			pakiet = 420
			break
		case 141:
			cena = 120
			pakiet = '-'
			break
		case 211:
			cena = '-'
			pakiet = 299
			break
		case 221:
			cena = '-'
			pakiet = 299
			break
		case 231:
			cena = '-'
			pakiet = 349
			break
		case 241:
			cena = '-'
			pakiet = 400
			break
		case 321:
		case 331:
			cena = '-'
			pakiet = 269
			break

		case 112:
		case 113:
		case 122:
		case 123:
		case 114:
		case 124:
			cena = 100
			pakiet = 380
			break
		case 132:
		case 133:
		case 134:
			cena = 120
			pakiet = 460
			break
		case 142:
		case 143:
		case 144:
			cena = 140
			pakiet = '-'
			break
		case 212:
		case 213:
		case 222:
		case 223:
		case 214:
		case 224:
		case 234:
		case 244:
		case 215:
		case 225:
		case 235:
		case 245:
		case 217:
		case 227:
		case 237:
		case 247:
		case 242:
		case 243:
			cena = 'Nie oferujemy'
			pakiet = 'Nie oferujemy'
			break
		case 232:
		case 233:
			cena = '-'
			pakiet = 399
			break
		case 115:
			cena = 80
			pakiet = 300
			break
		case 125:
			cena = 90
			pakiet = 340
			break
		case 135:
			cena = 100
			pakiet = 380
			break
		case 117:
		case 127:
			cena = 100
			pakiet = 380
			break
		case 137:
			cena = 120
			pakiet = 460
			break
	}
	document.getElementById('change').innerHTML =
		'Cena Twoich zajęć to ' +
		cena +
		' zł za godzinę. <br> Cena pakietu 4h to ' +
		pakiet +
		' zł. <br> 1) Cena za zajęcia indywidualne to cena za jedną godzinę zegarową zajęć.<br> 2) Zajęcia grupowe można wykupić wyłącznie w pakiecie. <br>3) Cena za zajęcia dwuosobowe jest za jednego uczestnika.'
}
window.addEventListener(
	'scroll',
	() => {
		document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight))
	},
	!1
)
function menuOpen() {
	var menu = document.getElementById('menuitems');
	if (menu.classList.contains('open')) {
		menu.style.display = 'none';
		menu.classList.remove('open');
	} else {
		menu.style.display = 'block';
		// Dodaj opóźnienie, aby umożliwić CSS transformację
		setTimeout(() => menu.classList.add('open'), 10);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	var menuItems = document.querySelectorAll('#menuitems a');
	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			if (window.innerWidth < 992) {
				menuOpen();
			}
		});
	});

	window.addEventListener('resize', () => {
		var menu = document.getElementById('menuitems');
		if (window.innerWidth >= 992) {
			menu.style.display = 'flex';
			menu.classList.add('open');
		} else {
			menu.style.display = 'none';
			menu.classList.remove('open');
		}
	});

	document.addEventListener('click', event => {
		var menu = document.getElementById('menuitems');
		var menuButton = document.querySelector('.bar');
		if (window.innerWidth < 992) {
			if (menu.classList.contains('open') && !menu.contains(event.target) && !menuButton.contains(event.target)) {
				menu.style.display = 'none';
				menu.classList.remove('open');
			}
		}
	});
});


document.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.counter')
	const options = { root: null, threshold: 0.1 }
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counter = entry.target
				const updateCount = () => {
					const target = +counter.getAttribute('data-target')
					const count = +counter.innerText
					const increment = target / 500
					if (count < target) {
						counter.innerText = Math.ceil(count + increment)
						setTimeout(updateCount, 1)
					} else {
						counter.innerText = target
					}
				}
				updateCount()
				observer.unobserve(counter)
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
	observeElements('.add')
	observeElements('.step1')
	observeElements('.step2')
	observeElements('.step3')
	observeElements('.card')
	observeElements('.benefits-bgc')
})
document.querySelectorAll('.faq-question').forEach(item => {
	item.addEventListener('click', () => {
		const faqItem = item.parentElement
		document.querySelectorAll('.faq-item').forEach(i => {
			if (i !== faqItem) {
				i.classList.remove('active')
			}
		})
		faqItem.classList.toggle('active')
	})
})
let currentQuestion = 1
document.querySelector('.contactForm1').addEventListener('submit', function (event) {
	event.preventDefault()
	const formData = new FormData(this)
	fetch('send_email.php', { method: 'POST', body: formData })
		.then(response => response.text())
		.then(data => {
			alert('Formularz został wysłany.')
			this.reset()
			currentQuestion = 1
			showQuestion(currentQuestion)
		})
		.catch(error => {
			console.error('Błąd:', error)
			alert('Wystąpił błąd. Spróbuj ponownie później.')
		})
})
function showQuestion(index) {
	document.querySelectorAll('.question').forEach(el => {
		el.classList.remove('active')
	})
	const currentQuestionElement = document.querySelector(`.question[data-question="${index}"]`)
	currentQuestionElement.classList.add('active')
	if (index > 1) {
		const firstInput = currentQuestionElement.querySelector('input, textarea')
		if (firstInput) {
			firstInput.focus()
		}
	}
}
function nextQuestion() {
	const currentElement = document.querySelector(`.question[data-question="${currentQuestion}"]`)
	const input = currentElement.querySelector('input, textarea')
	const errorSpan = input.nextElementSibling
	if (input.checkValidity()) {
		currentElement.classList.remove('active')
		currentQuestion++
		showQuestion(currentQuestion)
		if (errorSpan) {
			errorSpan.style.display = 'none'
		}
	} else {
		if (errorSpan) {
			errorSpan.style.display = 'block'
		}
	}
}
function previousQuestion() {
	const currentElement = document.querySelector(`.question[data-question="${currentQuestion}"]`)
	currentElement.classList.remove('active')
	currentQuestion--
	showQuestion(currentQuestion)
}
function handleKeyPress(event) {
	const isTextarea = event.target.tagName === 'TEXTAREA'
	const isEnterKey = event.key === 'Enter'
	if (isEnterKey) {
		if (isTextarea) {
			if (!event.shiftKey) {
				event.preventDefault()
				event.target.value += '\n'
			}
		} else {
			event.preventDefault()
			if (currentQuestion === document.querySelectorAll('.question').length) {
				document.querySelector('.contactForm1').submit()
			} else {
				nextQuestion()
			}
		}
	}
}
document.querySelectorAll('.question input, .question textarea').forEach(element => {
	element.addEventListener('keydown', handleKeyPress)
})
document.addEventListener('DOMContentLoaded', () => {
	showQuestion(currentQuestion)
})
document.addEventListener('DOMContentLoaded', () => {
	const reviewsBoxWrapper = document.querySelector('.reviews__box-wrapper')
	const reviewsBoxes = document.querySelector('.reviews__boxes')
	const leftArrow = document.querySelector('.reviews__arrow--left')
	const rightArrow = document.querySelector('.reviews__arrow--right')
	let currentIndex = 0
	let boxWidth = document.querySelector('.reviews__box').offsetWidth
	let visibleBoxes = window.innerWidth >= 992 ? 2 : 1
	let totalBoxes = document.querySelectorAll('.reviews__box').length
	let maxIndex = totalBoxes - visibleBoxes
	function updateBoxWidth() {
		boxWidth = document.querySelector('.reviews__box').offsetWidth
	}
	function updateVisibleBoxes() {
		visibleBoxes = window.innerWidth >= 992 ? 2 : 1
		maxIndex = totalBoxes - visibleBoxes
	}
	function updatePosition() {
		reviewsBoxes.style.transform = `translateX(-${currentIndex * boxWidth}px)`
		updateArrowsVisibility()
	}
	function updateArrowsVisibility() {
		if (currentIndex === 0) {
			leftArrow.style.display = 'none'
		} else {
			leftArrow.style.display = 'block'
		}
		if (currentIndex >= maxIndex) {
			rightArrow.style.display = 'none'
		} else {
			rightArrow.style.display = 'block'
		}
	}
	rightArrow.addEventListener('click', () => {
		if (currentIndex < maxIndex) {
			currentIndex += visibleBoxes
			if (currentIndex > maxIndex) currentIndex = maxIndex
			updatePosition()
		}
	})
	leftArrow.addEventListener('click', () => {
		if (currentIndex > 0) {
			currentIndex -= visibleBoxes
			if (currentIndex < 0) currentIndex = 0
			updatePosition()
		}
	})
	updateArrowsVisibility()
	window.addEventListener('resize', () => {
		updateBoxWidth()
		updateVisibleBoxes()
		updatePosition()
	})
})
