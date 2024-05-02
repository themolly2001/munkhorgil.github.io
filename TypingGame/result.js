function loadData(){
    cpmTag = document.querySelector(".CPM span");
    mistakeTag = document.querySelector(".mistakes span");
    scdTag = document.querySelector(".scd span");
    scoreTag = document.querySelector(".score span");

    cpm = localStorage.getItem("cpm");
    mistakes = localStorage.getItem("mistakes");
    scd = localStorage.getItem("scd");

    cpmTag.innerText = cpm;
    mistakeTag.innerText = mistakes;
    scdTag.innerText = scd;

    score = (cpm*5) + (scd*5) - mistakes;
    scoreTag.innerText = score;
}
loadData();