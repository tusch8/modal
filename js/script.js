/**
 * Modal
 */
const modalTriggers = document.querySelectorAll('.js-modal-trigger');
const modalContents = document.querySelectorAll('.js-modal');
const modalCloses = document.querySelectorAll('.js-modal-close');
const modalOverlay = document.querySelector('.js-modal-overlay');
const body = document.body;

const toggleModal = index => {
	modalContents[index].classList.toggle('is-open');
	modalOverlay.classList.toggle('is-open');
	body.classList.toggle('is-fixed');
}

// モーダル開く
modalTriggers.forEach((modalTrigger, index) => {
	if (modalContents.length > index) {
		modalTrigger.addEventListener('click', () => {
			toggleModal(index);
		});
	}
});

// 閉じるボタン
modalCloses.forEach((modalClose, index) => {
	if (modalContents.length > index) {
		modalClose.addEventListener('click', () => {
			toggleModal(index);
		});
	}
});

// 背景部分
modalOverlay.addEventListener('click', e => {
	modalContents.forEach(modalContent => {
		// 今開いているモーダルは何番目か
		const isOpen = modalContent.classList.contains('is-open');
		const index = [].slice.call(modalContents).indexOf(modalContent);
		if (isOpen) {
			toggleModal(index);
		}
	});
})
