/**
 * Modal
 */
const modal = () => {
	const modalTriggers = document.querySelectorAll('.js-modal-trigger');
	const modalContents = document.querySelectorAll('.js-modal');
	const body = document.body;

	// モーダル部分をbody直下に移動
	modalContents.forEach(modalContent => {
		modalContent.remove();
		body.appendChild(modalContent);
	});

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

				// 開いているモーダルがあれば閉じる
				modalContents.forEach(modalContent => {
					// 今開いているモーダルは何番目か
					const isOpen = modalContent.classList.contains('is-open');
					const index = [].slice.call(modalContents).indexOf(modalContent);
					if (isOpen) {
						toggleModal(index);
					}
				});

				// モーダル開く
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

	// モーダルの領域以外かつ、モーダルのトリガー以外をクリックしたとき、モーダル閉じる
	document.addEventListener('click', e => {
		if (!e.target.closest('.js-modal') && (e.target.className !== 'js-modal-trigger')) {
			modalContents.forEach((modalContent, index) => {
				const isOpen = modalContent.classList.contains('is-open');
				if (isOpen) {
					toggleModal(index);
				}
			});
		}
	});


	
	// 以下グループ化するとき
	const groupList = [];
	const modalGroups = document.querySelectorAll('[data-modal-group]');
	const modalPrevs = document.querySelectorAll('.js-modal-prev');
	const modalNexts = document.querySelectorAll('.js-modal-next');

	modalGroups.forEach(modalGroup => {
		const groupName = modalGroup.getAttribute('data-modal-group');
		if (groupList[groupName] == null) {
			groupList[groupName] = [];
		}
		groupList[groupName].push(groupName); // グループ別の配列にグループ名をセット

		const num = groupList[groupName].length - 1; // 何個目か(1つ目を0にするため1を引く)
		modalGroup.setAttribute('data-modal-num', num); // ナンバリングする
	});

	const switchModal = (e, type) => {
		let thisBtn = e.currentTarget;
		let currentGroupName = thisBtn.closest('.js-modal').getAttribute('data-modal-group');
		let currentNum = Number(thisBtn.closest('.js-modal').getAttribute('data-modal-num'));
		let maxNum = Number(document.querySelectorAll('[data-modal-group="' + currentGroupName + '"]').length - 1);

		thisBtn.closest('.js-modal').classList.remove('is-open'); // 現在のモーダルを閉じる

		// 前へボタン
		if (type === 'prev') {
			if (currentNum === 0) { // ひとつめは最後のを表示する
				document.querySelector('[data-modal-group="' + currentGroupName + '"][data-modal-num="' + maxNum + '"]').classList.add('is-open');
			} else { // それ以外はひとつ前を表示
				document.querySelector('[data-modal-group="' + currentGroupName + '"][data-modal-num="' + (currentNum - 1) + '"]').classList.add('is-open');
			}
		}

		// 次へボタン
		if (type === 'next') {
			if (currentNum === maxNum) { // 最後はひとつめを表示する
				document.querySelector('[data-modal-group="' + currentGroupName + '"][data-modal-num="' + 0 + '"]').classList.add('is-open');
			} else { // それ以外はひとつ次を表示
				document.querySelector('[data-modal-group="' + currentGroupName + '"][data-modal-num="' + (currentNum + 1) + '"]').classList.add('is-open');
			}
		}
	}

	modalPrevs.forEach(modalPrev => {
		modalPrev.addEventListener('click', e => {
			switchModal(e, 'prev');
		});
	});

	modalNexts.forEach(modalNext => {
		modalNext.addEventListener('click', e => {
			switchModal(e, 'next');
		});
	});

}

modal();
