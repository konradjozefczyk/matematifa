// Definiowanie pustych funkcji dla zdarzeń dotykowych
function noop() {}

// Ustawianie zdarzeń dotykowych jako pasywne
document.addEventListener('touchstart', noop, { passive: true })
document.addEventListener('touchmove', noop, { passive: true })

// Ustawianie zdarzenia przewijania jako pasywne
window.addEventListener('scroll', noop, { passive: true })

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

	// Pobierz wszystkie przedmioty
	const przedmioty = document.querySelectorAll('input[name=question-3]')

	// Resetuj stan przedmiotów
	przedmioty.forEach(przedmiot => {
		przedmiot.disabled = false // Odblokuj wszystkie
		przedmiot.checked = false // Odznacz wszystkie
	})

	// Pobierz wszystkie poziomy edukacji
	const poziomy = document.querySelectorAll('input[name=question-2]')

	// Resetuj stan poziomów
	poziomy.forEach(poziom => {
		poziom.disabled = false // Odblokuj wszystkie poziomy
		poziom.checked = false // Odznacz wszystkie poziomy
	})

	if (zajecia === '200') {
		// 2-osobowe
		przedmioty.forEach(przedmiot => {
			if (przedmiot.value > 3) {
				// Pozostaw aktywne tylko Matematyka, Fizyka, Chemia (wartości 1, 2, 3)
				przedmiot.disabled = true
			}
		})
	} else if (zajecia === '300') {
		// Wykład maturalny
		przedmioty.forEach(przedmiot => {
			if (przedmiot.value !== '1') {
				// Pozostaw aktywną tylko Matematykę (wartość 1)
				przedmiot.disabled = true
			}
		})

		// Zablokuj opcje "Szkoła podstawowa" i "Studia wyższe"
		poziomy.forEach(poziom => {
			if (poziom.value === '10' || poziom.value === '40') {
				poziom.disabled = true
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
	document.getElementById('change').innerHTML =
		'Cena Twoich zajęć to ' +
		cena +
		' zł. <br> Cena za zajęcia indywidualne to cena za jedną godzinę zegarową zajęć. Cena zajęć grupowych jest za cały miesiąc'
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

// Dodajemy event listener do każdego elementu w menu, aby zamknąć menu po kliknięciu
document.addEventListener('DOMContentLoaded', () => {
	var menuItems = document.querySelectorAll('#menuitems a') // Zakładam, że elementy menu to linki <a>

	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			// Sprawdź, czy szerokość ekranu jest mniejsza niż 992px (w wersji desktopowej menu nie powinno się ukrywać)
			if (window.innerWidth < 992) {
				menuOpen() // Zamknięcie menu po kliknięciu w dowolny element tylko na małych ekranach
			}
		})
	})

	// Dodajemy event listener na zmianę rozmiaru okna
	window.addEventListener('resize', () => {
		var menu = document.getElementById('menuitems')

		// Jeżeli szerokość okna jest większa lub równa 992px, pokaż menu
		if (window.innerWidth >= 992) {
			menu.style.display = 'flex' // Ustawienie 'flex' zamiast 'block', ponieważ takie jest wymaganie na desktopie
		} else {
			menu.style.display = 'none' // Na mniejszych ekranach z powrotem ukryj menu
		}
	})

	// Dodajemy event listener do kliknięcia poza menu w wersji mobilnej
	document.addEventListener('click', event => {
		var menu = document.getElementById('menuitems')
		var menuButton = document.querySelector('.bar') // Przycisk otwierający menu

		// Sprawdź, czy szerokość ekranu jest mniejsza niż 992px (czyli wersja mobilna)
		if (window.innerWidth < 992) {
			// Sprawdź, czy menu jest otwarte i czy kliknięto poza menu oraz przyciskiem otwierającym menu
			if (menu.style.display === 'block' && !menu.contains(event.target) && !menuButton.contains(event.target)) {
				menu.style.display = 'none' // Zamknij menu
			}
		}
	})
})

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

// Funkcja do obsługi wysyłania formularza
document.querySelector('.contactForm1').addEventListener('submit', function (event) {
	event.preventDefault()

	const formData = new FormData(this) // Teraz 'this' odnosi się do formularza 'contactForm1'

	fetch('send_email.php', {
		method: 'POST',
		body: formData,
	})
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

// Funkcja do wyświetlania pytania
function showQuestion(index) {
    // Ukrywa wszystkie pytania
    document.querySelectorAll('.question').forEach(el => {
        el.classList.remove('active');
    });
    // Pokazuje pytanie o danym indeksie
    const currentQuestionElement = document.querySelector(`.question[data-question="${index}"]`);
    currentQuestionElement.classList.add('active');
    
    // Ustawia fokus na pierwsze pole w bieżącym pytaniu, jeśli to drugie pytanie lub dalej
    if (index > 1) {
        const firstInput = currentQuestionElement.querySelector('input, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }
}


// Funkcja do przejścia do następnego pytania
function nextQuestion() {
	const currentElement = document.querySelector(`.question[data-question="${currentQuestion}"]`)
	const input = currentElement.querySelector('input, textarea')
	const errorSpan = input.nextElementSibling

	if (input.checkValidity()) {
		currentElement.classList.remove('active')
		currentQuestion++
		showQuestion(currentQuestion)
		if (errorSpan) {
			errorSpan.style.display = 'none' // Ukrywa komunikat o błędzie, gdy dane wejściowe są prawidłowe
		}
	} else {
		if (errorSpan) {
			errorSpan.style.display = 'block' // Pokazuje komunikat o błędzie
		}
	}
}

// Funkcja do powrotu do poprzedniego pytania
function previousQuestion() {
	const currentElement = document.querySelector(`.question[data-question="${currentQuestion}"]`)
	currentElement.classList.remove('active')
	currentQuestion--
	showQuestion(currentQuestion)
}

// Funkcja do obsługi zdarzenia naciśnięcia klawisza
function handleKeyPress(event) {
	const isTextarea = event.target.tagName === 'TEXTAREA'
	const isEnterKey = event.key === 'Enter'

	if (isEnterKey) {
		if (isTextarea) {
			// Jeśli jesteśmy w polu textarea i naciśnięto Enter, dodaj nową linię
			if (!event.shiftKey) {
				event.preventDefault() // Zapobiega domyślnemu działaniu klawisza Enter
				// Dodaj nową linię w textarea
				event.target.value += '\n'
			}
		} else {
			// Jeśli nie jesteśmy w polu textarea i naciśnięto Enter, przejdź do następnego pytania
			event.preventDefault() // Zapobiega domyślnemu działaniu klawisza Enter
			if (currentQuestion === document.querySelectorAll('.question').length) {
				// Jeśli jesteśmy na ostatnim pytaniu, kliknij przycisk Wyślij
				document.querySelector('.contactForm1').submit() // Użyj submit() zamiast requestSubmit()
			} else {
				nextQuestion()
			}
		}
	}
}

// Nasłuchiwanie na naciśnięcia klawiszy w całym formularzu
document.querySelectorAll('.question input, .question textarea').forEach(element => {
	element.addEventListener('keydown', handleKeyPress)
})

// Pokazuje pierwsze pytanie na starcie
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
	let visibleBoxes = window.innerWidth >= 992 ? 2 : 1 // Ustawienie liczby widocznych boxów na podstawie szerokości ekranu
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

	// Zaktualizuj widoczność strzałek na początku
	updateArrowsVisibility()

	// Zaktualizuj pozycję, widoczność boxów i strzałek przy zmianie rozmiaru okna
	window.addEventListener('resize', () => {
		updateBoxWidth()
		updateVisibleBoxes()
		updatePosition()
	})
})
