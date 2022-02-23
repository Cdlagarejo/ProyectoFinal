let user ={user_name : undefined
    ,email : undefined
    , password : undefined
};

let book = {id: undefined,
    author:undefined,isbn : undefined,publication_date :  undefined,title:  undefined};

var idBook = undefined;

let action = "register";

$("#btnGuardar").on('click', () => {
    save_info_book();
});

function save_info_book() {
    
    book.author =  $("#authorBook").val();
    book.isbn =  $("#isbnBook").val();
    book.publication_date =  $("#dateBook").val();
    book.title =  $("#titleBook").val();
    book.id =   $("#idLibro").val();


    if (action == "register") {
        new_update_book('book/insert','POST',book);
    } else {
        new_update_book('book/update','PUT',book);
    }

    $("#labelBookSettings").text("Registrar un Libro");
    $("#frmBook").hide();
    $("#btnAñadir").show();
    AllBooks('book/get_all','GET',undefined);
    LimpiarFormularioLibros();
}

function new_update_book(url, method, data) {

    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        headers: {"Authorization":JSON.parse(sessionStorage.user).token}
        ,
        dataType: 'json'
       
    }).done(  success => {
        book = success.object[0];

        alertify.success(success.mensaje);

        
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
}


function delete_book(param) {
    
    $("#idLibro").val(param);
    book.id =   $("#idLibro").val();
    DeleteBook(`book/delete`,'DELETE',book);
    AllBooks('book/get_all','GET',undefined);
}

function date_to_format (date) {

    date = new Date(date);
    return `${ date.getFullYear()}-${((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))}-${((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)))}`;
}

function modify_book(param) {
    $("#labelBookSettings").text("Modificar libro");
    $("#idLibro").val(param);
    $("#frmBook").show();
    $("#btnAñadir").hide();
    GetBookById(`book/get_by_id/${param}`,'GET',undefined);
    action = "modify";

}

function LimpiarFormularioLibros () {
    $("#titleBook").val("");
    $("#idLibro").val("");   
    $("#authorBook").val("");
    $("#isbnBook").val("");
    $("#dateBook").val("");

}

function DeleteBook (url, method, data) {
    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        headers: {"Authorization":JSON.parse(sessionStorage.user).token}
        ,
        dataType: 'json'
       
    }).done(  success => {
        book = success.object[0];
        alertify.success(success.mensaje);

        
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
}

function GetBookById (url, method, data) {
    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        dataType: 'json'
       
    }).done(  success => {
        book = success.object[0];

        $("#titleBook").val(book.title);
        $("#idLibro").val(book.id);
        $("#authorBook").val(book.author);
        $("#isbnBook").val(book.isbn);
        $("#dateBook").val(date_to_format(book.publication_date));

        alertify.success(success.mensaje);

        
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
}
function AllBooks(url, method, data) {
    let userSession =  sessionStorage.user;
    
    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        dataType: 'json'
       
    }).done(  success => {

        $("#books").find("tr").remove();
        for(var book in success.object) {
            
            $('#books').append(`
            <tr>
                <th scope="row">${success.object[book].id}</th>
                <td>${success.object[book].title}</td>
                <td>${success.object[book].isbn}</td>
                <td>${success.object[book].author}</td>
                <td>${success.object[book].publication_date}</td>
                ${(userSession) ? ' <td><button class="btn btn-danger" onclick="delete_book('+success.object[book].id+')"> Eliminar </button><button class="btn btn-warning" onclick="modify_book('+success.object[book].id+')"> Modificar </button></td>': ''}
            </tr>
          `);
            
        }
        alertify.success(success.mensaje);

        
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
}

function Register(url, method, data) {

    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        dataType: 'json'
       
    }).done(  success => {
  
        alertify.success(success.mensaje);
        $('#registroUsuario').modal('hide')
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
}

function Login(url, method, data) {1

    $.ajax({
        type: method,
        url: `http://localhost:3000/${url}`,
        data: data,
        dataType: 'json'
       
    }).done(  success => {
   
        sessionStorage.setItem('user', JSON.stringify(success));
        alertify.success(success.mensaje);
        verify_session();
        AllBooks('book/get_all','GET',undefined);
        $('#inicioSesion').modal('hide')
        
    }).fail( error =>  {
        const {responseJSON} = error;
        alertify.error(responseJSON.mensaje);
   
    } );
    
}
$("#btnIniciarSesion").on('click',async () => {
    let userEmail = $("#emailLogin").val().trim();
    let userPassword = $("#passwordLogin").val().trim();
    user.email = userEmail;
    user.password = userPassword;
    Login('user/auth','POST',user);    
});

$("#btnAñadir").on('click',async () => {
    action = "register";
    $("#labelBookSettings").text("Registrar un Libro");
    $("#frmBook").show();
    $("#btnAñadir").hide();
    LimpiarFormularioLibros();
});
$("#btnCancelar").on('click',async () => {
    $("#labelBookSettings").text("Registrar un Libro");
    $("#frmBook").hide();
    $("#btnAñadir").show();
    action = undefined;

    book = undefined;
    idBook = undefined;
    LimpiarFormularioLibros();
});

function verify_session () {
    $("#frmBook").hide();
    if (sessionStorage.user) {
        $("#sesionboton").hide();
        $("#registroboton").hide();
        $("#userNameLbl").show();
        $("#logout").show();
        $("#acciones").show();
        $("#userNameLbl").text(JSON.parse(sessionStorage.user).email);
        $("#btnAñadir").show();
        
    } else {
        $("#sesionboton").show();
        $("#registroboton").show();
        $("#userNameLbl").hide();
        $("#logout").hide();
        $("#acciones").hide();
        $("#btnAñadir").hide();

    }
}

$(window).on('load',() => {
    
    AllBooks('book/get_all','GET',undefined);
    verify_session ();

});


$("#logout").on('click',async () => {
    sessionStorage.clear();
    verify_session ();

});


$("#btnRegistroUsuario").on('click',async () => {
    let userName = $("#userNameRegister").val().trim();
    let userEmail = $("#emailRegister").val().trim();
    let userPassword = $("#passwordRegister").val().trim();
    user.user_name = userName;
    user.email = userEmail;
    user.password = userPassword;
    Register('user/register','POST',user);    
});