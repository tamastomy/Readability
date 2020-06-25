const rightContainer=document.getElementsByClassName("position");
const blogCont=document.getElementsByClassName("blogcont");
const leftCont=document.getElementsByClassName("container__right__blogs__left");
const rightCont=document.getElementsByClassName("container__right__blogs__right");

function AddToContainer(){
    for(let i=0;i<blogCont.length;i++){
    if(blogCont[i].getAttribute("data-value")%2==0){
        leftCont[0].appendChild(blogCont[i]);
    }else if(blogCont[i].getAttribute("data-value")%2 !==0){
        rightCont[0].appendChild(blogCont[i]);
    }
}};


function ScrollBarr(){
    const winScroll = document.getElementsByClassName("position")[0].scrollTop|| rightContainer.pageYOffset;
    const height = document.getElementsByClassName("position")[0].scrollHeight - document.getElementsByClassName("position")[0].clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.height=scrolled+"%";
}

function addOne() {
    const container = document.getElementById("form-container");
    let containerNumber = document.querySelectorAll("div.container__left__single-form").length+1;
    const ContainerElement = document.querySelectorAll("div.container__left__single-form");
    const div = document.createElement("div");
    div.id = `context${containerNumber}`;
    div.className = "container__left__single-form";
    div.insertAdjacentHTML('afterbegin', `<div class="ui top attached tabular menu one"> <a class="item" data-tab="image">Image</a> <a class="item active" data-tab="subtitle">Subtitle</a> <a class="item" data-tab="text">Text</a> </div> <div class="ui bottom attached tab segment" data-tab="image"> <div class="ui form"> <div class="field"> <p>Add Image link</p> <input name="image${containerNumber}" class="ui input blogimage" type="text" placeholder="Image"></div> </div> </div> <div class="ui bottom attached active tab segment" data-tab="subtitle"> <div class="ui form"> <div class="field"> <p>Add Subtitle</p> <input name="title${containerNumber}" class="ui input subtitle" type="text" placeholder="Subtitle"></div> </div> </div> <div class="ui bottom attached tab segment" data-tab="text"> <div class="ui form"> <div class="field"> <p>Add text</p> <textarea rows="4" class="bodycontent" cols="50" name="content${containerNumber}"  placeholder="Write text"></textarea></div></div></div>`);
    const ScriptString = `<script>$("#context${containerNumber} .menu .item").tab({evaluateScripts:true,context:$("#context${containerNumber}")})</script>`;
    const range = document.createRange();
    range.selectNode(document.getElementsByTagName("div").item(0));
    const documentFragment = range.createContextualFragment(ScriptString);
    div.appendChild(documentFragment);
    container.appendChild(div);
}



