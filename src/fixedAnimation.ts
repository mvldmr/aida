export function setupFixedAnimation(wrapperList: HTMLElement[]) {
	wrapperList.forEach(wrapper => {
		const distance = getAttributeInNum(wrapper, 'data-distance');
		const cards = Array.prototype.slice.call(wrapper.querySelectorAll('.fix-anim'));
		const cardHeight = cards.length ? cards[0].clientHeight : 0;
		wrapper.style.height = distance + cardHeight + 'px';
		fixCards(wrapper, cards, distance);
	});
}

function getAttributeInNum(element:HTMLElement, attributeName:string) {
	const attribute = element ? element.getAttribute(attributeName) : '';
	console.log(attribute, attributeName);
	if (attribute) return parseInt(attribute, 10);
	return 0;
}

function fixCards(wrapper:HTMLElement, cards:HTMLDivElement[], distance: number) {
	const topOffset = getAttributeInNum(wrapper, 'data-top-offset');
	let startPosition = wrapper.getBoundingClientRect().top + window.scrollY;
	startPosition += topOffset;
	const endPosition = startPosition + distance;
	const windowHeight = window.innerHeight;
	const firstCard = wrapper.querySelector('.fix-anim');
	const cardDistance = firstCard ? firstCard.clientWidth : 0;
	window.addEventListener('scroll', () => {
		cards.forEach((card, i) => {
			if (window.scrollY >= startPosition && window.scrollY < endPosition) {
				if (getComputedStyle(card).position !== 'fixed') {
					const cachedTransform = getComputedStyle(card).transform;
					card.style.transform = '';
					const cachedRect = card.getBoundingClientRect();
					card.style.transform = cachedTransform;
					card.style.position = 'fixed';
					card.style.left = cachedRect.left + 'px';
					card.style.top = cachedRect.top + 'px';
					card.style.width = cachedRect.width + 'px';
				}
				if (window.scrollY - startPosition < cardDistance) {
					if (i === 1 || i === 2) card.style.transform = `translateX(${window.scrollY - startPosition}px)`;
				} else if (window.scrollY - startPosition < cardDistance * 2) {
					if (i === 1) card.style.transform = `translateX(${cardDistance}px)`;
					if (i === 2) card.style.transform = `translateX(${window.scrollY - startPosition}px)`;
				} else if (window.scrollY - startPosition < cardDistance * 3) {
					if (i === 2) card.style.transform = `translateX(${cardDistance * 2}px)`;
				}

			} else if (window.scrollY + windowHeight >= endPosition) {
				if (getComputedStyle(card).position === 'fixed') {
					if (i === 1) card.style.transform = `translateX(${cardDistance}px)`;
					if (i === 2) card.style.transform = `translateX(${cardDistance * 2}px)`;
					card.style.position = '';
					card.style.left = '';
					card.style.top = distance + 'px';
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