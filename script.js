/**
 * Represents a collection of option buttons.
 * @type {NodeList}
 */
let optionsButtons = document.querySelectorAll(".option-button");

/**
 * Represents a collection of advanced option buttons.
 * @type {NodeList}
 */
let advancedOptionButton = document.querySelectorAll(".adv-option-button");

/**
 * The font name element.
 * @type {HTMLElement}
 */
let fontName = document.getElementById("fontName");

/**
 * Reference to the font size element.
 * @type {HTMLElement}
 */
let fontSizeRef = document.getElementById("fontSize");

/**
 * Reference to the text input element.
 * @type {HTMLElement}
 */
let writingArea = document.getElementById("text-input");

/**
 * Reference to the create link button.
 * @type {HTMLElement}
 */
let linkButton = document.getElementById("createLink");

/**
 * Represents a collection of alignment buttons.
 * @type {NodeList}
 */
let alignButtons = document.querySelectorAll(".align");

/**
 * Represents a collection of spacing buttons.
 * @type {NodeList}
 */
let spacingButtons = document.querySelectorAll(".spacing");

/**
 * Represents a collection of format buttons.
 * @type {NodeList}
 */
let formatButtons = document.querySelectorAll(".format");

/**
 * Represents a collection of script buttons.
 * @type {NodeList}
 */
let scriptButtons = document.querySelectorAll(".script");

/**
 * List of fonts available for selection.
 * @type {string[]}
 */
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

/**
 * Initializes the text editor by setting up the initial state and options.
 */
const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

/**
 * Modifies the text in the document using the specified command.
 *
 * @param {string} command - The command to execute.
 * @param {boolean} defaultUi - Whether or not to use the default user interface for the command.
 * @param {string} value - The value to pass to the command.
 */
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

/**
 * Adds or removes the "active" class to the specified buttons based on the needsRemoval parameter.
 *
 * @param {NodeList} className - The collection of buttons to apply the highlighter to.
 * @param {boolean} needsRemoval - Whether or not to remove the "active" class from buttons.
 */
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

/**
 * Removes the "active" class from the specified buttons.
 * @param {NodeList} className - The collection of buttons to remove the "active" class from.
 */
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = intializer();
