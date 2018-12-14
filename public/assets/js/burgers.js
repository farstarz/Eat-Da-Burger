$(function() {
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        
        var newBurger = {
          burger_name: $("#bg").val().trim(),
        };
        console.log("new Burger",newBurger);
        // Send the POST request.
        $.ajax("/api/burger", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
    
      $(".devouver").on("click", function(event){
          event.preventDefault();
          let id = $(this).data("id");
          let burger_name = $(this).data("burger");
          console.log('devouver burger '+burger_name);
          $(this).data("devoured", true);
          $.ajax("/api/burger/"+id, {
              type: "PUT"
          }).then(()=>{
              console.log('burger devouvered!');
              location.reload();
          })
      })
});