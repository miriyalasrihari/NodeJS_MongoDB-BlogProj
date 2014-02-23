// Date Format 25th Jun 2013
var dateFormat = function dateFormat(date) {
    var m_names, d, curr_date, sup;
    m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"];
    d = new Date(date);
    curr_date = d.getDate();
    sup = "";
    if (curr_date === 1 || curr_date === 21 || curr_date === 31) {
        sup = "st";
    } else if (curr_date === 2 || curr_date === 22) {
        sup = "nd";
    } else if (curr_date === 3 || curr_date === 23) {
        sup = "rd";
    } else {
        sup = "th";
    }
    return curr_date + sup + " " + m_names[d.getMonth()] + " " + d.getFullYear();
};

//Time Format 12 hrs =  
var timeFormat = function timeFormat(date) {
    var d, hours, mm, ampm, hh;
    d = new Date(date);
    hours = d.getHours();
    mm = d.getMinutes();
    hh = hours === 0 ? "12" : hours > 12 ? hours - 12 : hours;
    mm = (mm < 9 ? "0" : "") + mm;
    ampm = hours < 12 ? "A.M" : "P.M";
    return hh + ":" + mm + " " + ampm;
};

//to get Date and Time of the format "25th Jun 2013 5:38 P.M"
Object.defineProperty(Date.prototype, "toCustomDT", {
    configurable : false,
    enumerable : true,
    value : function() {
        return dateFormat(this) + " " + timeFormat(this);
    }
});

// to get Date and Time of the format "YYYY-MM-DDTHH:MM:SS+05:30"
Object.defineProperty(Date.prototype, "toJSON", {
    configurable : false,
    enumerable : true,
    value : function() {
        var date, time, yyyy, month, dd;
        yyyy = this.getFullYear();
        month = this.getMonth();
        dd = this.getDate();
        dd = dd < 10 ? "0" + dd : dd;
        month = month < 9 ? "0" + (month + 1) : month + 1;
        date = yyyy + "-" + month + "-" + dd + "T";
        time = this.toTimeString().split(/\s+/)[0] + "+05:30";
        return date + time;
    }
});

//trim the string
Object.defineProperty(String.prototype, "trim", {
    configurable : false,
    enumerable : true,
    value : function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
});