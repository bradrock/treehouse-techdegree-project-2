/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
by Brad Rock
******************************************/
   

//main script***************************************************************************

//get student list from HTML file
const studentList = document.querySelectorAll("li.student-item");

//set the number of students that will display per page
const itemsPerPage = 10;

//will be used to set the initial page number--will be page 1 to start
var pageNumber = 1;



/*
   assigns "match" class in HTML to all students initially for appendPageLinks function's
   purposes--all students considered a "match" initially with no search terms entered
*/
assignMatchClassToNodes("");



//set up global DOM variables
const pageDiv = document.querySelector("div.page");


const noMatchMessageElement = document.createElement("H3");

noMatchMessageElement.innerText = "No matches found."

noMatchMessageElement.style.display = "none"; //will be turned on if there are no matches

pageDiv.appendChild(noMatchMessageElement);


const paginationDiv = document.createElement("DIV"); 

paginationDiv.classList.add("pagination");

pageDiv.appendChild(paginationDiv);




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



//show the page
showPage(studentList, 1);


//append the page links
appendPageLinks(studentList);



//end of main script*****************************************************************





//functions and event listeners*****************************************************

function showPage(list, pageNumber)
{
   
   let startIndex = pageNumber * itemsPerPage - itemsPerPage;
   let endIndex = pageNumber * itemsPerPage;

//if the list of students passed is zero in length, then show the "No matches" message.
   if (list.length == 0)
   {
      noMatchMessageElement.style.display = "block"
   }
   else
   {
      noMatchMessageElement.style.display = "none";
   }

   

   for (i = 0; i < list.length; i++)
   {

      if (i >= startIndex && i < endIndex)
      {
         list[i].style.display = "block";
      }
      else
      {
         list[i].style.display = "none";
      }
      
   }
}

//appends links to bottom of page
function appendPageLinks(list)
{

   //remove existing links, if there are any
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

      //set page 1 active to start
      if(i==0)
      {
         aNode.classList.add("active");
      }

      liNode.appendChild(aNode);

      paginationUl.appendChild(liNode);
   }

}



//event listener for pagination div (page number links)
paginationDiv.addEventListener("click", (event) => {

   var clickedNode = event.target;

   var pageAnchorNodes = document.querySelectorAll(".pagination a");

   for(i = 0; i < pageAnchorNodes.length; i++)
   {
      pageAnchorNodes[i].className = '';
   }

   //make the node that was clicked the active one
   clickedNode.className = "active";

   //get the page number to tell showPage what page to show
   var pageNumber = clickedNode.innerHTML;

   
   const matchList = getMatchList();

   showPage(matchList, pageNumber);

});








//execute the search if the search button is clicked
buttonElement.addEventListener('click', () => {
  
   const inputText = inputElement.value;

   executeSearch(inputText);

});


//execute the search if there is a keyup event in the input field
inputElement.addEventListener('keyup', () => {

   const inputText = inputElement.value;

   executeSearch(inputText);

});

/*
   executes search by assigning match class to nodes based on search terms
   and calls showPage and appendPageLinks using new match list
*/
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

   //pass only the list of matches to the showPage function
   showPage(matchList, pageNumber);

   appendPageLinks(matchList);

}




//assigns the "match" class to student nodes based on a search string
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


//gets a list of students that have the "match" class from the DOM
function getMatchList()
{
   const matchList = document.querySelectorAll("li.student-item.match")

   return matchList;
}


//gets a list of students that don't have the "match" class from the DOM
function getNonMatchList()
{
   const nonMatchList = document.querySelectorAll("li.student-item:not(.match)");

   return nonMatchList;
}



