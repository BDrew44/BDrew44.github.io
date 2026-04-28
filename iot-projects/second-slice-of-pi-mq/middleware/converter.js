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
								{"<>": "b", html: "name:"},
								{ "<>" : "p", html: "${name}"},
									
							],
						},
						{
							"<>": "p",
							html: [
								{"<>": "b", html: "description:"},
								{"<>": "p", html: "${description}"},
							],
						},

						{
							"<>": "p",
							html: [
								{"<>": "b", html: "value:"},
								{"<>": "p", html: "${value}"},
							],
						},
					],
				};
				const result = json2html.render(req.result, render);
				console.log("sleep");
				res.send(result);
				//next();
				
			
			}

		} else{
			console.log(req.result);
			res.send(req.result);
			next();
		}
		// TODO 2: Create the converter function
		
	};
};
