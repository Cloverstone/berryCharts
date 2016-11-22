
function getIdentifier(obj){
	return (obj.name|| obj.label.split(' ').join('_').toLowerCase());
}
function berryChart(options) {
	var chartTypes = [
			{label: 'Line', value: 'line'},
			{label: 'Spline', value: 'spline'},
			{label: 'Scatter', value: 'scatter'},
			{label: 'Step', value: 'step'},
			{label: 'Bar', value: 'bar'},
			{label: 'Pie', value: 'pie'},
			{label: 'Donut', value: 'donut'}
		];

	this.draw = function(force){


				this.data = [this.numbers];
				var start =  moment(this.options.start); 
				var end = moment(this.options.end)

				// var tempdata = 
				_.each(_.filter(this.options.data,function(model){
					return moment(model.date).isBetween(start,end);
				}), function(model){
					var values =_.values(_.pick(model, this.numbers));// $.extend(true,[],);
					values[0] = moment(values[0]).utc().format("YYYY-MM-DD");
					this.data.push(values);
				}, this)
				if(typeof this.chart !== 'undefined' && !force){
					this.chart.load({
							rows: this.data,
					});
				}else{

					// this.data.unshift(['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'])
					this.chart = c3.generate({
						data: {
							x: 'date',
							rows: this.data,
							names: this.names,
							type: this.options.chart_type || 'step'
						},
						donut: {
							title: this.options.name
						},
						axis: {
							x: {
								type: 'timeseries',
								tick: {
									                fit: false,

										format: '%m-%d'
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
				this.settings = $('#form').berry({attributes: this.options, fields:[
					{label:"Display",name:'chart_type', options:chartTypes},
					{label:"From",name:'start',type:'date' },
					{label:"To",name:'end',type:'date' },
					], actions:false}).on('change', function(){
													// this.options.chart_type =
													 $.extend(this.options, this.settings.toJSON());
													this.draw(true) 

					},this);
				var numberObjects = _.where(this.options.schema, {type: 'number'});
				this.numbers = _.map(numberObjects, function(item){ return getIdentifier(item);  /*{name: getIdentifier(item),label: item.label}*/ } );

				this.numbers.unshift('date')
				this.names = {};
				_.map(numberObjects, $.proxy(function(item){ this.names[getIdentifier(item)] = item.label;},this) );

				// this.setElement(render(this.template, myStack.config.attributes));
				// this.model.on('change', _.debounce(this.render, 200), this);
				// myStack.collection.on('change', _.debounce(this.render, 200), this);

				this.draw();

	}



	this.options = options;
	$(this.options.container).html(render());
	onload.call(this);

}


