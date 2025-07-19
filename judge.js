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

    if (S.length > 5000 || T.length > 5000) {
        Swal.fire({
            title: '',
            html: "文字数が多すぎます... せいぜい5000文字以下にしてください。",
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

    if (!array.includes(-1)) {
        Swal.fire({
            title: '',
            text: '正しく縮約されています!',
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

// Real-time shrink rate calculation
function updateShrinkRate() {
    const originalText = document.getElementById('original').value;
    const abridgedText = document.getElementById('abridged').value;
    const shrinkRateElement = document.getElementById('shrink-rate');
    
    if (originalText.length === 0) {
        shrinkRateElement.textContent = '現在の縮約率: 0%';
        shrinkRateElement.className = 'shrink-rate';
        return;
    }
    
    const shrinkRate = Math.floor(100 * abridgedText.length / originalText.length);
    shrinkRateElement.textContent = `現在の縮約率: ${shrinkRate}%`;
    
    // Add visual feedback based on shrink rate
    if (shrinkRate > 80) {
        shrinkRateElement.className = 'shrink-rate warning';
    } else if (shrinkRate < 50) {
        shrinkRateElement.className = 'shrink-rate success';
    } else {
        shrinkRateElement.className = 'shrink-rate';
    }
}

// Add real-time update listeners
document.getElementById('original').addEventListener('input', updateShrinkRate);
document.getElementById('abridged').addEventListener('input', updateShrinkRate);

// Initialize shrink rate on page load
updateShrinkRate();