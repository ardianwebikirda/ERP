Ext.define('ERPh.module.Profile.view.grid.GridEmployee',{
	extend 		: 'Ext.grid.Panel',
	// store 		: 'ERPh.module.Profile.store.Employee',
	title 		: 'List of Employee',
	alias 		: 'widget.gridemployee',
	id 			: 'gridemployee',
	selModel 	: {
		selType 	: 'checkboxmodel',
		mode 		: 'MULTI',
		checkOnly 	: true,
		width 		: '3%',
		action 		: 'selected'
	},
	dockedItems 	: [
		{
			xtype 	: 'pagingtoolbar',
			// store 	: 'ERPh.module.Profile.store.Employee',
			dock 	: 'bottom',
			// displayInfo : true
		}
	],
	columns		: [
		{
			xtype 		: 'rownumberer',
			text 		: 'No',
			width 		: '10%'
		},
		{
			text 		: 'Code',
			dataIndex 	: 'code',
			width 		: '15%'
		},
		{
			text 		: 'Name',
			dataIndex 	: 'name',
			width 		: '65%'
		}		
	],
	tbar 		: [
        { xtype: 'button', iconCls: 'icon-delete', text: 'Delete', action : 'delete' },
        '->',
        {
            fieldLabel          : 'Search',
            xtype               : 'textfield',
            emptyText           : 'Type Here for Search....',
            width               : '80%',
            caseSensitive       : false,
            enableKeyEvents     : true,
            action              : 'search'
        }
	]
});