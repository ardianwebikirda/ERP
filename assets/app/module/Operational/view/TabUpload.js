Ext.define('ERPh.module.Operational.view.TabUpload',{
	extend		: 'Ext.tab.Panel',
	alias 		: 'widget.tabupload',
	id			: 'tabupload',
	margins 	: '1px 1px 1px 1px',
	frame 		: true,
	requires 	: [
		'ERPh.module.Operational.view.grid.GridAttEmployee',
		'ERPh.module.Operational.view.grid.GridUpload'
	],
	layout 		: {
		type	: 'fit'
	},
	items		: [
		{ xtype : 'gridattemployee', flex : 1 },
		{ xtype : 'gridupload', flex : 1 }
	]
});