$("#article-wrapper").on("click", ".save-btn", function () {
    console.log($(this).parent().data("id"));
});

$("#article-wrapper").on("click", ".delete-btn", function () {
    console.log($(this).parent().data("id"));
});
