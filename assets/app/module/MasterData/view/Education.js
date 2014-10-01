Ext.define('ERPh.module.MasterData.view.Education',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Education',
	iconCls		: 'icon-book',
	alias 		: 'widget.Education',
	id 			: 'Education',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridEducation',
		'ERPh.module.MasterData.view.form.FormEducation'
	],
	height 		: 250,
	width 		: 1000,
	layout 		: {
		type 	: 'hbox',
		layout 	: 'fit',
		align 	: 'stretch'
	}, 
	defaults : {
		flex : 1
	},
	closable 	: true,
	items 		: [
		{ xtype : 'grideducation', flex : 1.3 },
		{ xtype : 'formeducation', flex : 0.8 }
	]	
});