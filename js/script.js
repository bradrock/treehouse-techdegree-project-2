/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

//perform initial setup
const studentList = document.querySelectorAll("li.student-item");
const itemsPerPage = 10;

var pageNumber = 1;

assignMatchClassToNodes("");

const pageDiv = document.querySelector("div.page");



const noMatchMessageElement = document.createElement("H3");

noMatchMessageElement.innerText = "No matches found."

noMatchMessageElement.style.display = "none"; //will be turned on if there are no matches

pageDiv.appendChild(noMatchMessageElement);



showPage(studentList, 1);



const paginationDiv = document.createElement("DIV"); 

paginationDiv.classList.add("pagination");

pageDiv.appendChild(paginationDiv);



appendPageLinks(studentList);

//end of initial setup

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, pageNumber)
{
   console.log(pageNumber);
   let startIndex = pageNumber * itemsPerPage - itemsPerPage;
   let endIndex = pageNumber * itemsPerPage;


   if (list.length == 0)
   {
      noMatchMessageElement.style.display = "block"
   }
   else
   {
      noMatchMessageElement.style.display = "none";
   }

   //console.log("Search string is " + searchString);

   //create a list that only contains student list items that match search string

   


      // for (i = 0; i < studentList.length; i++)
      // {

      // const studentNameNode = list[i].querySelector("h3");

      // const studentName = studentNameNode.innerHTML;

      //console.log("Student name is " + studentName +".");

      //    if((searchString.length > 0 && studentName.toLowerCase().includes(searchString.toLowerCase())) || searchString.length == 0)
      //    {
      //       matchList.push(list[i]);
      //    }

      //    else
      //    {
      //       list[i].style.display = "none";
      //    }

       //}

      
   

   for (i = 0; i < list.length; i++)
   {

      


      if (i >= startIndex && i < endIndex)
      {
         
      
            //console.log("First part of conditional is " + (searchString.length > 0 && studentName.toLowerCase().includes(searchString.toLowerCase())));
            //console.log("Second part of conditional is " + (searchString.length == 0));
            //console.log("Made it here");
            list[i].style.display = "block";

         
         
      }
      else
         {
            list[i].style.display = "none";
         }
      
      
   }
}




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list)
{

   //remove existing links, if they exist
   const exPaginationUl = document.querySelector(".pagination ul");

   if (exPaginationUl)
   {

   exPaginationUl.parentNode.removeChild(exPaginationUl);

   }

   //create new pagination ul

   

  

   var paginationUl = document.createElement("UL");

   paginationDiv.appendChild(paginationUl);

   var numberOfPages = Math.ceil(list.length / itemsPerPage);

   for(i = 0; i < numberOfPages; i++)
   {
      var liNode = document.createElement("LI");

      var aNode = document.createElement("A");

      aNode.href = '#';

      aNode.innerHTML = i+1;

      if(i==0)
      {
         aNode.classList.add("active");
      }

      liNode.appendChild(aNode);

      paginationUl.appendChild(liNode);
   }

 

 

}











paginationDiv.addEventListener("click", (event) => {

   var clickedNode = event.target;

   

   var pageAnchorNodes = document.querySelectorAll(".pagination a");

   

   for(i = 0; i < pageAnchorNodes.length; i++)
   {
      pageAnchorNodes[i].className = '';
   }

   clickedNode.className = "active";

   var pageNumber = clickedNode.innerHTML;

   const matchList = getMatchList();

   showPage(matchList, pageNumber);

});


var headerDiv = document.querySelector("div.page-header");

var searchDiv = document.createElement("DIV");

searchDiv.classList.add("student-search");

var inputElement = document.createElement("INPUT");

inputElement.placeholder = "Search for students...";

var buttonElement = document.createElement("BUTTON");

buttonElement.innerHTML = "Search";

searchDiv.appendChild(inputElement);

searchDiv.appendChild(buttonElement);

headerDiv.appendChild(searchDiv);

buttonElement.addEventListener('click', () => {
  
   

   const inputText = inputElement.value;

   executeSearch(inputText);

   //console.log(inputText);

});

inputElement.addEventListener('keyup', () => {

   const inputText = inputElement.value;

   //console.log(inputText);

   executeSearch(inputText);

});


function executeSearch(searchText)
{
   
   pageNumber = 1;

   

   assignMatchClassToNodes(searchText);

   const matchList = getMatchList();


   const nonMatchList = getNonMatchList();

       for (i = 0; i < nonMatchList.length; i++)
       {
    
             nonMatchList[i].style.display = "none";
          
       }


   showPage(matchList, pageNumber);

   appendPageLinks(matchList);

}

function assignMatchClassToNodes(searchString)
{
   for (i = 0; i < studentList.length; i++)
   {

      //first reset by removing all match class assignments
      studentList[i].classList.remove("match");
      
//extract node with the name in it
   const studentNameNode = studentList[i].querySelector("h3");

   //assign the text string with the name to studentName variable
   const studentName = studentNameNode.innerHTML;

      

      if((searchString.length > 0 && studentName.toLowerCase().includes(searchString.toLowerCase())) || searchString.length == 0)
      {
         studentList[i].classList.add("match");
      }

   }

}

function getMatchList()
{
   //const matchList = studentList.querySelectorAll(".match");

   const matchList = document.querySelectorAll("li.student-item.match")

   return matchList;
}

function getNonMatchList()
{
   const nonMatchList = document.querySelectorAll("li.student-item:not(.match)");

   return nonMatchList;
}

/*
 <!-- pagination HTML to create dynamically -->
      <div class="pagination">
        <ul>
          <li>
            <a class="active" href="#">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
      <!-- end pagination -->
 */




// Remember to delete the comments that came with this file, and replace them with your own code comments.