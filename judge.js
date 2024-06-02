const original_indices = (S, T) => {
    let Ls = S.length;
    let Lt = T.length;
    let ind = [];
    for (let i = 0; i < Lt; i++) {
        ind.push(-1);
    }
    let track = 0;
    for (let i = 0; i < Lt; i++) {
        if (track === Ls) {
            break;
        }
        if (T[i] === S[track]) {
            ind[i] = track;
            track++;
        } else {
            let fixed = track;
            while (track < Ls) {
                flag = false;
                if (T[i] === S[track]) {
                    ind[i] = track;
                    track++;
                    flag = true;
                    break;
                }
                else {
                    track++;
                }
            }
            if (track === Ls && flag === false) {
                track = fixed;
            }
        }
    }
    return ind;
}

document.getElementById('judge-button').addEventListener('click', () => {
    let S = document.getElementById('original').value;
    let T = document.getElementById('abridged').value;

    console.log("Original text:", S);
    console.log("Abridged text:", T);

    if (S.length === 0 || T.length === 0) {
        Swal.fire({
            title: '',
            html: "何でもいいので入力してください...",
            icon: 'warning',
            confirmButtonText: 'OK',
            customClass: 'swal-wide'
        });
        return;
    }

    let array = original_indices(S, T);

    let problems = [];
    for (let i = 0; i < T.length; i++) {
        if (array[i] == -1) {
            problems.push(i + 1);
        }
    }

    console.log("Problems:", problems);

    let shrinkRate = Math.floor(100 * T.length / S.length);
    document.getElementById('shrink-rate').textContent = `現在の縮約率: ${shrinkRate}%`;

    if (!array.includes(-1)) {
        Swal.fire({
            title: '',
            text: '正しく縮約されています...!',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: 'swal-wide'
        });
    } else {
        let message = '縮約のルールが守られていません。<br>次の文字には、対応する元テキストの文字が存在しません：<br><br>';
        for (let i = 0; i < problems.length; i++) {
            message += problems[i].toString() + '番目の文字: ' + T[problems[i] - 1] + '<br>';
        }
        Swal.fire({
            title: '',
            html: message,
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: 'swal-wide'
        });
    }
});
