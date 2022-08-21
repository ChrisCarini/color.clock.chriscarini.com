const DEBUG = true;

// Thanks to https://formito.com/tools/favicon
const faviconHref = emoji => {
    return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22>${emoji}</text></svg>`;
}

const changeFavicon = emoji => {
    // Ensure we have access to the document, i.e. we are in the browser.
    if (typeof window === 'undefined') return

    const link =
        window.document.querySelector("link[rel*='icon']") ||
        window.document.createElement("link")
    link.type = "image/svg+xml"
    link.rel = "shortcut icon"
    link.href = faviconHref(emoji)

    window.document.getElementsByTagName("head")[0].appendChild(link)
}

const currentEmoji = () => {
    // Add 15 minutes and round down to closest half hour
    const time = new Date(Date.now() + 15 * 60 * 1000);

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes() < 30 ? 0 : 30;

    return {
        "0.0": "🕛",
        "0.30": "🕧",
        "1.0": "🕐",
        "1.30": "🕜",
        "2.0": "🕑",
        "2.30": "🕝",
        "3.0": "🕒",
        "3.30": "🕞",
        "4.0": "🕓",
        "4.30": "🕟",
        "5.0": "🕔",
        "5.30": "🕠",
        "6.0": "🕕",
        "6.30": "🕡",
        "7.0": "🕖",
        "7.30": "🕢",
        "8.0": "🕗",
        "8.30": "🕦",
        "9.0": "🕘",
        "9.30": "🕤",
        "10.0": "🕙",
        "10.30": "🕥",
        "11.0": "🕚",
        "11.30": "🕦",
    }[`${hours}.${minutes}`]
}

const updateEmoji = () => {
    const emoji = currentEmoji();
    if (DEBUG) {
        console.log(`Setting favicon to: ${emoji}`);
    }
    changeFavicon(emoji);
}

const shift = (str) => {
    if (document.getElementById("toggleInput").checked) {
        return str;
    } else {
        return str.substring(2, str.length) + str.substring(0, 2);
    }
}

function start_canvas() {
    // Change the favicon when the page gets loaded...
    updateEmoji();

    const pickr = Pickr.create({
        el: '#colorPicker',
        container: '#body',
        theme: 'nano', // 'classic', or 'monolith', or 'nano'
        showAlways: true,
        defaultRepresentation: 'ARGB',
        autoReposition: false,
        inline: true,
        padding: 0,
        components: {
            // Main components
            preview: true,
            opacity: true,
            hue: true,
        }
    });

    setInterval(function () {
        const now = new Date();

        const seconds = parseInt(now.getTime() / 1000);
        const hexText = seconds.toString(16);
        const hexValue = shift(hexText);

        document.getElementById("hexCode").textContent = `#${hexText}`;
        document.body.style.backgroundColor = `#${hexValue}`;
        pickr.setColor(`#${hexValue}`);

        if (DEBUG) {
            console.log(`It is currently ${now.toISOString()} -> text: ${hexText} ; val: ${hexValue} (RGBA)`);
        }

        // Update the favicon
        if (now.getSeconds() === 0) {
            updateEmoji();
        }
    }, 1000);
}