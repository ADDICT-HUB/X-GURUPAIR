async function generatePair() {
    const number = document.getElementById('number').value.trim();
    if (!number) return alert('Please enter your WhatsApp number');

    const res = await fetch('/generate-pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number })
    });

    const data = await res.json();
    const resultDiv = document.getElementById('result');

    if (data.error) {
        resultDiv.innerHTML = `<p style="color:red">${data.error}</p>`;
    } else {
        resultDiv.innerHTML = `
            <p>✅ Pairing code generated:</p>
            <div class="code-container">
                <input type="text" id="pairCode" value="${data.pairCode}" readonly>
                <button onclick="copyCode()">Copy Code</button>
            </div>
            <p>Send this code via WhatsApp to your bot to link your account.</p>
        `;
    }
}

function copyCode() {
    const codeInput = document.getElementById('pairCode');
    codeInput.select();
    codeInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Pairing code copied!');
}
