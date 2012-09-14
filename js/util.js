(function() {
	var util = window.util = {};
	
	util.buildMboxString = function(name, vals)
	{
		var s = "mboxCreate(\"" + name + "\"";
		if(!vals || !vals.length)
		{
			s += ");"
		}
		else
		{
			s += ", ";
			for(var i = 0; i < vals.length - 1; i++)
			{
				s += "\"" + vals[i] + "\",";
			}
			s += "\"" + vals[vals.length-1] + "\");";
		}
		return s;
	}

	//util.pages is an array of all page types.
	//In singlePageMode, these are the values for the page parameter
	//In multi-page mode, these are combined with ".htm" to define names of individual pages
	util.pages = [
		"home",
		"category",
		"cart",
		"product",
		"billing",
		"noresult",
		"confirm",
		"emailsignup",
		"contact",
		"careers",
		"info"
	];

	//Returns true if a parameter named param is equal to value
	util.isParamValue = function(param, value)
	{
		if(util.params[param] && util.params[param] === value) return true;
		return false;
	}

	//Returns true if the current page matches param page
	//Works in either single-page or multi-page mode
	util.isPage = function(page)
	{
		//TBD:  no single-page mode in mobile version yet
		if(config.singlePageMode)
		{
			//kludge for home
			//In single-page mode, home page is that page specified by 
			//config.singlePageMode.pageName, with no "page" parameter
			//Or page=home will work
			if(page === "home")
			{
				if((!util.params["page"] || (util.params["page"] && util.params["page"] === "home")) 
					&& util.getPageName() == config.singlePageName) 
				{
					return true;
				}
				return false;
			}
			else
			{
				if(util.params["page"] && util.params["page"] == page) return true;
			}
		}
		else
		{
			//var re = new RegExp(page + "\.htm(?:$|l)", "i");
			var re = new RegExp("#" + page + "(?:$|&)", "i");
			var hash = util.getPageHash();
			if(!hash) return -1;
			return util.getPageHash().search(re)>-1;
		}
	}

	//Returns the name of the current page;  assumption is that it will end in .htm or .html
	util.getPageName = function() {
		var re = /\w*?\.htm(?:l?)/i;
		var page = location.href.match(re);
		if(page && page.length>0)
		{
			return page[0];
		}
		return "";
	}
	
	util.getPageHash = function() {
		var re = /#.*/;
		var hash = location.href.match(re);
		if(hash && hash.length){
			return hash[0];
		}
		return null;
	}

	//Returns an array of all HTTP parameters as an object,
	//each property of which is the name of a parameter.
	//Tweaked to look for either HTTP or hash parameters
	util.getURLParams = function()
	{
		//This code will not properly handle cases where a parameter appears multiple times
		//All but the last will be discarded
		var ret = {};
		var patt = /(?:\?|\#)(.+)$/;
		location.href.match(patt);
		var params = RegExp.$1;
		if(params=="undefined"){
			util.params = ret;
			return;
		}
		params = params.split("&");

		for(var i = 0; i < params.length; i++)
		{
			var tmp = params[i].split("=");
			var val = "";
			if(tmp.length>1) val = tmp[1];
			ret[tmp[0]] = val;
		}
		util.params = ret;
	}

	//Sets a cookie
	util.setCookie = function(c_name,value,expiredays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
	}

	//Reads a cookie and returns its value
	util.getCookie = function(c_name)
	{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
			{
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
			}
		  }
		return "";
	}

	//Removes a cookie
	util.deleteCookie = function(c_name)
	{
		setCookie(c_name, "", 0);
	}

	util.init = function() {
		util.getURLParams();
	}

	util.init();
})();