/**
 * Created by Kevin on 01/12/2017.
 */
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

/**
 * Algorithm for Eliza's response
 * @param userInput
 */
function respond(userInput) {
    userInput = userInput.toLowerCase();
    // TODO create algorithm to respond to user

    var reply = "Actually, I have better things to do... bye.";
    $('.loading').hide("fast", "swing");
    printMsg("elizaMsg", reply);
}

/**
 * Modifiest the DOM element to print message to screen
 * @param msgOwner elizaMsg | userMsg
 * @param msg message to be printed
 */
function printMsg(msgOwner, msg) {
    var msgElement = $('#messages');
    msgElement.append('<div class="' + msgOwner + '">' + msg + '</div>');
    msgElement.scrollTop(msgElement.prop("scrollHeight"));
}