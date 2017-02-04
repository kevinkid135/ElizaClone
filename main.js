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
        [/I need (.*)/i,["Why do you need {0}?",
            "Would it really help you to get {0}?",
            "Are you sure you need {0}?"]],

        [/Why don\'?t you ([^\?]*)\??/i,["Do you really think I don't {0}?",
            "Perhaps eventually I will {0}.",
            "Do you really want me to {0}?"]],

        [/Why can\'?t I ([^\?]*)\??/i,["Do you think you should be able to {0}?",
            "If you could {0}, what would you do?",
            "I don't know -- why can't you {0}?",
            "Have you really tried?"]],

        [/I can\'?t (.*)/i,["How do you know you can't {0}?",
            "Perhaps you could {0} if you tried.",
            "What would it take for you to {0}?"]],

        [/I am (.*)/i,["Did you come to me because you are {0}?",
            "How long have you been {0}?",
            "How do you feel about being {0}?"]],


        [/I\'?m (.*)/i,["How does being {0} make you feel?",
            "Do you enjoy being {0}?",
            "Why do you tell me you're {0}?",
            "Why do you think you're {0}?"]],

        [/Are you ([^\?]*)\??/i,["Why does it matter whether I am {0}?","Would you prefer it if I were not {0}?",
            "Perhaps you believe I am {0}.",
            "I may be {0} -- what do you think?"]],

        [/What (.*)/i,["Why do you ask?",
            "How would an answer to that help you?",
            "What do you think?"]],

        [/How (.*)/i,["How do you suppose?",
            "Perhaps you can answer your own question.",
            "What is it you're really asking?"]],

        [/Because (.*)/i,["Is that the real reason?",
            "What other reasons come to mind?",
            "Does that reason apply to anything else?",
            "If {0}, what else must be true?"]],

        [/(.*) sorry (.*)/i,["There are many times when no apology is needed.",
            "What feelings do you have when you apologize?"]],
        [/Hello(.*)/i,["Hello... I'm glad you could drop by today.",
            "Hi there... how are you today?",
            "Hello, how are you feeling today?"]],

        [/I think (.*)/i,["Do you doubt {0}?",
            "Do you really think so?",
            "But you're not sure {0}?"]],

        [/(.*) friend (.*)/i,["Tell me more about your friends.","When you think of a friend, what comes to mind?",
            "Why don't you tell me about a childhood friend?"]],

        [/Yes/i,["You seem quite sure.",
            "OK, but can you elaborate a bit?"]],


        [/(.*) computer(.*)/i,["Are you really talking about me?",
            "Does it seem strange to talk to a computer?",
            "How do computers make you feel?",
            "Do you feel threatened by computers?"]],

        [/Is it (.*)/i,["Do you think it is {0}?",
            "Perhaps it's {0} -- what do you think?",
            "If it were {0}, what would you do?",
            "It could well be that {0}."]],

        [/It is (.*)/i,["You seem very certain.",
            "If I told you that it probably isn't {0}, what would you feel?"]],

        [/Can you ([^\?]*)\??/i,["What makes you think I can't {0}?",
            "If I could {0}, then what?",
            "Why do you ask if I can {0}?"]],

        [/Can I ([^\?]*)\??/i,["Perhaps you don't want to {0}.",
            "Do you want to be able to {0}?",
            "If you could {0}, would you?"]],

        [/You are (.*)/i,["Why do you think I am {0}?",
            "Does it please you to think that I'm {0}?",
            "Perhaps you would like me to be {0}.",
            "Perhaps you're really talking about yourself?"]],

        [/You\'?re (.*)/i,["Why do you say I am {0}?",
            "Why do you think I am {0}?",
            "Are we talking about you, or me?"]],

        [/I don\'?t (.*)/i,["Don't you really {0}?",
            "Why don't you {0}?",
            "Do you want to {0}?"]],

        [/I feel (.*)/i,["Good, tell me more about these feelings.",
            "Do you often feel {0}?",
            "When do you usually feel {0}?","When you feel {0}, what do you do?"]],

        [/I have (.*)/i,["Why do you tell me that you've {0}?",
            "Have you really {0}?",
            "Now that you have {0}, what will you do next?"]],


        [/I would (.*)/i,["Could you explain why you would {0}?",
            "Why would you {0}?",
            "Who else knows that you would {0}?"]],

        [/Is there (.*)/i,["Do you think there is {0}?",
            "It's likely that there is {0}.",
            "Would you like there to be {0}?"]],

        [/My (.*)/i,["I see, your {0}.",
            "Why do you say that your {0}?",
            "When your {0}, how do you feel?"]],

        [/You (.*)/i,["We should be discussing you, not me.",
            "Why do you say that about me?",
            "Why do you care whether I {0}?"]],

        [/Why (.*)/i,["Why don't you tell me the reason why {0}?",
            "Why do you think {0}?"]],

        [/I want (.*)/i,["What would it mean to you if you got {0}?",
            "Why do you want {0}?",
            "What would you do if you got {0}?",
            "If you got {0}, then what would you do?"]],

        [/(.*) mother(.*)/i,["Tell me more about your mother.",
            "What was your relationship with your mother like?",
            "How do you feel about your mother?",
            "How does this relate to your feelings today?",
            "Good family relations are important."]],

        [/(.*) father(.*)/i,["Tell me more about your father.",
            "How did your father make you feel?",
            "How do you feel about your father?",
            "Does your relationship with your father relate to your feelings today?",
            "Do you have trouble showing affection with your family?"]],

        [/(.*) child(.*)/i,["Did you have close friends as a child?",
            "What is your favorite childhood memory?",
            "Do you remember any dreams or nightmares from childhood?",
            "Did the other children sometimes tease you?",
            "How do you think your childhood experiences relate to your feelings today?"]],


        [/(.*)\?/i,["Why do you ask that?",
            "Please consider whether you can answer your own question.",
            "Perhaps the answer lies within yourself?",
            "Why don't you tell me?"]],

        [/quit/i,["Thank you for talking with me.",
            "Good-bye.",
            "Thank you, that will be $150.  Have a good day!"]],

        [/(.*)/i,["Please tell me more.",
            "Let's change focus a bit... Tell me about your family.",
            "Can you elaborate on that?",
            "Why do you say that {0}?",
            "I see.",
            "Very interesting.",
            "{0}.",
            "I see.  And what does that tell you?",
            "How does that make you feel?",
            "How do you feel when you say that?"]]
    ];

    // while (reply = psychobabble[i].exec(rawUserInput)){
    //     alert(item[1]);
    // }
    var reply = invertReflection(rawUserInput);
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