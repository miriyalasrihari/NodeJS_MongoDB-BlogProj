function timeFormat(date) {
    var d, hours, mm, ampm, hh;
    d = new Date(date);
    hours = d.getHours();
    mm = d.getMinutes();
    hh = hours === 0 ? "12" : hours > 12 ? hours - 12 : hours;
    mm = (mm <= 9 ? "0" : "") + mm;
    ampm = hours < 12 ? " A.M" : " P.M";
    return hh + ":" + mm + ampm;
};
function dateFormat(date) {
    var m_names, d, curr_date, sup;
    m_names = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec" ];
    d = new Date(date);
    curr_date = d.getDate();
    sup = "";
    if (curr_date === 1 || curr_date === 21 || curr_date === 31) {
        sup = "st ";
    } else if (curr_date === 2 || curr_date === 22) {
        sup = "nd ";
    } else if (curr_date === 3 || curr_date === 23) {
        sup = "rd ";
    } else {
        sup = "th ";
    }
    return curr_date + sup + m_names[d.getMonth()] + " "
        + d.getFullYear();
};
$(document).ready(
    function() {

        $('.dt').each(
            function() {
                this.innerHTML = dateFormat(this.innerHTML) + " "
                    + timeFormat(this.innerHTML);
            });
        $('#serach').click(function() {
            $('#searchbox').animate({
                'width' : 'toggle'
            }, 500, function() {
                $('#search').focus();
            });
        });
        $('.rightnewsfeed li').click(function() {
            this.children[0].click();
        });
        if (document.getElementById("divpost")) {
            var str = document.getElementById("divpost").innerHTML;
            str = str.replace(/&lt;/g, "<");
            str = str.replace(/&gt;/g, ">");
            document.getElementById("divpost").innerHTML = str;
        }
        $('.posttitle').click(function() {
            window.location.href = "/post/" + this.id;
        });
        $('.shortpost').each(function() {
            var str = this.innerHTML;
            str = str.replace(/&lt;p&gt;/g, "");
            str = str.replace(/&lt;pre&gt;/g, "");
            str = str.replace(/&lt;\/p&gt;/g, "");
            str = str.replace(/&lt;\/pre&gt;/g, "");
            this.innerHTML = str;
        });
        if (document.getElementById("paragraph")
            && document.getElementById("code")) {

            $('#paragraph').click(function() {
                $("#Post").val($("#Post").val() + "<p>write here</p>");
            });
            $('#code').click(function() {
                $("#Post").val($("#Post").val() + "<pre>write here</pre>");
            });
        }
    });
