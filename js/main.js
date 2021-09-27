// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    // we will create a object with the values and store it
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Testing if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Initialize array
        var bookmarks = [];
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        // Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Send back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));        
    }


    /*
    // Local storage test
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    */

    // clear form after submision
    document.getElementById('myForm').reset();

    // re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}


function deleteBookmark(url){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop trough bookmarks and delete based on url
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Send back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); 

    // re-fetch bookmarks
    fetchBookmarks();
}


//Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id 
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;
  
      bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</h3>'+
                                    '</div>';
        // appending to output
    }
}


// check for valid bookmark
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    // using regular expression to validate url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}
