	//
	// Advanced Search Options - relative date searches
	//
	// Insert into Client/javascript/search_container.js in SearchContainer.prototype.runSearch after "var searchAml= currentSearchMode.getAml();"
	// Aras 11SP8:  ~ line 1952
	// Aras 12SP8: ~ line 1850
	// 
	var reCtxSearch = new RegExp("@(\\w+)?(?:\\(?(-?\\w+)\\)?)?","g");
	
	var keyword;
	while (keyword = reCtxSearch.exec(searchAml))
	{
		var foundString = keyword[0];
		
		switch(keyword[1])
		{
		   case "today":
		   case "now":
		   case "bow":
		   case "eow":
					var diff =  keyword[2] ? parseInt(keyword[2]) : 0 ;
					var today     = new Date();
					var relDate   = new Date();
					var toff = relDate.getTimezoneOffset();
					switch(keyword[1])
					{
						case "bow":
							var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
							if( day !== 1 )                // Only manipulate the date if it isn't Mon.
								diff = -1 *(day - 1);   // Set the hours to day number minus 1
                                         
							break;
						case "eow":
							var day = today.getDay() || 7; // Get current day number, converting Sun. to 7
							diff = 7 - day + 1;   // Set the date to next monday
                                         
							break;
							
					}
					
				    relDate.setDate(today.getDate() +  diff );
					
					if (keyword[1] != "now") 
					{
						relDate.setHours(0,-1 * toff,0,0);
					}
					var nd = relDate.toISOString();
				    nd = nd.substr(0,nd.length - 5); // Remove .000Z
					searchAml = searchAml.replace(foundString, nd);
				break;
			case "bom":
			case "boy":
					var today     = new Date();
					var toff = today.getTimezoneOffset();
					var firstDay = new Date(today.getFullYear(), keyword[1]=="bom" ? today.getMonth(): 0, 1);
					firstDay.setHours(0,-1 * toff,0,0);
					
					var nd = firstDay.toISOString();
				    nd = nd.substr(0,nd.length - 5); // Remove .000Z
					searchAml = searchAml.replace(foundString, nd);
					
				break;
				
			case "eom":
			case "eoy":
					var today     = new Date();
					var toff = today.getTimezoneOffset();
					var lastDay = new Date(today.getFullYear(), keyword[1]=="eom" ? today.getMonth() + 1 : 12, 0);
					lastDay.setHours(0,-1 * toff,0,0);
					var nd = lastDay.toISOString();
				    nd = nd.substr(0,nd.length - 5); // Remove .000Z
					searchAml = searchAml.replace(foundString, nd);
				break;
			case "userid":
					var myid = top.aras.getUserID();
					searchAml = searchAml.replace(foundString, myid);
		        break;
			case "alias":
					var myalias = top.aras.getIsAliasIdentityIDForLoggedUser();
					searchAml = searchAml.replace(foundString, myalias);
		        break;
			case "loginname":
					var myname = top.aras.getLoginName();
					searchAml = searchAml.replace(foundString, myname);
		        break;
			case "username":
			        var inn = new Innovator();
					var myUser = inn.newItem("User","get");
					myUser.setProperty("id", top.aras.getUserID());
					myUser.setProperty("select", "keyed_name");
					myUser = myUser.apply();
					searchAml = searchAml.replace(foundString, myUser.getProperty("keyed_name"));
					break;
				
		}
	}
	//
	// end of patch 
	