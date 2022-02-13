import {arr,DOMelements} from './sorting.js';
// Simple function to setBackgroundcolor
function setbg(elt,color)
{
    elt.style["background-color"]=color;
}
//Simple Sleep function for Delayed Animation.
export function sleep(ms)
{
    return new Promise((resolve,reject)=>
    {
        setTimeout(resolve,ms);
    })
}
export async function bubblesort()
{
    for(var i=0;i<arr.length;i++)
    {
        setbg(DOMelements[i],"red");
        for(var j=0;j<arr.length-1-i;j++)
        {
              if(i!=j){setbg(DOMelements[j],"yellow")}
              await sleep(30);
              if(arr[j]>arr[j+1])
              {
                  if(i!=j+1){DOMelements[j+1].style["background-color"]="blue";}
                  await sleep(30);
                  var temp = arr[j];
                  arr[j]=arr[j+1];
                  arr[j+1]=temp;
                  DOMelements[j].style.height=arr[j]*3;
                  DOMelements[j+1].style.height=arr[j+1]*3;
                  if(i!=j+1){DOMelements[j+1].setAttribute("id","");}
              }
              if(i!=j){DOMelements[j].style["background-color"]="black";}
        }
        DOMelements[i].setAttribute("id","");
    }
    for(var i=0;i<arr.length;i++)
    {
        DOMelements[i].style["background-color"]="aqua";
        await sleep(50);
    }
}


export async function selectionsort()
{
    for(var i=0;i<arr.length;i++)
    {
        setbg(DOMelements[i],"red");
        var min_index=i;
        for(var j=i+1;j<arr.length;j++)
        {
            setbg(DOMelements[j],"yellow");
            await sleep(5);
            if(arr[j]<arr[min_index])
            {
                if(i!=min_index)DOMelements[min_index].style["background-color"]="black";
                min_index=j;
                if(i!=min_index){DOMelements[min_index].style["background-color"]="blue";}
            }
            if(min_index!=j){DOMelements[j].style["background-color"]="black";}
        }
        if(i!=min_index)
        {
            var temp = arr[i];
            arr[i]=arr[min_index];
            arr[min_index]=temp;
            DOMelements[i].style.height=arr[i]*3;
            DOMelements[min_index].style.height=arr[min_index]*3;
        }
        DOMelements[min_index].style["background-color"]="black";
        DOMelements[i].style["background-color"]="black";
    }
    for(var i=0;i<arr.length;i++)
    {
        DOMelements[i].style["background-color"]="aqua";
        await sleep(50);
    }
}

async function partition(start,end)
{
    var left_pointer = start+1;
    var right_pointer = end;
    DOMelements[start].style["background-color"]="red";
    DOMelements[left_pointer].style["background-color"]="coral";
    DOMelements[right_pointer].style["background-color"]="cadetblue";
    await sleep(50);
    while(left_pointer<=right_pointer)
    {
        while(left_pointer<arr.length && arr[left_pointer]<arr[start])
        {
            DOMelements[left_pointer].style["background-color"]="black";
            left_pointer++;
            if(left_pointer<arr.length){DOMelements[left_pointer].style["background-color"]="coral";}
            await sleep(50);
        }
        while(arr[right_pointer]>arr[start])
        {
            DOMelements[right_pointer].style["background-color"]="black";
            right_pointer--;
            DOMelements[right_pointer].style["background-color"]="cadetblue";
            await sleep(50);
        }
        if(left_pointer<=right_pointer)
        {
            var temp = arr[left_pointer];
            arr[left_pointer]=arr[right_pointer];
            arr[right_pointer]=temp;
            DOMelements[left_pointer].style["height"]=arr[left_pointer]*3;
            DOMelements[right_pointer].style["height"]=arr[right_pointer]*3;
            DOMelements[left_pointer].style["background-color"]="black";
            left_pointer++;
            if(left_pointer<arr.length){DOMelements[left_pointer].style["background-color"]="coral";}
            DOMelements[right_pointer].style["background-color"]="black";
            right_pointer--;
            DOMelements[right_pointer].style["background-color"]="cadetblue";
            await sleep(50);
        }
    }
    if(left_pointer<arr.length)DOMelements[left_pointer].style["background-color"]="black";
    DOMelements[right_pointer].style["background-color"]="black";
    DOMelements[start].style["background-color"]="black";
    return right_pointer;
}

export async function quicksort(start,end)
{
   if(start>=end){return;} 
   var partitionPoint = await partition(start,end);
   var temp = arr[start];
   arr[start]=arr[partitionPoint];
   arr[partitionPoint]=temp;
   DOMelements[partitionPoint].style["height"]=arr[partitionPoint]*3;
   DOMelements[start].style["height"]=arr[start]*3;
   await quicksort(start,partitionPoint-1);
   await quicksort(partitionPoint+1,end);
}

async function heapify(index,start,end)
{
    setbg(DOMelements[index],"red");
    var left_index=2*index+1;
    var right_index=2*index+2;
    if(left_index<start || left_index>end){left_index=index;}
    if(right_index<start || right_index>end){right_index=index;}
    if(arr[left_index]<arr[right_index]){left_index=right_index;}
    if(left_index!=index){setbg(DOMelements[left_index],"yellow");}
    if(left_index!=index && arr[index]<arr[left_index])
    {
        var temp = arr[index];
        arr[index]=arr[left_index];
        arr[left_index]=temp;
        DOMelements[index].style["height"]=arr[index]*3;
        DOMelements[left_index].style["height"]=arr[left_index]*3;
        await sleep(200);
        setbg(DOMelements[left_index],"black");
        setbg(DOMelements[index],"black");
        await heapify(left_index,start,end);
    }
    else
    {
        await sleep(200);
        setbg(DOMelements[left_index],"black");
        setbg(DOMelements[index],"black");
    }
}
export async function heapsort()
{
    var index;
    if(arr.length%2==0)
    {
        index=Math.floor(arr.length/2)-1;
    }
    else
    {
        index=Math.floor((arr.length+1)/2)-1;
    }
    while(index>=0)
    {
        await heapify(index,0,arr.length-1);index--;
    }
    var index=arr.length-1;
    while(index>=0)
    {
        var temp=arr[index];
        arr[index]=arr[0];
        arr[0]=temp;
        DOMelements[0].style["height"]=arr[0]*3;
        DOMelements[index].style["height"]=arr[index]*3;
        index--;
        var index1=0;
        while(index1<index)
        {
            var left_index=2*index1+1;
            var right_index=2*index1+2;
            if(left_index>index){left_index=index1;}
            if(right_index>index){right_index=index1;}
            if(arr[left_index]<arr[right_index]){left_index=right_index;}
            setbg(DOMelements[left_index],"yellow");
            setbg(DOMelements[index1],"red");
            await sleep(200);
            if(arr[left_index]>arr[index1])
            {
                var temp=arr[left_index];arr[left_index]=arr[index1];arr[index1]=temp;
                DOMelements[left_index].style["height"]=arr[left_index]*3;
                DOMelements[index1].style["height"]=arr[index1]*3;
                setbg(DOMelements[left_index],"black");
                setbg(DOMelements[index1],"black");
                index1=left_index;
            }
            else
            {
                setbg(DOMelements[left_index],"black");
                setbg(DOMelements[index1],"black");
                break;
            }
        }
    }
}

export async function mergesort(start,end)
{
    if(start>=end){return;}
    var mid=Math.floor((start+end)/2);
    await mergesort(start,mid);
    await mergesort(mid+1,end);
    var new_arr=[];
    var i1=start;var i2=mid+1;
    for(var index=start;index<=end;index++)
    {
        setbg(DOMelements[index],"green");
    }
    await sleep(50);
    while(i1<=mid && i2<=end)
    {
        setbg(DOMelements[i1],"red");
        setbg(DOMelements[i2],"yellow");
        await sleep(50);
        if(arr[i1]>arr[i2])
        {
            new_arr.push(arr[i2]);
            setbg(DOMelements[i2],"green");
            i2++;
        }
        else
        {
            new_arr.push(arr[i1]);
            setbg(DOMelements[i1],"green");
            i1++;
        }
    }
    while(i1<=mid){new_arr.push(arr[i1]);i1++;}
    while(i2<=end){new_arr.push(arr[i2]);i2++;}
    for(var index=start;index<=end;index++)
    {
        await sleep(50);
        setbg(DOMelements[index],"red");
        arr[index]=new_arr[index-start];
        DOMelements[index].style["height"]=arr[index]*3;
        setbg(DOMelements[index],"black");
    }
}