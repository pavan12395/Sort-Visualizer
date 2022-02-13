//Sorting Methods
import {selectionsort,bubblesort,quicksort,sleep,heapsort,mergesort} from "./SortingMethods.js";

//DOM elements
var submit = document.getElementById("submit");
var clear = document.getElementById("clear");
var input = document.getElementsByTagName("input")[0];
var root = document.getElementById("root");
var SortButton = document.getElementById("Sort");
var bubble=document.getElementById("bubblesort");
var selection=document.getElementById("selectionsort");
var merge=document.getElementById("mergesort");
var heap=document.getElementById("heapsort");
var quick=document.getElementById("quicksort");
export var arr=[];
export var DOMelements=[];

//Mutal Exclusion between a group of checkBoxes.

function exclusive()
{
    bubble.checked=false;selection.checked=false;merge.checked=false;heap.checked=false;quick.checked=false;
}
bubble.addEventListener("click",(e)=>
{
    exclusive();bubble.checked=true;
});

merge.addEventListener("click",(e)=>
{
    exclusive();merge.checked=true;
});

selection.addEventListener("click",(e)=>
{
    exclusive();selection.checked=true;
})

heap.addEventListener("click",(e)=>
{
    exclusive();heap.checked=true;
});

quick.addEventListener("click",(e)=>
{
    exclusive();quick.checked=true;
})

//Method for getting Array object from entered Text.
function getArr(x)
{
    var index=0;
    var arr=[];
    var temp = '';
    for(var i=0;i<x.length;i++)
    {
        if((/[a-zA-Z]/).test(x[i]))
        {
            throw new Error("Invalid Array Input Cannot consist of Alphabets");
        }
        else if(x[i]!=',')
        {
            temp+=x[i];
        }
        else
        {
            var f=parseInt(temp);
            if(isNaN(f))
            {
                throw new Error("Invalid Array Input");
            }
            arr.push(f);
            temp='';
        }
    }
    var f=parseInt(temp);
    if(isNaN(f))
    {
        throw new Error("Invalid Array Input");
    }
    arr.push(f);
    return arr;
}

//Sorting Function.
async function sort()
{
    if(bubble.checked)
    {
        await bubblesort();
    }
    else if(selection.checked)
    {
        await selectionsort();
    }
    else if(quick.checked)
    {
        await quicksort(0,arr.length-1);
        for(var i=0;i<arr.length;i++)
        {
          DOMelements[i].style["background-color"]="aqua";
          await sleep(50);
        }
    }
    else if(heap.checked)
    {
        await heapsort();
        for(var i=0;i<arr.length;i++)
        {
          DOMelements[i].style["background-color"]="aqua";
          await sleep(50);
        }
    }
    else if(merge.checked)
    {
        await mergesort(0,arr.length-1);
        for(var i=0;i<arr.length;i++)
        {
          DOMelements[i].style["background-color"]="aqua";
          await sleep(50);
        }
    }
    else
    {
        alert("Select any of the  Sort Option");
        return;
    }
    root.style["background-color"]="black";
}

//Adding event to SortButton
SortButton.addEventListener("click",(e)=>
{
    sort();
})

// Adding event to Submit Button.
submit.addEventListener("click",(e)=>
{
    console.log("hello world");
    root.style["background-color"]="white";

    if(input.value=="")
    {
        input.style["border-color"]="red";
        return;
    }
    try
    {
       if(root.innerHTML!='')
       {
          root.innerHTML='';
          DOMelements=[];
          arr=[];
       }
       e.preventDefault();
       arr=getArr(input.value);
       DOMelements=[];
       for(var i=0;i<arr.length;i++)
       {
         var elt = document.createElement("div");
         var h1 = document.createElement("h1");
         elt.className="array-elt";
         elt.appendChild(h1);
         elt.style.height=arr[i]*3;
         root.appendChild(elt);
         DOMelements.push(elt);
      }
    }
    catch(err)
    {
        alert("Try Again "+err.message);
        input.value="";
    }

});

//Adding Event to Clear Button.
clear.addEventListener("click",(e)=>
{
    root.innerHTML='';
    DOMelements=[];
    arr=[];
    input.value='';
});
