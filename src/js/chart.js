
function getIdentifier(obj){
	return (obj.name|| obj.label.split(' ').join('_').toLowerCase());
}
function berryChart(options) {
	this.draw = function(){


				this.data = [this.numbers];
				debugger;
				_.each(this.options.data,function(model){

										this.data.push(_.values(_.pick(model, this.numbers)));

				},this)
				// this.options.data.each(function(model){
				// 	this.data.push(_.values(_.pick(model.attributes, this.numbers)));
				// }, this);
				if(typeof this.chart !== 'undefined'){
					this.chart.load({
							rows: this.data,
					});
				}else{
					this.chart = c3.generate({
						data: {
							rows: this.data,
							names: this.names,
							type: this.options.chart_type || 'spline'
						},
						donut: {
							title: this.options.name
						}
					});
				}
	}

	function render(){
		return '<div class="well" style="background-color:#fff"><div id="chart"></div></div>';//templates['chart'].render(myStack.config.attributes, templates);
	}
	function onload($el){

				// myStack.collection.on('add', function(model){
				// 	if(model.attributes._id){
				// 		this.draw();
				// 	}else{
				// 		this.temp = model;
				// 		model.on('ready', function(){
				// 			this.draw();
				// 		}, this);
				// 	}
				// }, this);
				// myStack.collection.on('remove', function() {
			// 		this.draw();
				// }, this);
				// myStack.collection.on('change', function() {
			// 		this.draw();
				// }, this);

				var numberObjects = _.where(this.options.schema, {type: 'number'});
				this.numbers = _.map(numberObjects, function(item){ return getIdentifier(item);  /*{name: getIdentifier(item),label: item.label}*/ } );
				this.names = {};
				_.map(numberObjects, $.proxy(function(item){ this.names[getIdentifier(item)] = item.label;},this) );

				// this.setElement(render(this.template, myStack.config.attributes));
				// this.model.on('change', _.debounce(this.render, 200), this);
				// myStack.collection.on('change', _.debounce(this.render, 200), this);

				this.draw();

	}


	var fields = {
		'Chart Type': [
			{label: 'Line', value: 'line'},
			{label: 'Bar', value: 'bar'},
			{label: 'Pie', value: 'pie'},
			{label: 'Donut', value: 'donut'},
			{label: 'Spline', value: 'spline'}
		]
	}
	this.options = options;
	$(this.options.container).html(render());
	onload.call(this);

	// return {
	// 	container: options.container,
	// 	fields: fields,
	// 	// render: render,
	// 	// toJSON: toJSON,
	// 	// onload: onload.bind(this),
	// 	// edit: berryEditor.call(this, options.container),
	// 	// get: get,
	// 	// set: set
	// }
}


