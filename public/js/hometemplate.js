function invokeAJAX(attrs) {
    $.ajax({
        url : attrs.URL,
        type : attrs.Method,
        dataType : attrs.DataType,
        data : attrs.Data,
        success : attrs.Success,
        error : attrs.Error
    });
}
function getPosts_Success(result) {
    if (result && result.constructor === Array) {
        if (result.length === 0) {
            document.getElementById('postsdummycount').value = 0;
        }
        var container = document.getElementById('PostContainerDIV');
        for(var idx = 0; idx < result.length; idx++) {
            var postcontainer = document.createElement('div');
            postcontainer.setAttribute('class', 'postcontainer');
            
            var shortpost = document.createElement('div');
            shortpost.setAttribute('class', 'shortpost');
            shortpost.innerHTML = result[idx].ShortPost;
            
            var img = document.createElement('img');
            img.setAttribute('src', 'data:image/jpeg;base64,' + result[idx].Image);
            
            var imgcontainer = document.createElement('div');
            imgcontainer.setAttribute('align', 'center');
            imgcontainer.setAttribute('class', 'imgContainer');
            imgcontainer.appendChild(img);
            
            var datevalue = document.createElement('span');
            datevalue.setAttribute('class', 'postdatetime dt');
            datevalue.innerHTML = result[idx].Date;
            
            var dateTitle = document.createElement('span');
            dateTitle.setAttribute('class', 'postdate');
            dateTitle.innerHTML = "Date:-";
            
            var authorTitle = document.createElement('span');
            authorTitle.setAttribute('class', 'authortitle');
            authorTitle.innerHTML = "Author:-";
            
            var authorname = document.createElement('span');
            authorname.setAttribute('class', 'author');
            authorname.innerHTML = result[idx].Author;
            
            var postdetails = document.createElement('div');
            postdetails.setAttribute('class', 'postdetails');
            postdetails.appendChild(datevalue);
            postdetails.appendChild(dateTitle);
            postdetails.appendChild(authorTitle);
            postdetails.appendChild(authorname);
            
            var posttitle = document.createElement('div');
            posttitle.setAttribute('class', 'posttitle');
            posttitle.setAttribute('id', result[idx].PostID);
            
            postcontainer.appendChild(posttitle);
            postcontainer.appendChild(postdetails);
            postcontainer.appendChild(imgcontainer);
            postcontainer.appendChild(shortpost);
            
            container.appendChild(postcontainer);
        }
    }
}
function getPosts_Error(error) {
}
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() * 0.75) {
        var cnt = document.getElementById('postsdummycount').value;
        if (parseInt(cnt, 10) === -1) {
            var container = document.getElementById('PostContainerDIV');
            var cntr = ((container.children[container.children.length - 1]).children[1]).children[0];
            var attrs = {};
            attrs.Data = {};
            attrs.Data.Timestamp = cntr.getAttribute("title");
            attrs.URL = '/';
            attrs.Method = 'post';
            attrs.DataType = 'json';
            attrs.Success = getPosts_Success;
            attrs.Error = getPosts_Error;
            invokeAJAX(attrs);
        }
    }
});

