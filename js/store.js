jQuery(document).bind("pageinit", function(evt, data){
	//console.log(data);
})
$(document).bind("pageinit", function()
{
    if (navigator.userAgent.indexOf("Android") != -1)
    {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    }
});