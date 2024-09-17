window.addEventListener(
	'scroll',
	() => {
		document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight))
	},
	!1
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
	var menuItems = document.querySelectorAll('#menuitems a')
	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			if (window.innerWidth < 992) {
				menuOpen()
			}
		})
	})
	window.addEventListener('resize', () => {
		var menu = document.getElementById('menuitems')
		if (window.innerWidth >= 992) {
			menu.style.display = 'flex'
		} else {
			menu.style.display = 'none'
		}
	})
	document.addEventListener('click', event => {
		var menu = document.getElementById('menuitems')
		var menuButton = document.querySelector('.bar')
		if (window.innerWidth < 992) {
			if (menu.style.display === 'block' && !menu.contains(event.target) && !menuButton.contains(event.target)) {
				menu.style.display = 'none'
			}
		}
	})
})
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
// Funkcja sprawdzająca, czy użytkownik zaakceptował pliki cookie
function checkCookieConsent() {
	return localStorage.getItem('cookieConsent')
}

// Funkcja ustawiająca zgodę lub jej brak
function setCookieConsent(consent) {
	localStorage.setItem('cookieConsent', consent)
	document.getElementById('cookie-banner').style.display = 'none'
}

// Wczytanie okienka po wejściu na stronę, jeśli zgoda nie została jeszcze udzielona
window.onload = function () {
	if (!checkCookieConsent()) {
		document.getElementById('cookie-banner').style.display = 'block'
	}
}

// Obsługa kliknięcia przycisku "Akceptuję"
document.getElementById('accept-cookies').onclick = function () {
	setCookieConsent('accepted')
}

// Obsługa kliknięcia przycisku "Odrzucam"
document.getElementById('decline-cookies').onclick = function () {
	setCookieConsent('declined')
}
// Przykład funkcji włączającej usługę, np. Google Analytics, tylko jeśli zaakceptowano ciasteczka
function enableAnalytics() {
	// Kod aktywujący Google Analytics lub inne ciasteczka śledzące
	console.log('Analytics włączone')
	// Tu możesz dodać rzeczywisty kod do integracji np. z Google Analytics
}

// Sprawdzanie zgody na ciasteczka po załadowaniu strony
window.onload = function () {
	var consent = checkCookieConsent()
	if (!consent) {
		document.getElementById('cookie-banner').style.display = 'block'
	} else if (consent === 'accepted') {
		enableAnalytics() // Włącza śledzenie tylko po akceptacji
	}
}

// Obsługa kliknięcia przycisku "Akceptuję"
document.getElementById('accept-cookies').onclick = function () {
	setCookieConsent('accepted')
	enableAnalytics() // Włącza śledzenie po akceptacji
}

// Obsługa kliknięcia przycisku "Odrzucam"
document.getElementById('decline-cookies').onclick = function () {
	setCookieConsent('declined')
	console.log('Ciasteczka zostały odrzucone') // Tu możesz np. usunąć wszystkie ciasteczka
}
function deleteCookies() {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/'
	})
}
document.getElementById('decline-cookies').onclick = function () {
	setCookieConsent('declined')
	deleteCookies() // Usuwa wszystkie istniejące ciasteczka
	console.log('Ciasteczka zostały odrzucone i usunięte')
}
