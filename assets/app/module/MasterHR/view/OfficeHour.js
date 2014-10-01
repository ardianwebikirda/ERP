Ext.define('ERPh.module.MasterHR.view.OfficeHour',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'OfficeHour',
	iconCls		: 'icon-clock',
	alias 		: 'widget.OfficeHour',
	id 			: 'OfficeHour',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterHR.view.grid.GridOfficeHour',
		'ERPh.module.MasterHR.view.form.FormOfficeHour'
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
		{ xtype : 'gridofficehour', flex : 1.3 },
		{ xtype : 'formofficehour', flex : 0.8 }
	]	
});