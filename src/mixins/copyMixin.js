import store from "@/store/index.js";


export default {
    methods: {
        copyTextToClipboard(text){
            if(!navigator.clipboard){
                this.fallbackCopyTextToClipboard(text)
                return 
            }
        
            var notification = {
                type: '',
                text: ''
            };
            navigator.clipboard.writeText(text)
            .then(function(){
                notification.type = 'success';
                notification.text = "Copy to clipboard successful"
                store.dispatch('notification/add', notification)
            }, function(error){
                notification.type = 'error';
                notification.text = ' The text could not be copied: ' + error
                store.dispatch('notification/add', notification)
            })
            },
            fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
        
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
        
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        
            var notification = {
                type: '',
                text: ''
            };
        
            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                console.log("Fallback: Copying cert command was " + msg);
                notification.type = 'success';
                notification.text = "Fallback: Copying cert command was " + msg
                store.dispatch('notification/add', notification)
            } catch (err) {
                notification.type = 'error';
                notification.text = "Fallback: Oops, unable to copy: " + err
                store.dispatch('notification/add', notification)
            }
        
            document.body.removeChild(textArea);
            }
    }
}