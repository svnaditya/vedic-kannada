// Kannada Keyboard with Vedic Accents
// Base transliteration engine adapted from Lexilogos (copyright lexilogos.com),
// extended with Vedic accents, avagraha, danda and a clipboard helper.
(function() {
    const textarea = document.getElementById("bar");

    const replacements = [
        // === Vocalic R / L (ri, li) ===
        [/್-r/g, "ೃ"],
        [/-r/g, "ಋ"],
        [/ಋi/g, "ೠ"],
        [/ೃi/g, "ೄ"],

        [/್-l/g, "ೢ"],
        [/-l/g, "ಌ"],
        [/ಌi/g, "ೡ"],
        [/ೢi/g, "ೣ"],

        // === Independent vowels ===
        [/ಅa/g, "ಆ"],
        [/ಅi/g, "ಐ"],
        [/ಅu/g, "ಔ"],
        [/a/g, "ಅ"],
        [/[Aāâ]/g, "ಆ"],
        [/ಇi/g, "ಈ"],
        [/i/g, "ಇ"],
        [/[Iīî]/g, "ಈ"],
        [/ಉu/g, "ಊ"],
        [/u/g, "ಉ"],
        [/[Uūû]/g, "ಊ"],
        [/ಎe/g, "ಏ"],
        [/e/g, "ಎ"],
        [/[Eēê]/g, "ಏ"],
        [/ಒo/g, "ಓ"],
        [/o/g, "ಒ"],
        [/[Oōô]/g, "ಓ"],

        // === Virama removal / dependent vowels (matras) ===
        [/ಿಇ/g, "ೀ"],
        [/ುಉ/g, "ೂ"],
        [/ೆಎ/g, "ೇ"],
        [/ೊಒ/g, "ೋ"],

        [/್ಅ/g, "​"],
        [/​ಅ/g, "ಾ"],
        [/​ಇ/g, "ೈ"],
        [/​ಉ/g, "ೌ"],
        [/್ಆ/g, "ಾ"],
        [/್ಇ/g, "ಿ"],
        [/್ಈ/g, "ೀ"],
        [/್ಉ/g, "ು"],
        [/್ಊ/g, "ೂ"],
        [/್ಎ/g, "ೆ"],
        [/್ಏ/g, "ೇ"],
        [/್ಐ/g, "ೈ"],
        [/್ಒ/g, "ೊ"],
        [/್ಓ/g, "ೋ"],
        [/್ಔ/g, "ೌ"],

        // === Consonants ===
        [/ನ್g/g, "ಙ್"], // ng
        [/[ṅG]/g, "ಙ್"],
        [/[ñJ]/g, "ಞ್"],
        [/k/g, "ಕ್"],
        [/g/g, "ಗ್"],
        [/c/g, "ಚ್"],
        [/j/g, "ಜ್"],
        [/[TṭṬ]/g, "ಟ್"],
        [/[DḍḌ]/g, "ಡ್"],
        [/[NṇṆ]/g, "ಣ್"],
        [/t/g, "ತ್"],
        [/d/g, "ದ್"],
        [/n/g, "ನ್"],
        [/p/g, "ಪ್"],
        [/b/g, "ಬ್"],
        [/m/g, "ಮ್"],
        [/y/g, "ಯ್"],
        [/r/g, "ರ್"],
        [/l/g, "ಲ್"],
        [/[LḶḷ]/g, "ಳ್"],
        [/v/g, "ವ್"],
        [/w/g, "ವ್"],
        [/[SṣṢ]/g, "ಷ್"],
        [/s/g, "ಸ್"],
        [/[çzśŚ]/g, "ಶ್"],

        // === r and l variants (nukta forms) ===
        [/ರ್=/g, "ಱ್"],
        [/ಲ್=/g, "ೞ್"],

        // === Aspirated consonants ===
        [/ಕ್h/g, "ಖ್"],
        [/ಗ್h/g, "ಘ್"],
        [/ಚ್h/g, "ಛ್"],
        [/ಜ್h/g, "ಝ್"],
        [/ಟ್h/g, "ಠ್"],
        [/ಡ್h/g, "ಢ್"],
        [/ತ್h/g, "ಥ್"],
        [/ದ್h/g, "ಧ್"],
        [/ಪ್h/g, "ಫ್"],
        [/ಬ್h/g, "ಭ್"],
        [/ಸ್h/g, "ಶ್"],

        [/h/g, "ಹ್"],

        // === ZWS cleanup for consonants ===
        [/​ಕ/g, "ಕ"], [/​ಖ/g, "ಖ"], [/​ಗ/g, "ಗ"], [/​ಘ/g, "ಘ"], [/​ಙ/g, "ಙ"],
        [/​ಚ/g, "ಚ"], [/​ಛ/g, "ಛ"], [/​ಜ/g, "ಜ"], [/​ಝ/g, "ಝ"], [/​ಞ/g, "ಞ"],
        [/​ಟ/g, "ಟ"], [/​ಠ/g, "ಠ"], [/​ಡ/g, "ಡ"], [/​ಢ/g, "ಢ"], [/​ಣ/g, "ಣ"],
        [/​ತ/g, "ತ"], [/​ಥ/g, "ಥ"], [/​ದ/g, "ದ"], [/​ಧ/g, "ಧ"], [/​ನ/g, "ನ"],
        [/​ಪ/g, "ಪ"], [/​ಫ/g, "ಫ"], [/​ಬ/g, "ಬ"], [/​ಭ/g, "ಭ"], [/​ಮ/g, "ಮ"],
        [/​ಯ/g, "ಯ"], [/​ರ/g, "ರ"], [/​ಱ/g, "ಱ"], [/​ಲ/g, "ಲ"], [/​ಳ/g, "ಳ"],
        [/​ವ/g, "ವ"], [/​ಹ/g, "ಹ"], [/​ಶ/g, "ಶ"], [/​ಷ/g, "ಷ"], [/​ಸ/g, "ಸ"],
        [/​ೞ/g, "ೞ"], [/​ /g, " "],

        // === Anusvara ===
        [/[MṃṂṁṀ]/g, "ಂ"],
        [/​ಂ/g, "ಂ"],
        [/್ಂ/g, "ಂ"],

        // === Candrabindu ===
        [/ಂಂ/g, "ಁ"],
        [/ಁಂ/g, ""],
        [/​ಁ/g, "ಁ"],

        // === Visarga ===
        [/[HḥḤ]/g, "ಃ"],
        [/್ಃ/g, "ಃ"],
        [/​ಃ/g, "ಃ"],

        // === Nukta ===
        [/್=/g, "಼್"],
        [/=/g, "಼"],
        [/​಼/g, "಼"],

        // === Cluster: zero-width joiner / non-joiner ===
        [/x/g, "‍"],
        [/್‍/g, "‍್"],
        [/‍‍/g, "‌"],
        [/‌್/g, "‌"],

        // ==========================================
        // VEDIC ACCENTS
        // ==========================================
        [/_/g, "॒"],             // Type "_" for Anudatta
        [/​॒/g, "॒"],        // Remove invisible space before Anudatta

        [/\+/g, "॑"],             // Type "+" for Swarita
        [/​॑/g, "॑"],        // Remove invisible space before Swarita

        [/॑॑/g, "᳚"],             // Type "++" for Dirgha Swarita
        [/​᳚/g, "᳚"],        // Remove invisible space before Dirgha Swarita

        // === Punctuation & extras ===
        [/\'/g, "ಽ"],            // Avagraha
        [/\|/g, "।"],            // Danda
        [/\//g, "।"],
        [/।।/g, "॥"],            // Double Danda

        // === Numbers ===
        [/0/g, "೦"], [/1/g, "೧"], [/2/g, "೨"], [/3/g, "೩"], [/4/g, "೪"],
        [/5/g, "೫"], [/6/g, "೬"], [/7/g, "೭"], [/8/g, "೮"], [/9/g, "೯"],
    ];

    const transform = (txt) => {
        let result = txt;
        for (const [regex, replacement] of replacements) {
            result = result.replace(regex, replacement);
        }
        return result;
    };

    textarea.addEventListener("input", () => {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const scrollTop = textarea.scrollTop;
        const originalText = textarea.value;

        if (start === 0 && end === originalText.length) {
            textarea.value = transform(originalText);
            textarea.selectionStart = 0;
            textarea.selectionEnd = textarea.value.length;
        } else {
            textarea.value = transform(originalText);
            let beforeCursorOriginal = originalText.substring(0, start);
            beforeCursorOriginal = transform(beforeCursorOriginal);
            textarea.selectionStart = textarea.selectionEnd = beforeCursorOriginal.length;
        }
        textarea.scrollTop = scrollTop;
    });
})();

// Clean the text and copy it to the clipboard
function copy() {
    const textarea = document.getElementById("bar");
    let text = textarea.value;

    // Remove any leftover invisible Zero-Width Spaces before copying
    text = text.replace(/​/g, "");

    textarea.value = text;

    // Copy to clipboard
    textarea.select();
    document.execCommand("copy");

    // Show confirmation message
    const msg = document.getElementById("copymes");
    if (msg) {
        msg.style.display = "block";
        setTimeout(() => { msg.style.display = "none"; }, 2000);
    }
}
