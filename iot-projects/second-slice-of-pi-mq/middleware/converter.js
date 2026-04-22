const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		if (req.result){
			if (req.accepts("html")){
				let render = {
					"<>":"div",
					html : [
						{
							"<>": "p",
							html: [
								{"<>": "b", html: "name1:"},
								{ "<>" : "p", html: "${name1}"},
									
							],
						},
						{
							"<>": "p",
							html: [
								{"<>": "b", html: "name1:"},
								{"<>": "p", html: "{$name1}"},
							],
						},
					],
				};
				json2html.render(result, render)
					res.send()
				
			
			}

		} else{
			res.send(req)
			next();
		}
		// TODO 2: Create the converter function
		
	};
};
