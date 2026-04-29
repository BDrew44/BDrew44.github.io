const json2html = require('node-json2html');

module.exports = function() {
	return function (req, res, next) {
		if (req.result){
			console.log(req.result);
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
								{"<>": "p", html: "${value.raw}"},
							],
						},
					],
				};
				const result = json2html.render(req.result, render);

				res.send(result);
				//next();
				
			
			} else{
				res.send(req.result);
			}

		} else{
			next();
		}
		// TODO 2: Create the converter function
		
	};
};
