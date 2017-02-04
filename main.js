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

            // Go through Eliza's response algorithm
            $('.loading').show("fast", "swing"); // typing animation
            setTimeout(
                function () {
                    return respond(input);
                }, 1000);
        }
    });

/**
 * Eliza's response algorithm
 * @param rawUserInput
 */
function respond(rawUserInput) {
    rawUserInput = rawUserInput.toLowerCase();
    var psychobabble = [
        [/I need (.*)/i,
            ["Why do you need temp_string?",
                "Would it really help you to get temp_string?",
                "Are you sure you need temp_string?"]
        ],

        [/Why don\'?t you ([^\?]*)\??/i,
            ["Do you really think I don't temp_string?",
                "Perhaps eventually I will temp_string.",
                "Do you really want me to temp_string?",
                "Why do you want me to temp_string?"]
        ],

        [/Why can\'?t I ([^\?]*)\??/i,
            ["Do you think you should be able to temp_string?",
                "If you could temp_string, what would you do?",
                "I don't know -- why can't you temp_string?",
                "Have you really tried?"]
        ],

        [/I can\'?t (.*)/i,
            ["How do you know you can't temp_string?",
                "Perhaps you could temp_string if you tried.",
                "What would it take for you to temp_string?",
                "How do you think other people temp_string?"]
        ],

        [/I\'?m feeling (.*)/i,
            ["Do you enjoy feeling temp_string?",
                "Why do you tell me you're temp_string?",
                "Why do you think you're temp_string?",
                "Could you think of a time where temp_string caused an problem in your life?"]
        ],

        [/I am (.*)/i,
            ["Did you come to me because you are temp_string?",
                "How long have you been temp_string?",
                "How do you feel about being temp_string?",
                "What makes you say you are temp_string?"]
        ],

        [/I\'?m (.*)/i,
            ["How does being temp_string make you feel?",
                "Do you enjoy being temp_string?",
                "Why do you tell me you're temp_string?",
                "Why do you think you're temp_string?"]
        ],

        [/Are you ([^\?]*)\??/i,
            ["Why does it matter whether I am temp_string?", "Would you prefer it if I were not temp_string?",
                "Perhaps you believe I am temp_string.",
                "I may be temp_string -- what do you think?"]
        ],

        [/What (.*)/i,
            ["Why do you ask?",
                "How would an answer to that help you?",
                "What do you think?"]
        ],

        [/How (.*)/i,
            ["How do you suppose?",
                "Perhaps you can answer your own question.",
                "What is it you're really asking?"]
        ],

        [/Because (.*)/i,
            ["Is that the real reason?",
                "What other reasons come to mind?",
                "Does that reason apply to anything else?",
                "If temp_string, what else must be true?"]
        ],

        [/(.*) sorry (.*)/i,
            ["There are many times when no apology is needed.",
                "What feelings do you have when you apologize?"]
        ],
        [/Hello(.*)/i,
            ["Hello... I'm glad you could drop by today.",
                "Hi there... how are you today?",
                "Hello, how are you feeling today?"]
        ],

        [/I think (.*)/i,
            ["Do you doubt temp_string?",
                "Do you really think so?",
                "But you're not sure temp_string?"]
        ],

        [/(.*) friend (.*)/i,
            ["Tell me more about your friends.", "When you think of a friend, what comes to mind?",
                "Why don't you tell me about a childhood friend?"]
        ],

        [/Yes/i,
            ["You seem quite sure.",
                "OK, but can you elaborate a bit?"]
        ],


        [/(.*) computer(.*)/i,
            ["Are you really talking about me?",
                "Does it seem strange to talk to a computer?",
                "How do computers make you feel?",
                "Do you feel threatened by computers?"]
        ],

        [/Is it (.*)/i,
            ["Do you think it is temp_string?",
                "Perhaps it's temp_string -- what do you think?",
                "If it were temp_string, what would you do?",
                "It could well be that temp_string."]
        ],

        [/It is (.*)/i,
            ["You seem very certain.",
                "If I told you that it probably isn't temp_string, what would you feel?"]
        ],

        [/Can you ([^\?]*)\??/i,
            ["What makes you think I can't temp_string?",
                "If I could temp_string, then what?",
                "Why do you ask if I can temp_string?"]
        ],

        [/Can I ([^\?]*)\??/i,
            ["Perhaps you don't want to temp_string.",
                "Do you want to be able to temp_string?",
                "If you could temp_string, would you?"]
        ],

        [/You are (.*)/i,
            ["Why do you think I am temp_string?",
                "Does it please you to think that I'm temp_string?",
                "Perhaps you would like me to be temp_string.",
                "Perhaps you're really talking about yourself?"]
        ],

        [/You\'?re (.*)/i,
            ["Why do you say I am temp_string?",
                "Why do you think I am temp_string?",
                "Are we talking about you, or me?"]
        ],

        [/I don\'?t (.*)/i,
            ["Don't you really temp_string?",
                "Why don't you temp_string?",
                "Do you want to temp_string?"]
        ],

        [/I feel (.*)/i,
            ["Good, tell me more about these feelings.",
                "Do you often feel temp_string?",
                "When do you usually feel temp_string?", "When you feel temp_string, what do you do?"]
        ],

        [/I have (.*)/i,
            ["Why do you tell me that you've temp_string?",
                "Have you really temp_string?",
                "Now that you have temp_string, what will you do next?"]
        ],


        [/I would (.*)/i,
            ["Could you explain why you would temp_string?",
                "Why would you temp_string?",
                "Who else knows that you would temp_string?"]
        ],

        [/Is there (.*)/i,
            ["Do you think there is temp_string?",
                "It's likely that there is temp_string.",
                "Would you like there to be temp_string?"]
        ],

        [/My (.*)/i,
            ["I see, your temp_string.",
                "Why do you say that your temp_string?",
                "When your temp_string, how do you feel?"]
        ],

        [/You (.*)/i,
            ["We should be discussing you, not me.",
                "Why do you say that about me?",
                "Why do you care whether I temp_string?"]
        ],

        [/Why (.*)/i,
            ["Why don't you tell me the reason why temp_string?",
                "Why do you think temp_string?"]
        ],

        [/I want (.*)/i,
            ["What would it mean to you if you got temp_string?",
                "Why do you want temp_string?",
                "What would you do if you got temp_string?",
                "If you got temp_string, then what would you do?"]
        ],

        [/(.*) mother(.*)/i,
            ["Tell me more about your mother.",
                "What was your relationship with your mother like?",
                "How do you feel about your mother?",
                "How does this relate to your feelings today?",
                "Good family relations are important."]
        ],

        [/(.*) father(.*)/i,
            ["Tell me more about your father.",
                "How did your father make you feel?",
                "How do you feel about your father?",
                "Does your relationship with your father relate to your feelings today?",
                "Do you have trouble showing affection with your family?"]
        ],

        [/(.*) child(.*)/i,
            ["Did you have close friends as a child?",
                "What is your favorite childhood memory?",
                "Do you remember any dreams or nightmares from childhood?",
                "Did the other children sometimes tease you?",
                "How do you think your childhood experiences relate to your feelings today?"]
        ],


        [/(.*)\?/i,
            ["Why do you ask that?",
                "Please consider whether you can answer your own question.",
                "Perhaps the answer lies within yourself?",
                "Why don't you tell me?"]
        ],

        [/quit/i,
            ["Thank you for talking with me.",
                "Good-bye.",
                "Thank you, that will be $150.  Have a good day!"]
        ],

        [/(.*)/i,
            ["Please tell me more.",
                "Let's change focus a bit... Tell me about your family.",
                "Can you elaborate on that?",
                "Why do you say that temp_string?",
                "I see.",
                "Very interesting.",
                "temp_string.",
                "I see.  And what does that tell you?",
                "How does that make you feel?",
                "How do you feel when you say that?"]]
    ];

    for (var i = 0; i < psychobabble.length; i++) {
        var result = psychobabble[i][0].exec(rawUserInput);
        // if input matches the regex, choose a random response
        if (result != null){
            var subject = invertReflection(result[1]);
            var responses = psychobabble[i][1];
            reply = responses[Math.floor(Math.random() * responses.length)];
            reply =  reply.replace('temp_string', subject);
            break;
        }
    }

    // show loading icon and print
    $('.loading').hide("fast", "swing");
    printMsg("elizaMsg", reply);
}

/**
 * Changes pronouns to refer to client
 * @param sentence
 * @returns sentence
 */
function invertReflection(sentence) {
    var reflections = {
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