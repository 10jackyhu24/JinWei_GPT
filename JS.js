const variable = getComputedStyle(document.documentElement);
const input_box_height = parseInt(variable.getPropertyValue('--input_box_height'));
const input_box_lineHeight = parseInt(variable.getPropertyValue('--input_box_lineHeight'));
const message = []

var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.querySelector("#input_message").addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        text = document.getElementById('input_message').value;
        message.push(text);
        document.getElementById('input_message').value = '';
        output();
        R = Math.floor(Math.random() * 41)
        for (var i = 0; i < R; i++) {
            if (i == 0) {
                message.push('晉');
            } else if (i % 2) {
                message[message.length - 1] += '瑋';
            } else {
                message[message.length - 1] += '晉';
            }
            output();
            await sleep(50);
            console.log(message);
        }
    } else if (e.ctrlKey && e.key === 'z') {
        console.log(123);
    }
})

document.querySelector("#input_message").addEventListener("input", (e) => {
    if (e.inputType === "deleteContentBackward" || e.inputType === "deleteContentForward") {
        document.documentElement.style.setProperty('--input_box_height', 24 + "px");
        adjustTextareaHeight();
    } else if (e.inputType === "insertFromPaste" || e.inputType === "insertFromDrop") {
        adjustTextareaHeight();
    } else if (e.metaKey) {
        console.log("Undo is pressed");
    } else {
        adjustTextareaHeight();
    }
})

function adjustTextareaHeight () {
    const input_message_height = document.getElementById("input_message").scrollHeight;
    if (input_message_height / input_box_lineHeight < 8) {
        document.documentElement.style.setProperty('--input_box_height', input_message_height / input_box_lineHeight * input_box_lineHeight + "px");
    }
}

function output () {
    message_css = document.getElementsByClassName('message');
    for (var i = 0; i < message_css.length; i++) {
        var message_css_element = message_css[i];
        message_css_element.style.flexDirection = 'column-reverse';
        message_css_element.style.justifyContent = 'flex-start';
        message_css_element.style.alignItems = 'flex-start';
    }

    for (var i = message.length - 1; i >= 0; i--) {
        if (i == message.length - 1 && i % 2) {
            document.getElementsByClassName("message")[0].innerHTML = '<span class="output_message_1">' + message[i] + "</span><b/>";
        }
        else if (i == message.length - 1) {
            document.getElementsByClassName("message")[0].innerHTML = '<span class="output_message_0">' + message[i] + "</span><b/>";
        }
        else if (i % 2) {
            document.getElementsByClassName("message")[0].innerHTML += '<span class="output_message_1">' + message[i] + "</span><b/>";
        }
        else {
            document.getElementsByClassName("message")[0].innerHTML += '<span class="output_message_0">' + message[i] + "</span><b/>";
        }
    }
}