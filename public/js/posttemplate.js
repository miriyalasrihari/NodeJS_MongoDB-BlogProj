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
function likeajax_Success(result) {
    document.getElementById('likesCount').innerHTML = result.Likes;
}
function clearCommentFields() {
    $('#Comment').removeAttr("style");
    $('#Email').removeAttr("style");
    $('#Name').removeAttr("style");
    $('#Comment').val('');
    $('#Email').val('');
    $('#Name').val('');

}
function postComment_Success(result) {
    clearCommentFields();
    var cntComment = document.getElementById('cntComment');
    if (cntComment) {
        cntComment.innerHTML = parseInt(cntComment.innerHTML, 10) + 1;
    }
    var tbl = document.getElementById('tblComments');
    var rw = tbl.insertRow(0);
    var td = document.createElement('td');
    var p = document.createElement('p');
    var p2 = document.createElement('p');
    p.setAttribute("class", "comment");
    p.innerHTML = result.Comment;
    var span_author = document.createElement('span');
    span_author.setAttribute("class", "commentedby");
    span_author.innerHTML = result.Author;
    var span_datetitle = document.createElement('span');
    span_datetitle.setAttribute("class", "postdate toright");
    span_datetitle.innerHTML = "Date:-";
    var span_date = document.createElement('span');
    span_date.setAttribute("class", "postdatetime toright dt");
    span_date.setAttribute("title", result.Date);
    span_date.innerHTML = dateFormat(result.Date) + " "
        + timeFormat(result.Date);
    td.appendChild(p);
    p2.appendChild(span_author);
    p2.appendChild(document.createElement('br'));
    p2.appendChild(span_date);
    p2.appendChild(span_datetitle);
    td.appendChild(p2);
    rw.appendChild(td);
}
function getAllComment_Success(result) {
    var tbl = document.getElementById('tblComments');
    for ( var idx = 0; idx < result.length; idx++) {
        var rc = tbl.rows.length - 1;
        console.log(rc + "   :ROWS COUNT");
        var rw = tbl.insertRow(rc);
        var td = document.createElement('td');
        var p = document.createElement('p');
        var p2 = document.createElement('p');
        p.setAttribute("class", "comment");
        p.innerHTML = result[idx].Comment;
        var span_author = document.createElement('span');
        span_author.setAttribute("class", "commentedby");
        span_author.innerHTML = result[idx].Author;
        var span_datetitle = document.createElement('span');
        span_datetitle.setAttribute("class", "postdate toright");
        span_datetitle.innerHTML = "Date:-";
        var span_date = document.createElement('span');
        span_date.setAttribute("class", "postdatetime toright dt");
        span_date.setAttribute("title", result[idx].Date);
        span_date.innerHTML = dateFormat(result[idx].Date) + " "
            + timeFormat(result[idx].Date);
        td.appendChild(p);
        p2.appendChild(span_author);
        p2.appendChild(document.createElement('br'));
        p2.appendChild(span_date);
        p2.appendChild(span_datetitle);
        td.appendChild(p2);
        rw.appendChild(td);
    }
    tbl.deleteRow(tbl.rows.length - 1);
}
function likeajax_Error(result) {
}
function likeajax(like) {
    var attrs = {};
    attrs.Data = {};
    attrs.Data.PostID = $('#PostID').val();
    attrs.Data.Like = Boolean(like);
    attrs.URL = '/like';
    attrs.Method = 'post';
    attrs.DataType = 'json';
    attrs.Success = likeajax_Success;
    attrs.Error = likeajax_Error;
    invokeAJAX(attrs);
}
function CommentFieldsValidation() {
    $('#Comment').removeAttr("style");
    $('#Email').removeAttr("style");
    $('#Name').removeAttr("style");
    var cmt = $('#Comment').val();
    var email = $('#Email').val();
    var name = $('#Name').val();
    if (cmt.length >= 5 && email.length >= 5 && name.length >= 3) {
        return true;
    } else {
        if (cmt.length < 5) {
            $('#Comment').attr("style", "border-color:red");
        }
        if (email.length < 5) {
            $('#Email').attr("style", "border-color:red");
        }
        if (name.length < 3) {
            $('#Name').attr("style", "border-color:red");
        }
    }
    return false;
}
function postcomment() {
    if (CommentFieldsValidation() === true) {
        var attrs = {};
        attrs.Data = {};
        attrs.Data.PostID = $('#PostID').val();
        attrs.Data.Comment = $('#Comment').val();
        attrs.Data.Email = $('#Email').val();
        attrs.Data.Name = $('#Name').val();
        attrs.URL = '/post/' + attrs.Data.PostID;
        attrs.Method = 'post';
        attrs.DataType = 'json';
        attrs.Success = postComment_Success;
        attrs.Error = likeajax_Error;
        invokeAJAX(attrs);
    }
}
function getAllComments() {
    var tbl = document.getElementById('tblComments');
    var attrs = {};
    attrs.Data = {};
    attrs.Data.PostID = $('#PostID').val();
    attrs.Data.Timestamp = tbl.rows[tbl.rows.length - 2].children[0].children[1].children[2]
        .getAttribute("title");
    attrs.URL = '/comments';
    attrs.Method = 'post';
    attrs.DataType = 'json';
    attrs.Success = getAllComment_Success;
    attrs.Error = likeajax_Error;
    invokeAJAX(attrs);
}