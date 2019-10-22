$(function () {
    let table = $('#tableBooks')

    downloadBooks(table)


})

function downloadBooks(table) {
    //table.html("") i jeszcze ten button odswiez u Adama

    $.ajax(
        {
            //to jest do serwera z warsztatu 4 z forka - rest_api -> url: "http://localhost:8282/books",
            url: "http://localhost:8080/books",
            method: "GET",
            // jsonpCallback: 'jsonCallback',
            // contentType: "application/json",
            dataType: "json"
        }
    ).done(function (response) {
        //console.log(response)

        response.forEach(function (item) {
            showBook(table, item)
        })
    })
}


function showBook(table, book) {
    //console.log(book)
    let row = $(`<tr>
        <th scope="row">${book.id}</th>
        <th>${book.title}</th>
        <th>${book.isbn}</th>
        <th><button class="btn btn-info" data-id="${book.id}">Usuń</button></th>
        </tr>`)

    let div = $(`<div></div>`).css("display", "none")


    table.append(row)
    table.append(div)

    $(row).find("th").eq(1).on('click', function () {
        downloadDetailsAndSlide(book.id, div)
    })


}

function downloadDetailsAndSlide(id, div) {

    $.ajax(
        {
            //url zmieniony
            url: `http://localhost:8080/books/${id}`,
            method: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        console.log(response)

        $(div).text(`${response.author}, ${response.publisher}, ${response.type}`)

        $(div).slideDown(5000)
    })

}