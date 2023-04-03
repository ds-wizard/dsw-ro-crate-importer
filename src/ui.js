export function showError(message) {
    const errorDiv = document.getElementById('error')
    const errorAlert = document.getElementById('error-alert')
    errorAlert.textContent = message
    errorDiv.classList.toggle('hidden')
}
