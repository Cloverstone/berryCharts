
function getIdentifier(obj){
	return (obj.name|| obj.label.split(' ').join('_').toLowerCase());
}
function berryChart(options) {
	var chartTypes = [
			{label: 'Line', value: 'line'},
			{label: 'Spline', value: 'spline'},
			{label: 'Bar', value: 'bar'},
			{label: 'Pie', value: 'pie'},
			{label: 'Donut', value: 'donut'}
		];

	this.draw = function(force){


				this.numbers.unshift('updatedAt')
				this.data = [this.numbers];
				_.each(this.options.data, function(model){
					var values = $.extend(true,{},_.values(_.pick(model, this.numbers)));
					values[0] = moment(values[0]).format("YYYY-MM-DD");
					this.data.push(values);
					// this.data.push(_.values(_.pick(model, this.numbers)));
				}, this)
				debugger;
				// this.data[0][0] = 'x';
				if(typeof this.chart !== 'undefined' && !force){
					this.chart.load({
							rows: this.data,
					});
				}else{

					// this.data.unshift(['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'])
					this.chart = c3.generate({
						data: {
							x: 'updatedAt',
							rows: this.data,
							names: this.names,
							type: this.options.chart_type || 'spline'
						},
						donut: {
							title: this.options.name
						},
						axis: {
							x: {
								type: 'timeseries',
								tick: {
										format: '%Y-%m-%d'
								}
							}
						}
					});
				}
	}

	function render(){
		return '<div class="well" style="background-color:#fff"><div id="form"></div><div id="chart"></div></div>';//templates['chart'].render(myStack.config.attributes, templates);
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
				this.settings = $('#form').berry({fields:[
					{label:"Display",name:'chart_type', options:chartTypes}
					], actions:false}).on('change', function(){
													this.options.chart_type = this.settings.toJSON().chart_type;
													this.draw(true) 

					},this);
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

}


