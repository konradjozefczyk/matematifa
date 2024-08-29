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
// Plik: scripts.js
document.addEventListener("DOMContentLoaded", function() {
    const options = {
        threshold: 0.2 // Jak tylko 10% elementu jest widoczne
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Przestaje obserwować po pierwszym pojawieniu
            }
        });
    }, options);

    const elements = document.querySelectorAll('.hidden');
    elements.forEach(el => observer.observe(el));
});

