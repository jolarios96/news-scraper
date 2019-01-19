$("#article-wrapper").on("click", ".save-btn", function () {
    console.log($(this).parent().data("id"));

    const selected = $(this).parent();
    console.log(selected);
    $(this).parents(".card").remove();

    $.ajax({
        type: "PUT",
        url: "/update/" + selected.data("id"),
    });
});

$("#article-wrapper").on("click", ".delete-btn", function () {
    const selected = $(this).parent();
    console.log(selected);
    $(this).parents(".card").remove();

    $.ajax({
        type: "DELETE",
        url: "/delete/" + selected.data("id"),
    });
});
