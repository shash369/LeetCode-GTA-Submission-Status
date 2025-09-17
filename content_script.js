// content_script.js
(() => {
    const api = typeof browser !== 'undefined' ? browser : chrome;

    const TRIGGER_KEYWORDS = [
        "wrong answer", "runtime error", "time limit exceeded",
        "memory limit exceeded", "compile error", "output limit exceeded",
        "runtime error (exited)", "error"
    ];
    const ACCEPTED_KEYWORDS = ["accepted", "accepted ✅"];

    let triggered = false;
    let lastSeenText = null;

    let currentAudio = null;
    let autoHideTimeout = null;

    // A more reliable way to check for context validity
    function isContextValid() {
        return typeof api !== 'undefined' && api.runtime && api.runtime.id;
    }

    function textContainsAny(str, keywords) {
        if (!str) return false;
        const lower = str.toLowerCase();
        return keywords.some(k => lower.includes(k));
    }

    function createOverlay(type) {
        if (!isContextValid()) return null;
        const existingOverlay = document.getElementById(`gta-${type}-overlay`);
        if (existingOverlay) return existingOverlay;

        const overlay = document.createElement("div");
        overlay.id = `gta-${type}-overlay`;
        try {
            const imgUrl = api.runtime.getURL(`assets/${type}.png`);
            overlay.innerHTML = `
                <div id="gta-${type}-center">
                    <img id="gta-${type}-img" src="${imgUrl}" alt="${type.toUpperCase()}" onerror="this.style.display='none'">
                </div>
            `;
        } catch (e) {
            console.error("Failed to get resource URL. Extension context may be invalidated.", e);
            return null;
        }
        
        document.documentElement.appendChild(overlay);
        return overlay;
    }

    function showOverlayAndPlayAudio(type) {
        if (triggered || !isContextValid()) return;
        triggered = true;

        if (autoHideTimeout) {
            clearTimeout(autoHideTimeout);
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }

        hideOverlayAndResetState();

        let overlay = createOverlay(type);
        if (!overlay) {
            triggered = false; // Reset if overlay creation fails
            return;
        }
        overlay.classList.add(`gta-${type}-show`);
        
        const audioUrl = api.runtime.getURL(`assets/${type}.mp3`);
        currentAudio = new Audio(audioUrl);
        currentAudio.play().catch((e) => {
            console.debug(`GTA ${type} audio blocked by autoplay policy:`, e);
        });
        
        autoHideTimeout = setTimeout(() => {
            hideOverlayAndResetState();
            triggered = false;
        }, 9000);
    }
    
    function hideOverlayAndResetState() {
        const existingOverlays = document.querySelectorAll("[id^='gta-']");
        existingOverlays.forEach(overlay => {
            overlay.classList.remove("gta-wasted-show", "gta-success-show");
        });

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
    }

    function findSubmissionText() {
        const selectors = [
            '[data-e2e-locator="submission-result"]',
            '[data-e2e-locator="console-result"]',
            'h3.flex.items-center.text-xl.font-semibold',
            ".result__3Qe", ".status-content", ".submission-result",
            ".submission-status", ".ant-message", ".submission-state-text",
            '[data-cy="submission-status"]',
            'div.flex.items-center.gap-2 h3'
        ];

        for (const sel of selectors) {
            const el = document.querySelector(sel);
            if (el && el.innerText) {
                const t = el.innerText.trim();
                if (t.length) return t;
            }
        }
        return null;
    }

    function handleSubmissionResult() {
        if (!isContextValid()) {
            console.error("Extension context invalidated. Stopping script.");
            // Gracefully stop all operations
            observer.disconnect();
            clearInterval(periodicCheck);
            return;
        }
        
        const txt = findSubmissionText();
        
        if (!txt && lastSeenText) {
            triggered = false;
            lastSeenText = null;
            return;
        }

        if (!txt || txt === lastSeenText) return;
        
        lastSeenText = txt;

        if (textContainsAny(txt, ACCEPTED_KEYWORDS)) {
            showOverlayAndPlayAudio("success");
        } else if (textContainsAny(txt, TRIGGER_KEYWORDS)) {
            showOverlayAndPlayAudio("wasted");
        }
    }

    const observer = new MutationObserver(() => {
        try {
            handleSubmissionResult();
        } catch (e) {
            console.error("gta-wasted observer error", e);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    const periodicCheck = setInterval(() => {
        try {
            handleSubmissionResult();
        } catch (e) {
            console.error("gta-wasted periodic check error", e);
        }
    }, 1500);

    setTimeout(handleSubmissionResult, 1500);

    // Final safety cleanup on page unload
    window.addEventListener('beforeunload', () => {
        observer.disconnect();
        clearInterval(periodicCheck);
    });
})();