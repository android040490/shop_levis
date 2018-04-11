import "./styles/main.sass";
import * as jQuery from "jquery";
import "popper.js";
import "bootstrap";

$(function(){
    $( window ).resize(function(){
        $(".model-photos_photo-view").height($(".model-photos_photo-view").width()*0.8);
    });

    $(".model-photos_preview-item").on("click", function(event){
        $(".model-photos_photo-view img").attr("src", $("img", this).attr("src"));
        $(".model-photos_preview-item").removeClass("active-img");
        $(this).addClass("active-img");
        $(".model-photos_photo-view").height($(".model-photos_photo-view").width()*0.8);
    });

    $(window).trigger("resize");
    // CHOICE OF SHOES

    $(".product-item").on("click", function(event){
        $(".product-item").removeClass("active-img");
        $(this).addClass("active-img");

        $(".model-photos_preview-item").removeClass("active-img");
        $(".model-photos_preview-item").first().addClass("active-img");

        let srcModelOfBoot = $(".product-item_img img", this).attr("src")
        let nameModel = srcModelOfBoot.split("/")[srcModelOfBoot.split("/").length - 1].split(".")[0];
        
        $.getJSON("/src/models_of_boots.json", function(data){
            $(".model-photos_photo-view img").attr("src", data[nameModel].front);
            $(".model-description_title h5").html(data[nameModel].name);
            $(".model-description_title h3").html(data[nameModel].name2);
            
            $(".model-photos_preview-item img").each(function(index, element){
                $(element).attr("src", data[nameModel][$(element).attr("data-model")]);
            });
        });
    });

    // SCROLL PRODUCT

    $(".product-item").on("click.scroll", function(event){
        let topSize = $(".model-photos_photo-view").offset().top;
        $('body, html').animate({scrollTop: topSize}, 500);
    });

    // Gallery show detailed photo
    $(".gallery-section_gallery-item").on("click", function(){
        if ($(document).width()>450){
            $(".gallery-section_detailed-photo-wrapper").css("visibility", "visible");
            $(".gallery-section_detailed-photo-wrapper img").attr("src", $("img", this).attr("src"));
            $(".gallery-section_detailed-photo-wrapper").animate({opacity: 1}, 300);
        };
    });

    // Close detailed photo
    $(".gallery-section_close-photo").on("click", function(){
        $(".gallery-section_detailed-photo-wrapper").animate({opacity: 0}, 300 , function(){
            $(this).css("visibility", "hidden");
        });
    })

    
});