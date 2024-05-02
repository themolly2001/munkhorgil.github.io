const typingText = document.querySelector(".typing-text p"),
//const inputs = document.querySelectorAll('input'),
inpField = document.querySelector(".content-box .input-field"),
textField = document.querySelector(".content-box .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
scdTag = document.querySelector(".scd span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = 60,
charIndex = mistakes = isTyping = 0;
scriptsDone = 0;
cpm = 0;
totalChar = 0;



function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    const quote = paragraphs[ranIndex];
    typingText.innerHTML='';
    quote.split('').forEach(char => {
        const characterSpan = document.createElement('span')
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
        // typingText.appendChild(characterSpan)
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    
        // input.setAttribute('autocomplete', 'off')
        // input.setAttribute('autocorrect', 'off')
        // input.setAttribute('autocapitalize', 'off')
        // input.setAttribute('spellcheck', false)
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length-1 ) {
        if(!isTyping) {
            timer = setInterval(initTimer, 500);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        if(characters[charIndex] == "\n" ){
            characters[charIndex+1].classList.add("active");
        }else if(characters[charIndex] == "\t"){
        characters[charIndex+2].classList.add("active");}
        else{
            characters[charIndex].classList.add("active");}
        

            
        cpm = Math.round(((totalChar + charIndex - mistakes)/5) / (maxTime - timeLeft) * 60);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        scdTag.innerText = scriptsDone;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = cpm;
        localStorage.setItem("cpm",cpm);
        localStorage.setItem("mistakes",mistakes);
        localStorage.setItem("scd",scriptsDone);
    } else {
        totalChar = charIndex;
        clearInterval(timer);
        newScript();
        // inpField.value = "";
    }   
    
    
}
inpField.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        charIndex++;
        charIndex++;
        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
          "\t" + this.value.substring(end);
    
        // put caret at right position again
        this.selectionStart =
          this.selectionEnd = start + 1;
      }

})
inpField.addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
        //e.preventDefault();
        //var start = this.selectionStart;
        //var end = this.selectionEnd;
        //charIndex++;
        characters[charIndex].classList.add("active");
        // set textarea value to: text before caret + tab + text after caret
        // this.value = this.value.substring(0, start) +
        //   "\n" + this.value.substring(end);
    
        // put caret at right position again
        //this.selectionStart =
          //this.selectionEnd = start + 1;
      }

})

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        //let wpm = Math.round(((charIndex - mistakes)  / 5) / timeLeft);
        scdTag.innerText = scriptsDone;
    } else {
        //window.location.replace("/Users/jirarutsatasook/Desktopx/Website2/result.html");
        //window.open('/Users/jirarutsatasook/Desktop/Website2/result.html',"_self")
        //window.location = '/Users/jirarutsatasook/Desktop/Website2/result.html' ;
        //window.open("result.html", "_self"); 
        localStorage.setItem("cpm",cpm);
        localStorage.setItem("mistakes", mistakes);
        localStorage.setItem("scd",scriptsDone);
        window.top.location = "result.html"
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    scriptsDone = scriptsDone + 1;
    timeLeft = 60;
    maxTime=300;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    scdTag.innerText = scriptsDone;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}
function newScript() {
    loadParagraph()
    scriptsDone = scriptsDone + 1;
    maxTime=60;
    charIndex = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    scdTag.innerText = scriptsDone;
    mistakeTag.innerText = 0;
    cpmTag.innerText = cpm;
    
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);