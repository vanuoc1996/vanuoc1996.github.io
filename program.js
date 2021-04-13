$(function () {
    $(".main").load("Home.html");
})
// load trang home vvafo main
function onclickHomePage() {
    $(".main").load("Home.html");
}
// load trang create class vào main
function onclickCreateClass() {
    $(".main").load("Create-New-Class.html");
}
// load trang all class vào main
function onclickViewClass() {
    $(".main").load("View-All-Class.html");
    GetAllClass();

}

//  =----------------------------------------------------------------------=
// logout
function Logout() {
    location.replace("login.html");
}

function Login() {
    // call API from server
    //lay data tu model ra
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;


    //khai báo employee dưới dạng json
    var admin = { username: username, password: password };
    console.log(admin);
    var settings = {
        "url": "http://localhost:8080/api/v1/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "username": username, "password": password }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        if (response) {
            // lưu thông tin xuống localstorage
            // localStorage.setItem(username);
            location.replace("AdminWeb.html");
            return;
        } alert("Username or Passwword a wrong")
    });

}



var Class_s = [];
//  ----------------------------------------------------------------------------=
// gọi api GetAllClass
function GetAllClass() {
    var url = "http://localhost:8080/api/v1/class?sortByClassName=true&sortByStartDate=true";
    $.get(url, function (data, status) {
        //error
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        class_s = data;
        console.log(class_s);
        filltoTable();
    });
}
function filltoTable() {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    class_s.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td> ' + item.className + '</td>' +
            '<td>' + item.startDate + '</td>' +
            '<td>' + item.endDate + '</td>' +
            '<td>' + item.classStatus + '</td>' +
            '<td>' + item.studentNumber + '</td>' +
            '<td>' + item.teachingForm + '</td>' +
            '<td>' + item.mentorName + '</td>' +
            '<td>' + item.description + '</td>' +

            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClass(' + item.id + ')"><i class="fa fa-chevron-circle-right" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}
// -------------------------------------------------------------------------
// load detail vào main :)))
function viewDetailClass(id) {
    $(".main").load("View-Detail_Class.html");
    //  function call api :)
    GetClassById(id);
}
// call api getbyid
function GetClassById(id) {

    var url = 'http://localhost:8080/api/v1/class/' + id;
    //Call API from server
    $.get(url, function (data, status) {
        //error 
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        console.log(data);
        fillToDetailClassForm(data);
    });

}
function fillToDetailClassForm(data) {
    document.getElementById("className").innerHTML = data.className;
    document.getElementById("startDate").innerHTML = data.startDate;
    document.getElementById("endDate").innerHTML = data.endDate;
    document.getElementById("classStatus").innerHTML = data.classStatus;
    document.getElementById("studentNumber").innerHTML = data.studentNumber;
    document.getElementById("teachingForm").innerHTML = data.teachingForm;
    document.getElementById("mentorName").innerHTML = data.mentorName;
    document.getElementById("description").innerHTML = data.description;
}
// ------------------------------------------------------------------------
function SaveCreateClass() {
    //lay data tu model ra
    var className = document.getElementById("inputname").value;
    var startDate = document.getElementById("inputstartdate").value;
    var endDate = document.getElementById("inputenddate").value;
    var studentNumber = document.getElementById("inputStudentNumber").value;
    var teachingForm = document.getElementById("inputteachingForm").value;
    var description = document.getElementById("inputdescription").value;

    //khai báo data dưới dạng json
    var class_s = {
        className: className,
        startDate: startDate,
        endDate: endDate,
        studentNumber: studentNumber,
        teachingForm: teachingForm,
        description: description,

    };
    console.log(class_s);


    $.ajax({
        url: 'http://localhost:8080/api/v1/class',
        type: 'POST',
        data: JSON.stringify(class_s), // body
        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        success: function (data, textStatus, xhr) {
            alert("Create Class Success");
            $("#createModal").modal('hide');
        },
        // in ra message tu duong link api

        error(error, textStatus, errorThrown) {
            console.log(error);
            if (error.status == 400) {
                alert(error.responseJSON.detailMessage);
                $("#createModal").modal('hide');

            } else {
                console.log(error);
                alert(error.responseJSON.detailMessage);
            }

        }
    });
}

//---------------------------------------------------------------------=
// hiện thông báo tạo thành công với thông tin đã nhập.

function hidemodalclassSuccess() {
    var className = document.getElementById("inputname").value;
    var startDate = document.getElementById("inputstartdate").value;
    var endDate = document.getElementById("inputenddate").value;
    var studentNumber = document.getElementById("inputStudentNumber").value;
    var teachingForm = document.getElementById("inputteachingForm").value;
    var description = document.getElementById("inputdescription").value;
    var class_s2 = {
        className: className,
        startDate: startDate,
        endDate: endDate,
        studentNumber: studentNumber,
        teachingForm: teachingForm,
        description: description,
    }
    var class_s1 = [
        className = className,
        startDate = startDate,
        endDate = endDate,
        studentNumber = studentNumber,
        teachingForm = teachingForm,
        description = description,
    ];
    console.log(className);
    var i;
    if (!className || !startDate || !endDate || !studentNumber || !teachingForm || !description) {
        console.log("1")
        return alert("Hãy nhập đủ thông tin!");
    }
    $("#createModal").modal('show');
    fillToCreateClassForm(class_s2);

}
function fillToCreateClassForm(class_s2) {
    document.getElementById("className").innerHTML = class_s2.className;
    document.getElementById("startDate").innerHTML = class_s2.startDate;
    document.getElementById("endDate").innerHTML = class_s2.endDate;
    document.getElementById("studentNumber").innerHTML = class_s2.studentNumber;
    document.getElementById("teachingForm").innerHTML = class_s2.teachingForm;
    document.getElementById("description").innerHTML = class_s2.description;
}

// -------------------------------------------------------------------=
// load trang request class
function onclickViewRequestClass() {
    $(".main").load("Class-Request.html");
    GetAllClassRequest();
}
function GetAllClassRequest() {

    var url = "http://localhost:8080/api/v1/classRequest?PageSize&PageNumber=0";
    $.get(url, function (data, status) {
        //error
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        class_s = data;
        console.log(class_s);
        filltoTableClassRequest1();
    });
}
function filltoTableClassRequest(response) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    response.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td>' + item.mentor + '</td>' +
            '<td>' + item.className + '</td>' +
            '<td>' + item.requestStatus + '</td>' +
            '<td>' + item.numberStudent + '</td>' +
            '<td>' + item.teachingForm + '</td>' +
            '<td>' + item.description + '</td>' +
            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClassRequest(' + item.id + ')"><i class="fa fa-chevron-circle-right" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}


function filltoTableClassRequest1() {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    class_s.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td>' + item.mentor + '</td>' +
            '<td>' + item.className + '</td>' +
            '<td>' + item.requestStatus + '</td>' +
            '<td>' + item.numberStudent + '</td>' +
            '<td>' + item.teachingForm + '</td>' +
            '<td>' + item.description + '</td>' +
            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClassRequest(' + item.id + ')"><i class="fa fa-chevron-circle-right" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}
// -----------------------------------------------------------------------------=
function viewDetailClassRequest(id) {
    id_detail = id;
    $(".main").load("View-Detail_Class_Request.html");
    //  function call api :)
    GetClassRequestById(id);

}
function GetClassRequestById(id) {
    var url = 'http://localhost:8080/api/v1/classRequest/' + id;
    //Call API from server
    $.get(url, function (data, status) {
        //error
        if (status == "error") {
            alert("Error when loading data");
            return;
        }
        fillToDetailForm(data);
    });

}
function fillToDetailForm(data) {
    document.getElementById("className").innerHTML = data.className;
    document.getElementById("mentor").innerHTML = data.mentor;
    document.getElementById("requestStatus").innerHTML = data.requestStatus;
    document.getElementById("numberStudent").innerHTML = data.numberStudent;
    document.getElementById("teachingForm").innerHTML = data.teachingForm;
    document.getElementById("description").innerHTML = data.description;

}
// ------------------------------------------------------------------------------=
var id_detail;

function AcceptRequest() {
    console.log(id_detail);
    $.ajax({
        url: 'http://localhost:8080/api/v1/classRequest/acceptRequest/' + id_detail,
        type: 'PUT',

        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        success: function (data, textStatus, xhr) {
            alert("Accept successful");
            viewDetailClassRequest(id_detail);
        },

        // in ra message tu duong link api
        error(error, textStatus, errorThrown) {
            console.log(error);
            if (error.status == 400) {
                alert(error.responseJSON.detailMessage);

            } else {
                console.log(error);
                alert(error.responseJSON.detailMessage);
            }

        }
    });
}
function RefuseRequest() {
    console.log(id_detail);
    $.ajax({
        url: 'http://localhost:8080/api/v1/classRequest/refuseRequest/' + id_detail,
        type: 'PUT',

        contentType: "application/json", // type of body (json, xml, text)
        // dataType: 'json', // datatype return
        success: function (data, textStatus, xhr) {
            alert("Refuse successful");
            viewDetailClassRequest(id_detail);
        },

        // in ra message tu duong link api
        error(error, textStatus, errorThrown) {
            console.log(error);
            if (error.status == 400) {
                alert(error.responseJSON.detailMessage);

            } else {
                console.log(error);
                alert(error.responseJSON.detailMessage);
            }

        }
    });


}
// ----------------------------------------------------------=
function seachName() {

    var name = document.getElementById("seachname").value;
    var settings = {
        "url": "http://localhost:8080/api/v1/class?sortByClassName=true&sortByStartDate=true&ClassName=" + name,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70",
            "Content-Type": "application/json"
        },
    };
    $.ajax(settings).done(function (response) {
        var data = [];
        data = response;
        // error
        if (data == "") {
            console.log("1")
            return alert("Class Name not exist");
        } else
            filltoTableseachName(response);
    });

}
function filltoTableseachName(response) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    response.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td> ' + item.className + '</td>' +
            '<td>' + item.startDate + '</td>' +
            '<td>' + item.endDate + '</td>' +
            '<td>' + item.classStatus + '</td>' +
            '<td>' + item.studentNumber + '</td>' +
            '<td>' + item.teachingForm + '</td>' +
            '<td>' + item.mentorName + '</td>' +
            '<td>' + item.description + '</td>' +

            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClass(' + item.id + ')"><i class="fa fa-chevron-circle-right" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}
// --------------------------------------------------------------------=
function filterbyBegin() {
    var settings = {
        "url": "http://localhost:8080/api/v1/class?sortByClassName=true&sortByStartDate=true&Status=Begin",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });
}
function filltoTablefilterName(response) {
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    response.forEach(function (item) {
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td> ' + item.className + '</td>' +
            '<td>' + item.startDate + '</td>' +
            '<td>' + item.endDate + '</td>' +
            '<td>' + item.classStatus + '</td>' +
            '<td>' + item.studentNumber + '</td>' +
            '<td>' + item.teachingForm + '</td>' +
            '<td>' + item.mentorName + '</td>' +
            '<td>' + item.description + '</td>' +

            '<td>' +
            '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="viewDetailClass(' + item.id + ')"><i class="fa fa-chevron-circle-right" style="font-size:24px"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });
}
function filterbyWaiting() {

    var settings = {
        "url": "http://localhost:8080/api/v1/class?sortByClassName=true&sortByStartDate=true&Status=Waiting",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });
}

function filterbyAccept() {
    var settings = {
        "url": "http://localhost:8080/api/v1/class?sortByClassName=true&sortByStartDate=true&Status=Accepted",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });

}
function Page1() {
    var settings = {
        "url": "http://localhost:8080/api/v1/class?PageNumber=0&sortByClassName=true&sortByStartDate=true",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });
}
function Page2() {
    var settings = {
        "url": "http://localhost:8080/api/v1/class?PageNumber=1&sortByClassName=true&sortByStartDate=true",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });
}
function Page3() {
    var settings = {
        "url": "http://localhost:8080/api/v1/class?PageNumber=2&sortByClassName=true&sortByStartDate=true",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTablefilterName(response);
    });
}

function Pagerequest1() {
    var settings = {
        "url": "http://localhost:8080/api/v1/classRequest?PageSize&PageNumber=0",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": ""
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTableClassRequest(response)
    });
}

function Pagerequest2() {
    var settings = {
        "url": "http://localhost:8080/api/v1/classRequest?PageSize&PageNumber=1",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTableClassRequest(response);
    });
}
function Pagerequest3() {
    var settings = {
        "url": "http://localhost:8080/api/v1/classRequest?PageSize&PageNumber=2",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 202cb962ac59075b964b07152d234b70"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        filltoTableClassRequest(response);
    });
}
