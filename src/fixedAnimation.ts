export function setupFixedAnimation(wrapperList: HTMLElement[]) {
	wrapperList.forEach(wrapper => {
		const cards = Array.prototype.slice.call(wrapper.querySelectorAll('.fix-anim'));
		const distance = cards.length ? cards[0].clientWidth : 0;
		const wrapperHeight = cards.length ? (cards[0].clientHeight + distance) * (cards.length - 1) : 0;
		wrapper.style.height = wrapperHeight + 'px';
		fixCards(wrapper, cards, distance);
	});
}

function fixCards(wrapper:HTMLElement, cards:HTMLDivElement[], distance: number) {
	wrapper.style.borderBottom = '5px solid red';
	let wrapperTopPos = wrapper.getBoundingClientRect().top + window.scrollY;
	const wrapperBottomPos = wrapper.getBoundingClientRect().bottom + window.scrollY;
	const windowHeight = window.innerHeight;
	const topOffset = 50;
	wrapperTopPos -= topOffset;
	window.addEventListener('scroll', () => {
		cards.forEach((card, i) => {
			if (window.scrollY >= wrapperTopPos && window.scrollY + windowHeight < wrapperBottomPos) {
				if (getComputedStyle(card).position !== 'fixed') {
					const cachedTransform = getComputedStyle(card).transform;
					card.style.transform = '';
					const cachedRect = card.getBoundingClientRect();
					card.classList.remove('fixed-anim-ended');
					card.style.transform = cachedTransform;
					card.style.position = 'fixed';
					card.style.left = cachedRect.left + 'px';
					card.style.top = cachedRect.top + 'px';
					card.style.width = cachedRect.width + 'px';
				}
				if (window.scrollY - wrapperTopPos < distance) {
					if (i === 1 || i === 2) card.style.transform = `translateX(${window.scrollY - wrapperTopPos}px)`;
				} else if (window.scrollY - wrapperTopPos < distance * 2) {
					if (i === 1) card.style.transform = `translateX(${distance}px)`;
					if (i === 2) card.style.transform = `translateX(${window.scrollY - wrapperTopPos}px)`;
				} else if (window.scrollY - wrapperTopPos < distance * 3) {
					if (i === 2) card.style.transform = `translateX(${distance * 2}px)`;
				}

			} else if (window.scrollY + windowHeight > wrapperBottomPos) {
				if (getComputedStyle(card).position === 'fixed') {
					card.classList.add('fixed-anim-ended');
					if (i === 1) card.style.transform = `translateX(${distance}px)`;
					if (i === 2) card.style.transform = `translateX(${distance * 2}px)`;
					console.log(wrapper.clientHeight, card.clientHeight);
					card.style.position = '';
					card.style.left = '';
					card.style.top = wrapper.clientHeight - card.clientHeight + 'px';
					card.style.width = '';
				}
			} else {
				card.style.position = '';
				card.style.left = '';
				card.style.top = '';
				card.style.width = '';
				card.style.transform = '';
			}

		});
	});
}