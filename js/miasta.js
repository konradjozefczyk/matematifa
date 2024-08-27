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