"use strict";
var newItemButton = document.getElementById("addNewItem");
newItemButton.addEventListener("click",addNewItem);
var confirmButton = document.getElementById("confirmNewItem");
confirmButton.addEventListener("click",confirmNewItem);
//var closeButton = document.getElementById("closeNewItem");
//closeButton.addEventListener("click",closeNewItem);

//function closeNewItem(){
//    var newItemForm = document.getElementById("addNewItem");
//    newItemForm.style.display = "none"
//   }
function addNewItem(){
    var itemTitle = document.getElementById("itemTitle");
    itemTitle.value ="";
    var itemDesc = document.getElementById("itemDesc");
    itemDesc.value = "";
    var newItemForm = document.getElementById("newItemForm");
    newItemForm.style.display = "block";
    }

function confirmNewItem(){
    //create the list item
    var itemTitle = document.getElementById("itemTitle").value;
    var itemDesc = document.getElementById("itemDesc").value;
    var item = new todoItem(itemTitle,itemDesc);
    createItem(item);

    //hide the form again
    var newItemForm = document.getElementById("newItemForm");
    newItemForm.style.display = "none"; //try edit this to none or hidden

    //and store the new list
    var list = getItemsFromHTML();
    storeItems(list);
}

function createItem(item){
    //add new item to the list
    var todoList = document.getElementById("todoList");
    var todoItem = document.createElement("li");
    todoItem.className="todoItem";
    todoList.appendChild(todoItem);

    //SET 5
    //complete button
    var button = document.createElement("button");
    button.className = "buttonComplete";
    button.innerHTML = "Done";
    todoItem.appendChild(button);
    button.addEventListener("click", function() {completeItem(todoItem);} );
    //title
    var titleSpan = document.createElement("span");
    titleSpan.className = "itemTitle";
    titleSpan.innerHTML = item.title;
    todoItem.appendChild(titleSpan);

    //description
    var descSpan = document.createElement("span");
    descSpan.className = "itemDesc";
    descSpan.innerHTML = item.description;
    todoItem.appendChild(descSpan);

    //SET5
    if(item.complete)
    {
        button.style.display = "none";
        titleSpan.className = titleSpan.className + " complete";
        descSpan.className = descSpan.className + " complete";
    }
}

//SET 2
function todoItem(title,description,complete){
    //object closure that stores the todo item
    self = this;
    self.title = title;
    self.description = description;
    self.complete = complete;
}

function getItemsFromHTML(){
    var result = [];
    //iterate the list of li's with classname'todoItem'
    var elements = document.getElementByClassName("todoItem");
    for(var i = 0; i < elements.length ; i++)
    {
        result.push(getItemValues(elements[i]));
    }
    return result;
}

function getItemValues(itemNode){
    var title = itemNode.getElementsByClassName("itemTitle")[0].innerHTML;
    var desc = itemNode.getElementsByClassName("itemDesc")[0].innerHTML;
    var todo = new todoItem(title,desc);
    //SET 5
    var titleClass = itemNode.getElementsByClassName("itemTitle")[0].className;
    todo.complete=(titleClass.indexOf("complete")>-1);

    //return the item
    return todo;
}

//SET5 - new function
function completeItem(item)
{
    var button = item.getElementsByClassName("buttonComplete")[0];
    button.style.display = "none";
    var text = item.getElementByTagName("span");
    for(var i = 0; i < text.length; i++)
    {
        text[i].className = text[i].className + " complete";
    }
    var list = getItemsFromHTML();
    storeItems(list);
}




function storeItems(list){
    //SET5
    var newlist = list.filter(function(item){
        return !item.complete;
    });
    //SET5
    var jsonlist = JSON.stringify(newlist);
    localStorage.todoList = jsonlist;
}
//end of SET2


window.addEventListener("load",loadItems);

function loadItems(){
    var jsonlist = localStorage.todoList;
    if(!jsonlist) return;
    var list = JSON.parse(jsonlist);
    createItems(list);
}

function createItems(list){

    for (var i=0; i< list.length;i++)
    createItem(list[i]);
}

/*
SET 4
*/
var sortButton = document.getElementById("sortByName");
sortButton.addEventListener("click",sortListByName);

function sortListByName(){
    var list = getItemsFromHTML;
    list.sort(itemCompare);
    deleteList();
    createItems(list);
}

function itemCompare(item1,item2){
    if (item1.title < item2.title)
    return -1;
    else
    return 1;
}

function sortList(list){
    for(var  i = 0; i < list.length ; i++)
    {
        for(var j = list.length - 1 ; j>i ; j--)
        {
            if(list[j].title < list[j-1].title)
            {
                var s = list[j-1];
                list[j-1] = list[j];
                list [j]=s;
            }
        }
    }
    return list;
}

function deleteList(){
    var  listElement = document.getElementById("todoList");
    listElement.innerHTML = "";
}
/*end of SET4*/
