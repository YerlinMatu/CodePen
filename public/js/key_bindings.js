var KeyBindings = (function() {

    /***********************
    * Manages the key bindings for Code Pen
    *
    * Code Pen, let's get fancy
    * Code Pen, women wear dresses, men use Code Pen
    * Code Pen, don't let your mom catch you using it
    * Code Pen, hide your women, hide your childen
    ************************/

    var KeyBindings = {

        lastKeyPressed:  0,
        commandKeyPressed: false,
        
        HTMLeditor: '', 
        CSSeditor: '', 
        JSeditor: '',
        
        // alextodo, map keys to strings for clarity

        init: function(HTMLeditor, CSSeditor, JSeditor) {
            this.bindKeys();
            this.HTMLeditor = HTMLeditor;
            this.CSSeditor = CSSeditor;
            this.JSeditor = JSeditor;
        },
        
        giveEditorFocus: function(editor) {
            editor.focus();
            KeyBindings.setCursorToEnd(editor);
        },
        
        setCursorToEnd: function(editor) {
            var text = editor.getValue();
            
            // set the cursor to the end of the editor
            // Make sure it's at the end by line num and char num to
            // same value as the actual number of chars, CodeMirror will
            // simply move the cursor to the end
            editor.setCursor(text.length, text.length, true);
        },

        showOverlay: function() {
            // $("#overlay").show();
        },

        hideOverlay: function() {
            // $("#overlay").hide();
        },
        
        bindKeys: function() {
            $(document).on('keydown', function(event) {
                // mac os x uses command key (91) as alt key
                // every other OS will use the control key (17)
                if(event.keyCode == 17 || event.keyCode == 91) {
                    KeyBindings.commandKeyPressed = true;
                    
                    // Because keyup is so unreliable (we may not capture the keyup event)
                    // because the browser swallows it
                    // we automatically set it to false after 1 second
                    // setTimeout(function() {
                    //     KeyBindings.commandKeyPressed = false;
                    // }, 1000);
                }
            });

            window.onblur = function() {
                console.log("blur");
            };
            
            $(document).on('keyup', function(event) {
                if(event.keyCode == 17 || event.keyCode == 91) {
                    KeyBindings.commandKeyPressed = false;
                }
            });
            
            $(document).on('keydown', function(event) {
                stop = false;
                
                // Process all the altKey pressed events
                if(KeyBindings.commandKeyPressed) {
                    if(event.keyCode == 49) {
                        // cmd + 1
                        stop = true;
                        Main.openExpandedArea('#box-html');
                        // alextodo, is this really the best place for it?
                        // have a wrapper around the editors? better place for it no?
                        KeyBindings.giveEditorFocus(KeyBindings.HTMLeditor);
                        KeyBindings.showOverlay();
                    }
                    else if(event.keyCode == 50) {
                        // cmd + 2
                        stop = true;
                        Main.openExpandedArea('#box-css');
                        KeyBindings.giveEditorFocus(KeyBindings.CSSeditor);
                        KeyBindings.showOverlay();
                    }
                    else if(event.keyCode == 51) {
                        // cmd + 3
                        stop = true;
                        Main.openExpandedArea('#box-js');
                        KeyBindings.giveEditorFocus(KeyBindings.JSeditor);
                        KeyBindings.showOverlay();
                    }
                    else if(event.keyCode == 13) {
                        // cmd + return
                        // compile and run code
                        stop = true;
                        CodeRenderer.compileContent(true);
                    }
                    else if(event.keyCode == 75) {
                        // command + K
                        // fork this project
                        // alextodo, what does fork this project mean?
                        // start with another, save to local storage?
                        // then start using that? yea
                        CData.forkData();
                        window.open('/');
                    }
                    else if(event.keyCode == 71) {
                        // command + g
                        // create a gist
                        stop = true;
                        CodeRenderer.createGist();
                    }
                    else if(event.keyCode == 83) {
                        // command + s
                        console.log('save');
                        // alextodo, i think the command key is captured wrong,
                        // you can't type s
                        // stop = true;
                    }
                    else if(event.keyCode == 76) {
                        // command + l
                        // need to pull the actual slug once it's saved
                        // what about unsaved accounts?
                        // window.open('/slug/fullpage/');
                    }
                }
                
                if(event.keyCode == 27) {
                    Main.closeExpandedAreas();
                    KeyBindings.hideOverlay();
                }
                
                if(stop) {
                    $.Event(event).stopPropagation();
                    return false;
                }
            });
        }
    };

    // This ends the KeyBindings module

    return KeyBindings;

})();