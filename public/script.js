async function generatePair() {
    const number = document.getElementById('number').value.trim();
    if (!number) return alert('Please enter your number');

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
        resultDiv.innerHTML = `<p>✅ Pairing code generated:</p>
                               <p style="font-size: 1.5rem; font-weight: bold;">${data.pairCode}</p>
                               <p>Send this code from your WhatsApp to link your account.</p>`;
    }
}
