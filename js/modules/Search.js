import $ from 'jquery';

class Search {
    
    constructor(){
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        this.searchField = $("#search-term");
        this.events();
        this.isOverlayOpen = false;
        this.typingTimer;
        this.resultsDiv = $('#search-overlay__results');
        this.isSpinnerVisible = false;
        this.previousValue;
    }
    
    // Events
    events(){
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        
    }
    
    // Methods
    openOverlay() {
        this.searchOverlay.addClass('search-overlay--active');
        $("body").addClass("body-no-scroll");
        this.isOverlayOpen = true;
    }
    
    closeOverlay() {
        this.searchOverlay.removeClass('search-overlay--active');
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;
    }
    
    keyPressDispatcher(e) {
        // Key Codes
        // 83: s
        // 27: esc
        var code = e.keyCode;
        
        if(code == 83 && !this.isOverlayOpen && $("input, textarea").is(":focus")) {
            this.openOverlay();
        } else if(code == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }
    
    typingLogic() {
        
        if(this.searchField.val() != this.previousValue) {
            clearTimeout(this.typingTimer);
            if(this.searchField.val() != ""){
               if(!this.isSpinnerVisible){
                this.resultsDiv.html('<div class="spinner-loader"></div>');
                this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this),800);
            } else {
                this.resultsDiv.html("");
                this.isSpinnerVisible = false;
            }
        }
        
        this.previousValue = this.searchField.val();
        
    }
    
    getResults() {
        this.resultsDiv.html("Hey this is a text");
        this.isSpinnerVisible = false;
    }
    
}

export default Search;