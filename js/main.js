$(document).bind("pagebeforecreate", function(evt){
	console.log("pagebeforecreate " + evt.target.id);
	var id = evt.target.id;
	var h = jQuery("#template [data-role='header']").clone();
	h.insertBefore(jQuery("#" + id + " .header"));
	var f = jQuery("#template [data-role='footer']").clone();
	f.insertBefore(jQuery("#" + id + " .footer"));
	jQuery("#" + id + " [data-role='content']").prepend(jQuery("#template [data-role='content'] .content-header").clone());
	util.getURLParams();
	//First load the cart from a cookie.  If no cookie found, an empty cart is created
	cart.load();
	if(evt.target.id=="category"){
		ui.buildCategoryPage();
	}
	if(evt.target.id=="cart") {
		ui.buildCartPage();
	}
	if(evt.target.id=="confirm"){
		ui.buildConfirmPage();
		cart.reset();
	}

/*	
	$("#wrapper").css("visibility", "hidden");

	//The following if statements will build the page content, based on what kind of page it is
	if(util.isPage("billing"))
	{
		ui.buildBillingPage();
		readyBilling();
	}
	if(util.isPage("careers"))
	{
		ui.buildCareersPage();
	}
	if(util.isPage("cart"))
	{
		if(util.params["addprodid"])
		{
			cart.add(util.params["addprodid"]);
		}
		if(util.params["remove"])
		{
			cart.remove(util.params["remove"]);
		}
		ui.buildCartPage();
		readyCart();
	}
	if(util.isPage("category"))
	{
		ui.buildCategoryPage();
		readyCategory();
	}
	if(util.isPage("confirm"))
	{
		ui.buildOrderConfirmPage();
		readyOrderConfirm();
		cart.reset();
	}
	if(util.isPage("contact"))
	{
		ui.buildContactPage();
	}
	if(util.isPage("emailsignup"))
	{
		ui.buildEmailSignupPage();
	}
	if(util.isPage("home"))
	{
		ui.buildHomePage();
		readyHome();
	}
	if(util.isPage("info"))
	{
		ui.buildInfoPage();
	}
	if(util.isPage("noresult"))
	{
		ui.buildNoResultPage();
		readyNoResult();
	}
	if(util.isPage("product"))
	{
		ui.buildProductPage();
		readyProduct();
	}
	if(util.isPage("search"))
	{
		ui.buildSearchPage();
		readySearch();
	}
	ui.updateLinks();
	$("#wrapper").css("visibility", "visible");
*/
});

if(typeof window.console === "undefined" || !config.isLoggingEnabled)
{
	var console = window.console = {};
	console.dummy = true;
	console.log = function() {};
	console.info = function() {};
	console.debug = function() {};
	console.error = function() {};
	console.group = function() {};
	console.groupEnd = function() {};
}