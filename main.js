/**
 * Created by Kevin on 01/12/2017.
 */

// sends message when user presses enter
document.getElementById("userInput")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            var inputField = $('#userInput');
            var input = inputField.val();

            // print msg and clear input field
            printMsg("userMsg", input);
            inputField.val("");

            // Eliza Respond
            $('.loading').show("fast", "swing"); // typing animation
            setTimeout(
                function () {
                    return respond(input);
                }, 1000);
        }
    });

// global array for eliza's memory of important topics
elizaMemory = {};

/**
 * TODO Determines the most important word in a sentence and saves it in Eliza's memory
 * @param sentence
 */
function findSubject(sentence) {
    sentence = sentence.toLowerCase();
    sentence = sentence.replace(/[.,?]/g, "");
    var word = sentence.split(" ");
    var keyword = "";

    for (var i in word) {

    }

    if (keyword != "") {
        elizaMemory.push(keyword);
    }
}

/**
 * Algorithm for Eliza's response
 * @param userInput
 */
function respond(userInput) {
    userInput = userInput.toLowerCase();
    var reply = invertReflection(userInput);
    // TODO create algorithm to respond to user

    responseArr = [
        "Why do you say " + reply,
        "Could you elaborate more on why " + reply
    ];
    reply = responseArr[Math.floor(Math.random() * responseArr.length)];

    // placeholder response
    // reply = "Actually, I have better things to do... bye.";

    reply = reply.charAt(0).toUpperCase() + reply.substring(1) + "?";
    $('.loading').hide("fast", "swing");
    printMsg("elizaMsg", reply);
}

/**
 * Changes pronouns to refer to client
 * @param sentence
 * @returns sentence
 */
function invertReflection(sentence) {
    reflections = {
        "am": "are",
        "was": "were",
        "i": "you",
        "i'd": "you would",
        "i've": "you have",
        "i'll": "you will",
        "i'm": "you're",
        "my": "your",
        "are": "am",
        "you've": "I have",
        "you'll": "I will",
        "your": "my",
        "yours": "mine",
        "you": "me",
        "me": "you",
        "myself": "yourself"
    };

    sentence = sentence.replace(/[.,?]/g, "");
    var word = sentence.split(" ");
    for (var i in word) {
        if (word[i] in reflections) {
            word[i] = reflections[word[i]];
        }
    }

    return word.join(" ");
}

/**
 * Modifies the DOM element to print message to screen
 * @param msgOwner elizaMsg | userMsg
 * @param msg message to be printed
 */
function printMsg(msgOwner, msg) {
    var msgElement = $('#messages');
    msgElement.append('<div class="' + msgOwner + '">' + msg + '</div>');
    msgElement.scrollTop(msgElement.prop("scrollHeight"));
}