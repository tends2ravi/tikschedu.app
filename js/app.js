document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    // Handle OAuth callback
    if (code) {
        showAuthCode(code);
        return;
    }

    // Regular flow
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', startOAuthFlow);
    
    // Setup upload form
    document.getElementById('upload-form').addEventListener('submit', handleUpload);
    document.getElementById('video-file').addEventListener('change', showVideoPreview);
});

function startOAuthFlow() {
    // Generate TikTok OAuth URL (Replace with your client ID)
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.href);
    const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    
    window.location.href = authUrl;
}

function showVideoPreview(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('video-preview');
    
    if (file) {
        const url = URL.createObjectURL(file);
        preview.innerHTML = `
            <video controls style="max-width: 100%">
                <source src="${url}" type="${file.type}">
            </video>
        `;
    }
}

function handleUpload(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        title: document.getElementById('video-title').value,
        description: document.getElementById('video-desc').value,
        scheduleTime: document.getElementById('schedule-time').value
    };

    // Simulate upload
    document.getElementById('upload-section').style.display = 'none';
    document.getElementById('confirmation-section').style.display = 'block';
    document.getElementById('scheduled-time').textContent = 
        new Date(formData.scheduleTime).toLocaleString();
}

function showAuthCode(code) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('auth-code-section').style.display = 'block';
    document.getElementById('auth-code').textContent = code;
}

function copyCode() {
    const code = document.getElementById('auth-code').textContent;
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
}
