Ext.define('ERPh.module.MasterData.view.Language',{
	extend 		: 'Ext.panel.Panel',
	title 		: 'Language',
	iconCls		: 'icon-bookmark',
	alias 		: 'widget.Language',
	id 			: 'Language',
	frame 		: true,
	layout 		: 'fit',
	requires 	: [
		'ERPh.module.MasterData.view.grid.GridLanguage',
		'ERPh.module.MasterData.view.form.FormLanguage'
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
		{ xtype : 'gridlanguage', flex : 1.3 },
		{ xtype : 'formlanguage', flex : 0.8 }
	]	
});