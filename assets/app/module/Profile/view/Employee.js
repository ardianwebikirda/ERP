Ext.define('ERPh.module.Profile.view.Employee',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Data Employee',
	alias 		: 'widget.Employee',
	id 			: 'Employee',
	iconCls		: 'icon-user_suit_black',
	layout		: 'fit',
	plain		: true,
	closable	: true,
	requires 	: [
		'ERPh.module.Profile.view.grid.GridEmployee',
		'ERPh.module.Profile.view.Form.FormEmployee',
	],
	layout 		: {
		type 	: 'hbox',
		align 	: 'stretch'
	},
	defaults 	: {
		flex 	: 1
	},
	items 		: [
		{xtype : 'gridemployee', flex : 0.7},
		{xtype : 'formemployee', flex : 1.2}
	]
});