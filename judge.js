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
        } else {
            let fixed = track;
            while (track < Ls) {
                if (T[i] == S[track]) {
                    ind[i] = track;
                    track++;
                    break;
                } else {
                    track++;
                }
            }
            if (track == Ls) {
                track = fixed;
            }
        }
    }
    return !ind.includes(-1);
}

document.getElementById('judge-button').addEventListener('click', () => {
    let S = document.getElementById('original').value;
    let T = document.getElementById('abridged').value;

    if (judge(S, T)) {
        Swal.fire({
            title: '',
            text: '正しく縮約されています。',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: '',
            text: '縮約のルールが守られていません。修正してください。',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
