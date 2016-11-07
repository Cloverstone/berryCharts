
function berryChart(options) {
	this.draw = function(){


				this.data = [this.numbers];
				myStack.collection.each(function(model){
					this.data.push(_.values(_.pick(model.attributes, this.numbers)));
				}, this);
				if(typeof this.chart !== 'undefined'){
					this.chart.load({
					    rows: this.data,
					});
				}else{
					this.chart = c3.generate({
					  data: {
					    rows: this.data,
					 		names: this.names,
					    type: get().chart_type
					  },
					  donut: {
					    title: myStack.config.attributes.name
					  }
					});
				}
	}

	function render(){
		return '<div class="well" style="background-color:#fff"><div id="chart"></div></div>';//templates['chart'].render(myStack.config.attributes, templates);
	}
	function onload($el){

				myStack.collection.on('add', function(model){
					if(model.attributes._id){
						this.draw();
					}else{
						this.temp = model;
						model.on('ready', function(){
							this.draw();
						}, this);
					}
				}, this);
				myStack.collection.on('remove', function() {
		 			this.draw();
				}, this);
				myStack.collection.on('change', function() {
		 			this.draw();
				}, this);
				var numberObjects = _.where(myStack.config.attributes.form, {type: 'number'});
				this.numbers = _.map(numberObjects, function(item){ return getIdentifier(item);  /*{name: getIdentifier(item),label: item.label}*/ } );
				this.names = {};
				_.map(numberObjects, $.proxy(function(item){ this.names[getIdentifier(item)] = item.label;},this) );

				// this.setElement(render(this.template, myStack.config.attributes));
				// this.model.on('change', _.debounce(this.render, 200), this);
				// myStack.collection.on('change', _.debounce(this.render, 200), this);

				this.draw();

	}
	function get() {
		item.widgetType = 'drupe_chart_view';
		return item;
	}
	function toJSON() {
		return get();
	}
	function set(newItem){
		$.extend(item, newItem);
	}
	var item = {
		widgetType: 'drupe_chart_view',
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
	return {
		container: container,
		fields: fields,
		render: render,
		toJSON: toJSON,
		onload: onload.bind(this),
		edit: berryEditor.call(this, container),
		get: get,
		set: set
	}
}


