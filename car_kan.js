// Kannada Keyboard with Vedic Accents (Custom Implementation)
(function() {
    const textarea = document.getElementById("bar");

    const replacements = [
        // 1. Independent Vowels
        [/a/g, "ಅ"],
        [/[AāĀ]/g, "ಆ"],
        [/i/g, "ಇ"],
        [/[IīĪ]/g, "ಈ"],
        [/u/g, "ಉ"],
        [/[UūŪ]/g, "ಊ"],
        [/ಅಅ/g, "ಆ"],
        [/ಇಇ/g, "ಈ"],
        [/ಉಉ/g, "ಊ"],
        [/e/g, "ಎ"],
        [/ಎಎ/g, "ಏ"],
        [/[EēĒ]/g, "ಏ"],
        [/ai/g, "ಐ"],
        [/ಅಇ/g, "ಐ"],
        [/o/g, "ಒ"],
        [/ಒಒ/g, "ಓ"],
        [/[OōŌ]/g, "ಓ"],
        [/au/g, "ಔ"],
        [/ಅಉ/g, "ಔ"],

        // 2. Virama (Halant) and Dependent Vowels (Matras)
        // \u0CCD is the Kannada Virama (್)
        // \u200b is the Zero Width Space used to hold the place for matras
        [/್ಅ/g, "\u200b"],
        [/\u200bಅ/g, ""], 
        [/\u200bಆ/g, "ಾ"],
        [/\u200bಇ/g, "ಿ"],
        [/\u200bಈ/g, "ೀ"],
        [/\u200bಉ/g, "ು"],
        [/\u200bಊ/g, "ೂ"],
        [/\u200bಎ/g, "ೆ"],
        [/\u200bಏ/g, "ೇ"],
        [/\u200bಐ/g, "ೈ"],
        [/\u200bಒ/g, "ೊ"],
        [/\u200bಓ/g, "ೋ"],
        [/\u200bಔ/g, "ೌ"],

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

// 3. Consonants
        [/n/g, "ನ್"],
        [/k/g, "ಕ್"],
        [/g/g, "ಗ್"],
        [/c/g, "ಚ್"],
        [/j/g, "ಜ್"],
        [/[TṭṬ]/g, "ಟ್"],
        [/[DḍḌ]/g, "ಡ್"],
        [/[NṇṆ]/g, "ಣ್"],
        [/t/g, "ತ್"],
        [/d/g, "ದ್"],
        [/p/g, "ಪ್"],
        [/b/g, "ಬ್"],
        [/m/g, "ಮ್"],
        [/y/g, "ಯ್"],
        [/r/g, "ರ್"],
        [/l/g, "ಲ್"],
        [/[LḷḶ]/g, "ಳ್"],
        [/v/g, "ವ್"],
        [/w/g, "ವ್"],
        [/[SṣṢ]/g, "ಷ್"],
        [/s/g, "ಸ್"],
        [/[çzśŚ]/g, "ಶ್"],
        [/[GṅṄ]/g, "ಙ್"],
        [/[JñÑ]/g, "ಞ್"],
        // Notice 'h' has been removed from here!

        // 4. Aspirated Consonants
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

        [/h/g, "ಹ್"], // 'h' is now safely at the end of the combinations!

        // Vocalic R / L
        [/-r/g, "ಋ"],
        [/ಋi/g, "ಋ"], 
        [/್ಋ/g, "ೃ"],
        [/-l/g, "ಌ"],
        [/ಌi/g, "ಌ"], 
        [/್ಌ/g, "ೢ"],

        // 5. Cleanup for basic consonants
        [/\u200bಕ/g, "ಕ"], [/\u200bಖ/g, "ಖ"], [/\u200bಗ/g, "ಗ"], [/\u200bಘ/g, "ಘ"], [/\u200bಙ/g, "ಙ"],
        [/\u200bಚ/g, "ಚ"], [/\u200bಛ/g, "ಛ"], [/\u200bಜ/g, "ಜ"], [/\u200bಝ/g, "ಝ"], [/\u200bಞ/g, "ಞ"],
        [/\u200bಟ/g, "ಟ"], [/\u200bಠ/g, "ಠ"], [/\u200bಡ/g, "ಡ"], [/\u200bಢ/g, "ಢ"], [/\u200bಣ/g, "ಣ"],
        [/\u200bತ/g, "ತ"], [/\u200bಥ/g, "ಥ"], [/\u200bದ/g, "ದ"], [/\u200bಧ/g, "ಧ"], [/\u200bನ/g, "ನ"],
        [/\u200bಪ/g, "ಪ"], [/\u200bಫ/g, "ಫ"], [/\u200bಬ/g, "ಬ"], [/\u200bಭ/g, "ಭ"], [/\u200bಮ/g, "ಮ"],
        [/\u200bಯ/g, "ಯ"], [/\u200bರ/g, "ರ"], [/\u200bಲ/g, "ಲ"], [/\u200bವ/g, "ವ"], [/\u200bಶ/g, "ಶ"],
        [/\u200bಷ/g, "ಷ"], [/\u200bಸ/g, "ಸ"], [/\u200bಹ/g, "ಹ"], [/\u200bಳ/g, "ಳ"], [/\u200b /g, " "],

        // 6. Anusvara, Visarga, & Candrabindu
        [/[MṃṂṁṀ]/g, "ಂ"],      // Type "M" for Anusvara
        [/\u200bಂ/g, "ಂ"],      // Snaps Anusvara to the letter

        [/ಂಂ/g, "ಁ"],           // Type "MM" for Candrabindu
        [/\u200bಁ/g, "ಁ"],      // Snaps Candrabindu to the letter

        [/[HḥḤ]/g, "ಃ"],        // Type "H" for Visarga
        [/\u200bಃ/g, "ಃ"],      // Snaps Visarga to the letter

        // ==========================================
        // 7. VEDIC ACCENTS 
        // ==========================================
        [/_/g, "॒"],       // Type "_" for Anudatta
        [/\u200b॒/g, "॒"],  // FIX: Removes invisible space before Anudatta

        [/\+/g, "॑"],       // Type "+" for Swarita
        [/\u200b॑/g, "॑"],  // FIX: Removes invisible space before Swarita

        [/॑॑/g, "᳚"],        // Type "++" for Dirgha Swarita
        [/\u200b᳚/g, "᳚"],   // FIX: Removes invisible space before Dirgha Swarita

        // 8. Punctuation & Extras
        [/\'/g, "ಽ"],      // Avagraha
        [/\|/g, "।"],      // Danda
        [/\//g, "।"],
        [/।।/g, "॥"],     // Double Danda
        [/x/g, "\u200d"],  // Zero width joiner for half consonants
        [/\u200d\u200d/g, "\u200c"], // Zero width non-joiner

        // 9. Numbers
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

    textarea.addEventListener("input", (e) => {
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

// Function to clean the text and copy it to clipboard
function copy() {
    const textarea = document.getElementById("bar");
    let text = textarea.value;

    // Remove any leftover invisible Zero-Width Spaces before copying
    const cleanReplacements = [
        [/\u200b/g, ""] 
    ];

    for (const [regex, replacement] of cleanReplacements) {
        text = text.replace(regex, replacement);
    }

    textarea.value = text;
    
    // Copy to clipboard
    textarea.select();
    document.execCommand("copy");
    
    // Show confirmation message
    const msg = document.getElementById("copymes");
    if(msg) {
        msg.style.display = "block";
        setTimeout(() => { msg.style.display = "none"; }, 2000);
    }
}