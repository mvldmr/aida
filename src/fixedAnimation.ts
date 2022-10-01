export function setupFixedAnimation(wrapperList: HTMLElement[]) {
	const changeEvent = 'ontouchend' in document ? 'orientationchange' : 'resize';
	let winWidth = document.documentElement.clientWidth;
	wrapperList.forEach(wrapper => {
		const distance = getAttributeInNum(wrapper, 'data-distance');
		const cards = Array.prototype.slice.call(wrapper.querySelectorAll('.fix-anim'));
		const cardHeight = cards.length ? cards[0].clientHeight : 0;
		if (winWidth > 768) {
			wrapper.style.height = distance + cardHeight + 'px';
			wrapper.setAttribute('animation-active', 'y');
			fixCards(wrapper, cards, distance);
		}
		window.addEventListener(changeEvent, function() {
			setTimeout(function() {
				winWidth = document.documentElement.clientWidth;
				const isAnimActive = wrapper.getAttribute('animation-active') === 'y';
				if ((isAnimActive && winWidth > 768) || (!isAnimActive && winWidth < 768)) return;
				if (winWidth > 768) {
					wrapper.setAttribute('animation-active', 'y');
					wrapper.style.height = distance + cardHeight + 'px';
					fixCards(wrapper, cards, distance);
				} else {
					wrapper.removeAttribute('animation-active');
					wrapper.style.height = '';
					fixCards(wrapper, cards, distance);
				}
			}, 500);
		})
	});
}

function fixCards(wrapper:HTMLElement, cards:HTMLDivElement[], distance: number) {
	const changeEvent = 'ontouchend' in document ? 'orientationchange' : 'resize';
	const isActiveAnim = wrapper.getAttribute('animation-active') === 'y';
	const topOffset = getAttributeInNum(wrapper, 'data-top-offset');
	let startPosition = wrapper.getBoundingClientRect().top + window.scrollY;
	startPosition += topOffset;
	let endPosition = startPosition + distance;
	const windowHeight = window.innerHeight;
	let cardWidth = cards[0] ? cards[0].clientWidth : 0;

	const updateCard = () => {
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
				if (window.scrollY - startPosition < cardWidth) {
					if (i === 1 || i === 2) card.style.transform = `translateX(${window.scrollY - startPosition}px)`;
				} else if (window.scrollY - startPosition < cardWidth * 2) {
					if (i === 1) card.style.transform = `translateX(${cardWidth}px)`;
					if (i === 2) card.style.transform = `translateX(${window.scrollY - startPosition}px)`;
				} else if (window.scrollY - startPosition < cardWidth * 3) {
					if (i === 2) card.style.transform = `translateX(${cardWidth * 2}px)`;
				}

			} else if (window.scrollY + windowHeight >= endPosition) {
				if (getComputedStyle(card).position === 'fixed') {
					if (i === 1) card.style.transform = `translateX(${cardWidth}px)`;
					if (i === 2) card.style.transform = `translateX(${cardWidth * 2}px)`;
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
	}

	const updateCardDistance = () => {
		setTimeout(function() {
			if (document.documentElement.clientWidth < 768) {
				window.removeEventListener('scroll', updateCard);
				return;
			}
			cardWidth = cards[0] ? cards[0].clientWidth : 0;
			startPosition = wrapper.getBoundingClientRect().top + window.scrollY;
			startPosition += topOffset;
			endPosition = startPosition + distance;
		}, 500);
	}

	if (!isActiveAnim) {
		window.removeEventListener('scroll', updateCard);
		return;
	}
	window.removeEventListener('scroll', updateCard);
	window.addEventListener('scroll', updateCard);
	window.removeEventListener(changeEvent, updateCardDistance);
	window.addEventListener(changeEvent, updateCardDistance);
}

function getAttributeInNum(element:HTMLElement, attributeName:string) {
	const attribute = element ? element.getAttribute(attributeName) : '';
	if (attribute) return parseInt(attribute, 10);
	return 0;
}