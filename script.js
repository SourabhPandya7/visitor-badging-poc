document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('visitor-form');
    const badgeContainer = document.getElementById('badge-container');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const company = document.getElementById('company').value;
        const email = document.getElementById('email').value;
        console.log(`Submitting visitor: ${name}, ${company}, ${email}`);
        
        try {
            const response = await fetch('http://localhost:3001/api/visitor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, company, email })
            });
            const data = await response.json();
            if (data.duplicate) {
                badgeContainer.innerHTML = `<div class="badge"><h2>Duplicate Visitor</h2><p>This visitor already exists in HubSpot.</p></div>`;
            } else {
                badgeContainer.innerHTML = `<div class="badge"><h2>Visitor Badge</h2><p><strong>Name:</strong> ${name}</p><p><strong>Company:</strong> ${company}</p><p><strong>Email:</strong> ${email}</p></div>`;
            }
        } catch (err) {
            badgeContainer.innerHTML = `<div class="badge"><h2>Error</h2><p>${err.message}</p></div>`;
        }
        form.reset();
    });
});