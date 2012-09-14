var cart = {};
cart.load = function()
{
	console.log("cart.load");
	cart.items = [];
	var cartstr = util.getCookie("cart");
	var prodidpatt = /prodid/;
	var prods = cartstr.split("^");
	for(var i = 0; i < prods.length; i++)
	{
		var prod = null;
		var qty = null;
		var pairs = prods[i].split("&");
		for(var pair = 0; pair<pairs.length; pair++)
		{
			var tmp = pairs[pair].split("=");
			var key = tmp[0];
			var value = (tmp.length>1 ? tmp[1] : null);
			if(key==="prodid")
			{
				prod = products.find(value);
			}
			if(key==="qty")
			{
				qty = value;
			}
			if(prod && qty)
			{
				var newitem = {};
				newitem.product = prod;
				newitem.qty = qty;
				cart.items[cart.items.length] = newitem;
			}
		}
	}
}

cart.find = function(prodid)
{
	console.log("cart.find " + prodid);
	for(var i = 0; i < cart.items.length; i++)
	{
		if(cart.items[i].product.prodid === prodid)
		{
			return cart.items[i];
		}
	}
}

cart.add = function(prodid)
{
	console.log("cart.add " + prodid);
	var prod = products.find(prodid);
	if(prod) {
		if(cart.find(prodid))
		{
			cart.find(prodid).qty++;
		}
		else
		{
			cart.items[cart.items.length] = {};
			cart.items[cart.items.length - 1].product = prod;
			cart.items[cart.items.length - 1].qty = 1;
		}
		cart.write();
		location.href = config.singlePageMode ? config.singlePageName + "?page=cart" : "cart.htm";
	}
}

cart.remove = function(prodid)
{
	for(var i = 0; i < cart.items.length; i++)
	{
		if(cart.items[i].product.prodid === prodid)
		{
			cart.items.splice(i, 1);
			cart.write();
		}
	}
	location.href = config.singlePageMode ? config.singlePageName + "?page=cart" : "cart.htm";
}

cart.write = function()
{
	console.log("cart.write");
	var cartstr = "";
	if(cart && cart.items && cart.items.length>0)
	{
		for(var i = 0; i < cart.items.length; i++)
		{
			var prodid = cart.items[i].product.prodid;
			var qty = cart.items[i].qty;
			if(cartstr) cartstr += "^";
			cartstr += "prodid=" + prodid;
			cartstr += "&qty=" + qty;
		}
	}
	util.setCookie("cart", cartstr);
}

cart.reset = function() {
	console.log("cart.reset");
	cart.items = [];
	cart.write();
}