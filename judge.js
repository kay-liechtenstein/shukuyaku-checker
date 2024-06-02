const judge = (S, T) => {
	let Ls = S.length;
	let Lt = T.length;
	let ind = [];
	for (let i = 0; i < Lt; i++) {
		ind.push(-1);
	}
	let track = 0;
	for (let i = 0; i < Lt; i++) {
		if (track == Ls) {
			break;
		}
		if (T[i] == S[track]) {
			ind[i] = track;
			track++;
		}
		else {
			let fixed = track;
			while (track < Ls) {
				if (T[i] == S[track]) {
					ind[i] = track;
					track++;
					break;
				}
				else {
					track++;
				}
			}
			if (track == Ls) {
				track = fixed;
			}
		}
	}
	if (ind.includes(-1)) {
		return false;
	}
	else {
		return true;
	}
}


document.getElementById('judge-button').addEventListener('click', () => {
	let S = document.getElementById('original').value;
	let T = document.getElementById('abridged').value;

	for (let i = 0; i < 10; i++) {
		let pre = String.fromCharCode(65297 + i);
		let post = String.fromCharCode(49 + i);
		S = S.replace(pre, post);
	}



	if (judge(S, T)) {
		window.alert('正しく縮約されています。');
	}
	else {
		window.alert('縮約のルールが守られていません。修正してください。')
	}
})