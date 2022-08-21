// Register the service worker
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        navigator.serviceWorker.register('serviceworker.js').then(value => {
            console.log('[😎] Service worker registered!', value);
        }, reason => {
            console.log('[😥] Service worker registration failed: ', reason);
        });
    });
}

/**
 * Check if the we are inside the installed application.
 * @returns {boolean|boolean} `true` if inside installed PWA, `false` otherwise.
 */
function insideInstalledApp() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true;
}
