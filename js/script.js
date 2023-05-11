/**
 * Modal
 */
const modal = () => {
	const modalTriggers = document.querySelectorAll('.js-modal-trigger');
	const modalContents = document.querySelectorAll('.js-modal');
	const body = document.body;

	// 背景部分生成
	const modalOverlay = document.createElement('div');
	modalOverlay.classList.add('overlay');
	body.appendChild(modalOverlay);

	// モーダル開閉
	const toggleModal = index => {
		modalContents[index].classList.toggle('is-open');
		modalOverlay.classList.toggle('is-open');
		body.classList.toggle('is-fixed');
	}

	modalTriggers.forEach((modalTrigger, index) => {

		// モーダル開く
		if (modalContents.length > index) {
			modalTrigger.addEventListener('click', () => {
				toggleModal(index);
			});
		}

		// 閉じるボタン生成とモーダル閉じるイベント
		const modalClose = document.createElement('div');
		modalClose.classList.add('close');
		modalContents[index].appendChild(modalClose);
		modalClose.addEventListener('click', () => {
			toggleModal(index);
		});

	});

	// 背景部分クリックでモーダル閉じる
	modalOverlay.addEventListener('click', () => {
		modalContents.forEach(modalContent => {
			// 今開いているモーダルは何番目か
			const isOpen = modalContent.classList.contains('is-open');
			const index = [].slice.call(modalContents).indexOf(modalContent);
			if (isOpen) {
				toggleModal(index);
			}
		});
	})
}

modal();
