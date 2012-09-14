var ui = {};
ui.buildCategoryPage = function(){
	var catid = util.params.catid;
	if(!catid) return;
	var prods;
	switch (catid) {
		case "1":
			prods = products.men;
			break;
		case "2":
			prods = products.women;
			break;
		case "3":
			prods = products.boys;
			break;
		case "4":
			prods = products.girls;
			break;
		case "1000":
			prods = products.men.pants;
			break;
		case "2000":
			prods = products.men.shirts;
			break;
		case "3000":
			prods = products.women.skirts;
			break;
		case "4000":
			prods = products.women.tops;
			break;
		case "5000":
			prods = products.boys.shirts;
			break;
		case "6000":
			prods = products.boys.pants;
			break;
		case "7000":
			prods = products.girls.tops;
			break;
		case "8000":
			prods = products.girls.pants;
			break;
		default:
			prods = [];
	};
	jQuery.each(prods, function(idx, prod) {
		var li = jQuery("<li>");
		var a = jQuery("<a>").addClass("product-list");
		li.append(a);
		var href = "#product&prodid=" + prod.prodid;
		a.attr("href", href);
		var img = jQuery("<img>").attr("src", "http://store.nuttle.net/images/" + prod.prodid + ".jpeg");
		a.append(img);
		var h = jQuery("<h3>").text(prod.title);
		a.append(h);
		var p = jQuery("<p>")
		//var s = jQuery("<span>").addClass("prod-desc").text(prod.desc);
		//p.append(s);
		s = jQuery("<span>").addClass("prod-price").text(prod.price);
		p.append(s);
		a.append(p);
		p = jQuery("<p>");
		/*
		s = jQuery("<a>").addClass("prod-add-link").text("Add to cart");
		s.click(function(evt){
			cart.add(prod.prodid);
			location.href = "cart.htm";
		});
		p.append(s);
		*/
		a.append(p);
		a = jQuery("<a>").text("Add to Cart").attr("href", "javascript:void(0)")
			.click(function(evt){
				cart.add(prod.prodid);
				location.href="cart.htm";
			});
		li.append(a);
		jQuery("#category_products").append(li);
	});
}
ui.buildCartPage=function(){
	console.log("ui.buildCartPage");
	if(cart.items.length==0){
		var li = jQuery("<li>");
		li.text("The cart is empty");
		jQuery("#cartitems").append(li);
	}else{
		jQuery.each(cart.items, function(idx, item){
			var li = jQuery("<li>");
			var a = jQuery("<a>").addClass("product-list");
			li.append(a);
			a.attr("href", "product.htm?prodid=" + item.product.prodid);
			a.attr("data-ajax", "false");
			var h3 = jQuery("<h3>");
			h3.text(item.product.title);
			a.append(h3);
			var p = jQuery("<p>");
			p.text("Quantity: " + item.qty);
			a.append(p);
			var img = jQuery("<img>");
			img.attr("src", "http://store.nuttle.net/images/" + item.product.prodid + ".jpeg");
			a.append(img);
			a = jQuery("<a>");
			li.append(a);
			a.attr("href", "javascript:void(0)");
			a.text("Remove");
			a.click(function(evt){
				//Note that the remove parameter is added to the URL only to make the page look more realistic
				//The product is dropped before the page is reloaded
				cart.remove(item.product.prodid);
				location.href = "cart.htm?remove=" + item.product.prodid;
			})
			jQuery("#cartitems").append(li);
		})
	}
}
ui.buildBillingPage = function(){
	//TBD
}
ui.buildConfirmPage = function(){
	//TBD
}

