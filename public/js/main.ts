$(document).ready(() => {
    $("a.open-modal[id]").on("click", event => {
    	event.preventDefault()
		console.log($(event.target).attr("id"))
		let selector = $(event.target).attr("id") 
        $(`.modal.${selector}`).addClass("is-active");

    });
    $(".modal-background").click(event => {
        $(".modal").removeClass("is-active");
    });
    $(".close-modal").on("click", function (event) {
        $(".modal").removeClass("is-active");
    });
    $(".delete-comment").on("click", function(event){
        $.ajax({
            type: "DELETE",
            url:`/delete/${this.id}`
        }).then(function(result){
            console.log("delete success")
        })
    })
});
