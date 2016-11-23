
function getIdentifier(obj){
	return (obj.name|| obj.label.split(' ').join('_').toLowerCase());
}
function berryChart(options) {
	var chartTypes = [
			{label: 'Scatter', value: 'scatter'},
			{label: 'Line', value: 'line'},
			{label: 'Spline', value: 'spline'},
			{label: 'Step', value: 'step'},
			{label: 'Bar', value: 'bar'},
			{label: 'Pie', value: 'pie'},
			{label: 'Donut', value: 'donut'}
		];

	this.draw = function(force){


				this.data = [this.numbers];
				var start =  moment(this.options.start); 
				var end = moment(this.options.end)

				_.each(_.filter(this.options.data,function(model){
					return moment(model[this.options.x_axis]).isBetween(start,end);
				}.bind(this)), function(model){
					var values =_.values(_.pick(model, this.numbers));// $.extend(true,[],);
					values[0] = moment(values[0]).utc().format("YYYY-MM-DD");
					this.data.push(values);
				}, this)
				if(typeof this.chart !== 'undefined' && !force){
					this.chart.load({
							rows: this.data,
					});
				}else{
					this.chart = c3.generate({
						data: {
							x: this.options.x_axis,
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
		return '<div class="well" style="background-color:#fff"><div id="form"></div><div id="chart"></div></div>';
	}
	function onload($el){


				this.settings = $('#form').berry({attributes: this.options, fields:[
					{label:"Display",name:'chart_type', options:chartTypes},
					{label:"X-axis",name:'x_axis',type: 'select',value_key:'name', options:[{label:'Created At',name:'createdAt'},{label:'Updated At',name:'updatedAt'}].concat(_.where(this.options.schema, {type: 'date'}))},
					{label:"From",name:'start',type:'date' },
					{label:"To",name:'end',type:'date' },

					], actions:false}).on('change', function(){
						$.extend(this.options, this.settings.toJSON());
						this.numbers[0] =this.options.x_axis ;

						this.draw(true) 

					},this);
				var numberObjects = _.where(this.options.schema, {type: 'number'});
				this.numbers = _.map(numberObjects, function(item){ return getIdentifier(item);  /*{name: getIdentifier(item),label: item.label}*/ } );

				this.numbers.unshift(this.options.x_axis)
				this.names = {};
				_.map(numberObjects, $.proxy(function(item){ this.names[getIdentifier(item)] = item.label;},this) );

				this.draw();

	}



	this.options = options;
	$(this.options.container).html(render());
	onload.call(this);

}


