$(document).ready(() => {
    $(".open-modal").click(event => {
        $(".modal").addClass("is-active");
    });
    $(".modal-background").click(event => {
        $(".modal").removeClass("is-active");
    });
    $(".close-modal").on("click", function (event) {
        $(".modal").removeClass("is-active");
    });
});
