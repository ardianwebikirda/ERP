Ext.define('ERPh.module.Operational.view.grid.GridAttEmployee',{
	extend 		: 'Ext.grid.Panel',
	title		: 'List Employee',
	alias 		: 'widget.gridattemployee',
	// store 		: Ext.create('ERPh.module.MasterHR.store.Employee'),
	id 			: 'gridattemployee',
	iconCls		: 'icon-application_view_columns',
	margins 	: '1px 1px 1px 1px',
	dockedItems		: [{
			xtype			: 'pagingtoolbar',
			// store 			: 'ERPh.module.Operational.store.AttEmployee',
			dock 			: 'bottom',
			displayInfo		: false
	}],
	columns		: [
		{
			text 		: 'NO',
			xtype		: 'rownumberer',
			width		: '10%'
		},
		{
			text 		: 'CODE',
			dataIndex	: 'code',
			width		: '20%'
		},
		{
			text 		: 'FIRST NAME',
			dataIndex	: 'fname',
			width		: '30%'
		},
		{
			text 		: 'LAST NAME',
			dataIndex	: 'lname',
			width		: '35%'
		}
	],
	tbar		: [
		// {xtype : 'button', text : 'Delete', iconCls : 'icon-delete', action : 'delete'},
		'->',
		{
			xtype			: 'textfield',
			emptyText		: 'Search Here ....',
			width			: '80%',
			caseSensitive	: false,
			enableKeyEvents	: true,
			action			: 'search'
		}
	]
});